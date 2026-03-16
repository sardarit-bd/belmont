import React, { useState, useEffect, useMemo } from 'react';
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import { useI18n, I18nProvider } from '@/contexts/I18nContext';
import { usePage } from '@inertiajs/react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';


// Matches your existing bg-white border border-gray-200 input style exactly
const STRIPE_STYLE = {
    style: {
        base: {
            fontSize: '16px',
            lineHeight: '1.5',
            color: '#374151',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            '::placeholder': { color: '#9CA3AF' },
        },
        invalid: { color: '#EF4444' },
    },
};

export default function PickupScheduler() {
    const { stripe_key } = usePage().props;
    const stripePromise = useMemo(() => loadStripe(stripe_key), [stripe_key]);

    return (
        <I18nProvider>
            <Elements stripe={stripePromise}>
                <PickupSchedulerInner />
            </Elements>
        </I18nProvider>
    );
}

function PickupSchedulerInner() {

    // Read cart from localStorage
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem('laundryServiceCart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const { props } = usePage();
    const { t } = useI18n();
    const stripe   = useStripe();
    const elements = useElements();

    const [currentStep,  setCurrentStep]  = useState(1);
    const [errors,       setErrors]       = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSubmitted,  setIsSubmitted]  = useState(false);
    const [paymentError, setPaymentError] = useState('');

    // Stripe per-field errors (shown under each field, just like your existing errors)
    const [stripeErrors, setStripeErrors] = useState({
        cardNumber: '', cardExpiry: '', cardCvc: '',
    });

    // Stripe token + safe display metadata (replaces raw card state)
    const [paymentMethodId, setPaymentMethodId] = useState('');
    const [cardMeta, setCardMeta] = useState({ last4: '', expiry: '', brand: '' });

    const [formData, setFormData] = useState({
        fullName: '', phoneNumber: '', street: '', city: '', zip: '',
        pickupDate: '', preferredTime: '', specialInstructions: '',
        cardholderName: '',
        cardConsent: false,
    });

    // When user goes Back to Step 2, clear stale token so they re-enter card
    useEffect(() => {
        if (currentStep === 2) {
            setPaymentMethodId('');
            setCardMeta({ last4: '', expiry: '', brand: '' });
            setStripeErrors({ cardNumber: '', cardExpiry: '', cardCvc: '' });
            setPaymentError('');
        }
    }, [currentStep]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    // Real-time Stripe field validation — mirrors your existing per-field error pattern
    const handleStripeChange = (field) => (e) => {
        setStripeErrors(prev => ({ ...prev, [field]: e.error ? e.error.message : '' }));
    };

    const validateStep1 = () => {
        const e = {};
        if (!formData.fullName.trim())    e.fullName    = t('schedule.error_full_name_required');
        if (!formData.phoneNumber.trim()) e.phoneNumber = t('schedule.error_phone_required');
        else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phoneNumber.replace(/\s/g, '')))
            e.phoneNumber = t('schedule.error_phone_invalid');
        if (!formData.street.trim()) e.street = t('schedule.error_street_required');
        if (!formData.city.trim())   e.city   = t('schedule.error_city_required');
        if (!formData.zip.trim())    e.zip    = t('schedule.error_zip_required');
        else if (!/^\d{4}$/.test(formData.zip)) e.zip = t('schedule.error_zip_invalid');
        return e;
    };

    const validateStep2 = () => {
        const e = {};
        if (!formData.pickupDate) {
            e.pickupDate = t('schedule.error_date_required');
        } else {
            const selected = new Date(formData.pickupDate);
            const today = new Date(); today.setHours(0, 0, 0, 0);
            if (selected < today) e.pickupDate = t('schedule.error_date_past');
        }
        if (!formData.preferredTime)         e.preferredTime  = t('schedule.error_time_required');
        if (!formData.cardholderName.trim()) e.cardholderName = t('schedule.error_cardholder_required');
        return e;
    };

    const nextStep = () => {
        if (currentStep === 1) {
            const validationErrors = validateStep1();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                const first = document.getElementsByName(Object.keys(validationErrors)[0])[0];
                if (first) { first.scrollIntoView({ behavior: 'smooth', block: 'center' }); first.focus(); }
                return;
            }
            setErrors({});
            setCurrentStep(2);
        }

        if (currentStep === 2) {
            handleTokenizeCard();
        }
    };

    const prevStep = () => {
        setErrors({});
        setPaymentError('');
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    /**
     * Step 2 "Continue" — tokenize the card via Stripe.js.
     * Stripe's hosted iframes send card data directly to Stripe servers.
     * We only receive a pm_xxx token — raw card data never touches your server.
     */
    const handleTokenizeCard = async () => {
        const validationErrors = validateStep2();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setPaymentError('');

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement),
            billing_details: { name: formData.cardholderName },
        });

        setIsProcessing(false);

        if (error) {
            // Map error to the specific field if Stripe tells us which one
            if (error.code?.startsWith('invalid_number') || error.code === 'incomplete_number') {
                setStripeErrors(prev => ({ ...prev, cardNumber: error.message }));
            } else if (error.code?.includes('expir')) {
                setStripeErrors(prev => ({ ...prev, cardExpiry: error.message }));
            } else if (error.code?.includes('cvc') || error.code?.includes('security')) {
                setStripeErrors(prev => ({ ...prev, cardCvc: error.message }));
            } else {
                setPaymentError(error.message);
            }
            return;
        }

        // Store token + safe display metadata only
        setPaymentMethodId(paymentMethod.id);
        setCardMeta({
            last4:  paymentMethod.card.last4,
            expiry: `${String(paymentMethod.card.exp_month).padStart(2, '0')}/${String(paymentMethod.card.exp_year).slice(-2)}`,
            brand:  paymentMethod.card.brand,
        });

        setErrors({});
        setCurrentStep(3);
    };

    /**
     * Step 3 "Confirm Pickup":
     * POST pm_xxx + form data → backend creates Customer, attaches PM, charges.
     * stripe.confirmCardPayment() handles 3DS authentication if required.
     * Booking only confirmed once Stripe webhook fires — not here.
     */
    const handleSubmit = async () => {
        if (!stripe || isProcessing) return;

        if (cart.length === 0) {
            setPaymentError(t('schedule.error_no_items'));
            return;
        }

        setIsProcessing(true);
        setPaymentError('');

        try {
            const response = await fetch('/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept':       'application/json',
                },
                body: JSON.stringify({
                    full_name:            formData.fullName,
                    phone_number:         formData.phoneNumber,
                    street:               formData.street,
                    city:                 formData.city,
                    zip:                  formData.zip,
                    pickup_date:          formData.pickupDate,
                    preferred_time:       formData.preferredTime,
                    special_instructions: formData.specialInstructions,
                    cardholder_name:      formData.cardholderName,
                    payment_method_id:    paymentMethodId,
                    card_last_four:       cardMeta.last4,
                    card_expiry:          cardMeta.expiry,
                    items:                cart.map(item => ({
                        id:       item.id,
                        name:     item.name,
                        price:    item.price,
                        quantity: item.quantity,
                    })),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) setErrors(data.errors);
                else setPaymentError(data.message || t('schedule.error_generic'));
                setIsProcessing(false);
                return;
            }

            if (data.status === 'requires_action' || data.status === 'requires_confirmation') {
                const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(data.client_secret);
                if (confirmError) {
                    setPaymentError(confirmError.message || t('schedule.error_3ds_failed'));
                    setIsProcessing(false);
                    return;
                }
                if (paymentIntent.status !== 'succeeded') {
                    setPaymentError(t('schedule.error_payment_incomplete'));
                    setIsProcessing(false);
                    return;
                }
            }

            // Clear cart on success
            localStorage.removeItem('laundryServiceCart');
            setCart([]);
            setIsSubmitted(true);

        } catch (err) {
            setPaymentError(t('schedule.error_generic'));
        } finally {
            setIsProcessing(false);
        }
    };

    // Your original inputClass — untouched
    const inputClass = (field) =>
        `w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none ${
            errors[field] ? 'border-2 border-red-500' : 'border-0 focus:ring-2 focus:ring-purple-500'
        }`;

    // Same as your card inputs (bg-white border) — used as wrapper for Stripe iframes
    const stripeWrapperClass = (field) =>
        `w-full px-4 py-3 bg-white border rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:outline-none transition-all ${
            stripeErrors[field] ? 'border-2 border-red-500' : 'border-gray-200'
        }`;

    return (
        <AppHeaderLayout>
            <I18nProvider>
                <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
                    <div className="max-w-2xl mx-auto">

                        {/* Header */}
                        <div className="text-center mb-3">
                            <h1 className="mb-6 text-5xl md:text-6xl bg-[#361b6b] bg-clip-text text-transparent">
                                {t('schedule.title')}
                            </h1>
                            <p className="text-gray-600">{t('schedule.subtitle')}</p>
                        </div>

                        {/* Progress Steps — untouched */}
                        <div className="mb-12">
                            <div className="flex items-center justify-center">
                                {[
                                    { step: 1, labelKey: 'schedule.step_contact',  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" /> },
                                    { step: 2, labelKey: 'schedule.step_schedule', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
                                    { step: 3, labelKey: 'schedule.step_confirm',  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
                                ].map(({ step, labelKey, icon }, i, arr) => (
                                    <React.Fragment key={step}>
                                        <div className="flex flex-col items-center">
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-[#361b6b]' : 'bg-gray-300'} transition-colors`}>
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                                            </div>
                                            <span className={`mt-2 text-sm font-medium ${currentStep >= step ? 'text-purple-600' : 'text-gray-400'}`}>
                                                {t(labelKey)}
                                            </span>
                                        </div>
                                        {i < arr.length - 1 && (
                                            <div className={`w-24 h-1 mx-2 ${currentStep >= step + 1 ? 'bg-purple-600' : 'bg-gray-300'} transition-colors`} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-8">

                            {/* Step 1 — Contact (unchanged) */}
                            {currentStep === 1 && (
                                <div>
                                    <div className="bg-purple-50 rounded-lg p-4 mb-6 flex items-start gap-3">
                                        <div className="w-10 h-10 bg-[#361b6b] rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="mb-0">{t('schedule.contact_title')}</h2>
                                            <p className="text-sm text-gray-600">{t('schedule.contact_subtitle')}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { name: 'fullName',    labelKey: 'schedule.full_name',    type: 'text', placeholder: 'John Doe' },
                                            { name: 'phoneNumber', labelKey: 'schedule.phone_number', type: 'tel',  placeholder: '(555) 123-4567' },
                                            { name: 'street',      labelKey: 'schedule.street',       type: 'text', placeholder: '123 Main St' },
                                            { name: 'city',        labelKey: 'schedule.city_state',   type: 'text', placeholder: 'Brockton, MA' },
                                            { name: 'zip',         labelKey: 'schedule.zip',          type: 'text', placeholder: '0230', maxLength: 4, inputMode: 'numeric', onInput: (e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4); } },
                                        ].map(({ name, labelKey, type, placeholder, maxLength, inputMode, onInput }) => (
                                            <div key={name}>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t(labelKey)} <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type={type} name={name} value={formData[name]}
                                                    onChange={handleChange} placeholder={placeholder}
                                                    maxLength={maxLength}
                                                    inputMode={inputMode}
                                                    onInput={onInput}
                                                    className={inputClass(name)}
                                                />
                                                {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]}</p>}
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={nextStep} className="inline-flex items-center justify-center gap-2 text-sm font-medium h-10 rounded-md px-6 w-full bg-[#361b6b] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mt-5">
                                        {t('schedule.continue_schedule')}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </button>
                                </div>
                            )}

                            {/* Step 2 — Schedule + Payment */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="bg-purple-50 rounded-lg p-4 flex items-start gap-3">
                                        <div className="w-10 h-10 bg-[#361b6b] rounded-lg flex items-center justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                                                <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="mb-0">{t('schedule.schedule_title')}</h2>
                                            <p className="text-sm text-gray-600">{t('schedule.schedule_subtitle')}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule.pickup_date')} <span className="text-red-500">*</span></label>
                                            <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className={inputClass('pickupDate')} style={{ colorScheme: 'light' }} />
                                            {errors.pickupDate && <p className="mt-1 text-sm text-red-500">{errors.pickupDate}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule.preferred_time')} <span className="text-red-500">*</span></label>
                                            <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className={inputClass('preferredTime')} style={{ colorScheme: 'light' }} />
                                            {errors.preferredTime && <p className="mt-1 text-sm text-red-500">{errors.preferredTime}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('schedule.special_instructions')} <span className="text-gray-400 text-xs">({t('schedule.optional')})</span>
                                        </label>
                                        <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} placeholder={t('schedule.special_instructions_placeholder')} rows="3" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none" />
                                    </div>

                                    {/* Payment section — same structure, Stripe iframes replace raw inputs */}
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{t('schedule.payment_title')}</h3>
                                                <p className="text-sm text-gray-600">{t('schedule.payment_subtitle')}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">

                                            {/* Cardholder Name — plain input, not sensitive */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule.cardholder_name')} <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    name="cardholderName"
                                                    value={formData.cardholderName}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.cardholderName ? 'border-2 border-red-500' : 'border-gray-200'}`}
                                                />
                                                {errors.cardholderName && <p className="mt-1 text-sm text-red-500">{errors.cardholderName}</p>}
                                            </div>

                                            {/* Card Number */}
                                            <div className={stripeWrapperClass('cardNumber')}>
                                                <CardNumberElement
                                                    options={{
                                                        ...STRIPE_STYLE,
                                                        showIcon: true,
                                                    }}
                                                    onChange={handleStripeChange('cardNumber')}
                                                />
                                            </div>

                                            {/* Expiry */}
                                            <div className={stripeWrapperClass('cardExpiry')}>
                                                <CardExpiryElement
                                                    options={STRIPE_STYLE}
                                                    onChange={handleStripeChange('cardExpiry')}
                                                />
                                            </div>

                                            {/* CVC */}
                                            <div className={stripeWrapperClass('cardCvc')}>
                                                <CardCvcElement
                                                    options={STRIPE_STYLE}
                                                    onChange={handleStripeChange('cardCvc')}
                                                />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input type="checkbox" name="cardConsent" checked={formData.cardConsent} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-[#361b6b] focus:ring-[#361b6b] mt-0.5" />
                                            <span className="text-sm text-gray-700 leading-tight">
                                                {t('schedule.card_consent', { company: 'Belmont Cleaners' })} <span className="text-red-500">*</span>
                                            </span>
                                        </label>
                                    </div>

                                    {paymentError && <p className="text-sm text-red-500">{paymentError}</p>}

                                    <div className="space-y-3 pt-4">
                                        <button onClick={prevStep} disabled={isProcessing} className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors disabled:opacity-50">
                                            {t('schedule.back')}
                                        </button>
                                        <button
                                            onClick={nextStep}
                                            disabled={!formData.cardConsent || isProcessing || !stripe}
                                            className="inline-flex items-center justify-center gap-2 text-sm font-medium h-10 rounded-md px-6 w-full bg-[#361b6b] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:pointer-events-none disabled:grayscale"
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                                    </svg>
                                                    {t('schedule.processing')}
                                                </>
                                            ) : (
                                                <>
                                                    {t('schedule.continue_review')}
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3 — Review (unchanged structure, updated payment summary) */}
                            {currentStep === 3 && (
                                <div className="space-y-6">

                                    {isSubmitted && (
                                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4">
                                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-green-800">{t('schedule.success_title')}</h3>
                                                <p className="text-sm text-green-700 mt-1">{t('schedule.success_message')}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                                        <div className="w-10 h-10 bg-[#361b6b] rounded-lg flex items-center justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                                                <path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="mb-0">{t('schedule.review_title')}</h2>
                                            <p className="text-sm text-gray-600">{t('schedule.review_subtitle')}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 bg-purple-50 rounded-2xl p-6 border-2 border-purple-100">
                                        <div className="bg-white rounded-lg px-4 py-2">
                                            <p className="text-purple-600 font-medium text-xs">{t('schedule.label_name')}</p>
                                            <p className="text-black">{formData.fullName}</p>
                                        </div>
                                        <div className="bg-white rounded-lg px-4 py-2">
                                            <p className="text-purple-600 font-medium text-xs">{t('schedule.label_phone')}</p>
                                            <p className="text-black">{formData.phoneNumber}</p>
                                        </div>
                                        <div className="bg-white rounded-lg px-4 py-2">
                                            <p className="text-purple-600 font-medium text-xs">{t('schedule.label_address')}</p>
                                            <p className="text-black">{formData.street}, {formData.city} {formData.zip}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white rounded-lg px-4 py-2">
                                                <p className="text-purple-600 font-medium text-xs">{t('schedule.label_date')}</p>
                                                <p className="text-black">{formData.pickupDate}</p>
                                            </div>
                                            <div className="bg-white rounded-lg px-4 py-2">
                                                <p className="text-purple-600 font-medium text-xs">{t('schedule.label_time')}</p>
                                                <p className="text-black">{formData.preferredTime}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg px-4 py-2">
                                            <p className="text-purple-600 font-medium text-xs">{t('schedule.label_payment')}</p>
                                            <p className="text-black capitalize">{cardMeta.brand} •••• {cardMeta.last4} &nbsp; exp {cardMeta.expiry}</p>
                                        </div>
                                    </div>

                                    {paymentError && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                            <p className="text-sm text-red-600">{paymentError}</p>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        {!isSubmitted ? (
                                            <>
                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={isProcessing}
                                                    className="inline-flex items-center justify-center gap-2 h-10 px-6 w-full bg-[#361b6b] text-white rounded-md shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:pointer-events-none"
                                                >
                                                    {isProcessing ? (
                                                        <>
                                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                                            </svg>
                                                            {t('schedule.processing_payment')}
                                                        </>
                                                    ) : t('schedule.confirm_pickup')}
                                                </button>
                                                <button
                                                    onClick={prevStep}
                                                    disabled={isProcessing}
                                                    className="h-10 px-6 w-full border-2 rounded-md hover:bg-gray-50 transition-all disabled:opacity-50"
                                                >
                                                    {t('schedule.back')}
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setIsSubmitted(false);
                                                    setCurrentStep(1);
                                                    setPaymentMethodId('');
                                                    setCardMeta({ last4: '', expiry: '', brand: '' });
                                                    setFormData({
                                                        fullName: '', phoneNumber: '', street: '', city: '', zip: '',
                                                        pickupDate: '', preferredTime: '', specialInstructions: '',
                                                        cardholderName: '', cardConsent: false,
                                                    });
                                                }}
                                                className="h-10 px-6 w-full bg-[#361b6b] text-white rounded-md shadow-lg hover:scale-105 transition-all"
                                            >
                                                {t('schedule.schedule_another')}
                                            </button>
                                        )}
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </I18nProvider>
        </AppHeaderLayout>
    );
}