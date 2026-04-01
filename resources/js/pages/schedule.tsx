import React, { useState, useRef } from 'react';
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import { useI18n, I18nProvider } from '@/contexts/I18nContext';
import { usePage } from '@inertiajs/react';

export default function PickupScheduler() {
    return (
        <I18nProvider>
            <PickupSchedulerInner />
        </I18nProvider>
    );
}

function PickupSchedulerInner() {

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
    const activeGateway = props?.payment_gateway ?? 'stripe';

    const [currentStep,  setCurrentStep]  = useState(1);
    const [errors,       setErrors]       = useState({});
    const [touched,      setTouched]      = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSubmitted,  setIsSubmitted]  = useState(false);
    const [paymentError, setPaymentError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '', phoneNumber: '', street: '', city: '', zip: '',
        pickupDate: '', preferredTime: '', specialInstructions: '',
        cardholderName: '',
        paymentMethodId: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        cardConsent: false,
    });

    const mapServerFieldToClientField = (field) => {
        const map = {
            full_name: 'fullName',
            phone_number: 'phoneNumber',
            pickup_date: 'pickupDate',
            preferred_time: 'preferredTime',
            special_instructions: 'specialInstructions',
            cardholder_name: 'cardholderName',
            payment_method_id: 'paymentMethodId',
            card_number: 'cardNumber',
            card_expiry: 'cardExpiry',
            card_cvc: 'cardCvc',
            card_last_four: 'cardLastFour',
        };

        return map[field] ?? field;
    };

    const normalizeServerErrors = (serverErrors) => {
        const normalized = {};

        Object.entries(serverErrors || {}).forEach(([rawKey, rawValue]) => {
            const key = mapServerFieldToClientField(rawKey);
            const value = Array.isArray(rawValue) ? rawValue[0] : String(rawValue ?? '');
            normalized[key] = value;
        });

        return normalized;
    };

    // ─── Per-field validators ────────────────────────────────────────────────

    const validators = {
        fullName: (v) => {
            if (!v.trim()) return t('schedule.error_full_name_required');
            return '';
        },
        phoneNumber: (v) => {
            if (!v.trim()) return t('schedule.error_phone_required');
            if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v.replace(/\s/g, '')))
                return t('schedule.error_phone_invalid');
            return '';
        },
        street: (v) => (!v.trim() ? t('schedule.error_street_required') : ''),
        city:   (v) => (!v.trim() ? t('schedule.error_city_required')   : ''),

        zip: (v) => {
            if (!v.trim()) return t('schedule.error_zip_required');
            if (!/^\d{5}$/.test(v)) return t('schedule.error_zip_invalid');
            return '';
        },
        pickupDate: (v) => {
            if (!v) return t('schedule.error_date_required');
            const selected = new Date(v);
            const today = new Date(); today.setHours(0, 0, 0, 0);
            if (selected < today) return t('schedule.error_date_past');
            return '';
        },
        preferredTime: (v) => (!v ? t('schedule.error_time_required') : ''),
        cardholderName: (v) => (!v.trim() ? t('schedule.error_cardholder_required') : ''),
        cardNumber: (v) => {
            const raw = v.replace(/\s/g, '');
            if (!raw) return t('schedule.error_card_number_required');
            if (!/^\d{16}$/.test(raw)) return t('schedule.error_card_number_invalid');
            return '';
        },
        cardExpiry: (v) => {
            if (!v.trim()) return t('schedule.error_expiry_required');
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(v)) return t('schedule.error_expiry_invalid');
            const [mm, yy] = v.split('/');
            const expMonth = parseInt(mm, 10);
            const expYear  = 2000 + parseInt(yy, 10);
            const now      = new Date();
            if (expYear < now.getFullYear() || (expYear === now.getFullYear() && expMonth < now.getMonth() + 1))
                return t('schedule.error_expiry_expired');
            return '';
        },
        cardCvc: (v) => {
            if (!v.trim()) return t('schedule.error_cvc_required');
            if (!/^\d{3,4}$/.test(v)) return t('schedule.error_cvc_invalid');
            return '';
        },
    };

    // Validate a single field and update errors state
    const validateField = (name, value) => {
        const validator = validators[name];
        if (!validator) return '';
        const error = validator(value);
        setErrors(prev => ({ ...prev, [name]: error }));
        return error;
    };

    // Mark field as touched on blur, then validate
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, value);
    };

    // On change: always update formData; only re-validate if field was already touched
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prev => ({ ...prev, [name]: newValue }));
        if (touched[name]) {
            validateField(name, newValue);
        }
    };

    // ─── Step validators (used on Next click) ───────────────────────────────

    const validateStep1 = () => {
        const fields = ['fullName', 'phoneNumber', 'street', 'city', 'zip'];
        const newErrors = {};
        const newTouched = {};
        fields.forEach(field => {
            newTouched[field] = true;
            const error = validators[field]?.(formData[field]) ?? '';
            if (error) newErrors[field] = error;
        });
        setTouched(prev => ({ ...prev, ...newTouched }));
        setErrors(prev => ({ ...prev, ...newErrors }));
        return newErrors;
    };

    const validateStep2 = () => {
        const fields = ['pickupDate', 'preferredTime', 'cardholderName', 'cardNumber', 'cardExpiry', 'cardCvc'];
        const newErrors = {};
        const newTouched = {};
        fields.forEach(field => {
            newTouched[field] = true;
            const error = validators[field]?.(formData[field]) ?? '';
            if (error) newErrors[field] = error;
        });
        setTouched(prev => ({ ...prev, ...newTouched }));
        setErrors(prev => ({ ...prev, ...newErrors }));
        return newErrors;
    };

    // ─── Navigation ─────────────────────────────────────────────────────────

    const nextStep = () => {
        if (currentStep === 1) {
            const validationErrors = validateStep1();
            if (Object.keys(validationErrors).length > 0) {
                const first = document.getElementsByName(Object.keys(validationErrors)[0])[0];
                if (first) { first.scrollIntoView({ behavior: 'smooth', block: 'center' }); first.focus(); }
                return;
            }
            setCurrentStep(2);
        }
        if (currentStep === 2) {
            const validationErrors = validateStep2();
            if (Object.keys(validationErrors).length > 0) return;
            setCurrentStep(3);
        }
    };

    const prevStep = () => {
        setPaymentError('');
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // ─── Submit ──────────────────────────────────────────────────────────────

    const handleSubmit = async () => {
        if (isProcessing) return;
        if (cart.length === 0) {
            setPaymentError(t('schedule.error_no_items'));
            return;
        }
        setIsProcessing(true);
        setPaymentError('');
        try {
            const cardNum = formData.cardNumber.replace(/\s/g, '');
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
                    payment_method_id:    formData.paymentMethodId || undefined,
                    card_number:          cardNum,
                    card_expiry:          formData.cardExpiry,
                    card_cvc:             formData.cardCvc,
                    card_last_four:       cardNum.slice(-4),
                    items: cart.map(item => ({
                        id: item.id, name: item.name, price: item.price, quantity: item.quantity,
                    })),
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                if (data.errors) {
                    const normalized = normalizeServerErrors(data.errors);
                    setErrors(prev => ({ ...prev, ...normalized }));
                    setTouched(prev => ({
                        ...prev,
                        ...Object.fromEntries(Object.keys(normalized).map(key => [key, true])),
                    }));

                    const firstMessage = Object.values(normalized)[0];
                    setPaymentError(firstMessage || data.message || t('schedule.error_generic'));
                } else {
                    setPaymentError(data.message || t('schedule.error_generic'));
                }
                setIsProcessing(false);
                return;
            }
            localStorage.removeItem('laundryServiceCart');
            setCart([]);
            setIsSubmitted(true);
        } catch (err) {
            setPaymentError(t('schedule.error_generic'));
        } finally {
            setIsProcessing(false);
        }
    };

    // ─── Input class helpers ─────────────────────────────────────────────────

    // Returns '' | 'error' | 'success' for a field
    const fieldStatus = (name) => {
        if (!touched[name]) return '';
        if (errors[name])   return 'error';
        return 'success';
    };

    const inputClass = (field) => {
        const status = fieldStatus(field);
        return `w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none transition-all ${
            status === 'error'   ? 'border-2 border-red-500 bg-red-50'
          : status === 'success' ? 'border-2 border-green-500 bg-green-50'
          : 'border-0 focus:ring-2 focus:ring-purple-500'
        }`;
    };

    const cardInputClass = (field) => {
        const status = fieldStatus(field);
        return `w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all ${
            status === 'error'   ? 'border-2 border-red-500 bg-red-50'
          : status === 'success' ? 'border-2 border-green-500 bg-green-50'
          : 'border-gray-200'
        }`;
    };

    // Small icon shown at the right of touched fields
    const FieldIcon = ({ name }) => {
        const status = fieldStatus(name);
        if (!status) return null;
        if (status === 'success') return (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </span>
        );
        return (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </span>
        );
    };

    // ─── Card-specific handlers ──────────────────────────────────────────────

    const expiryRef = useRef(null);
    const cvcRef    = useRef(null);

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/[^\d]/g, '').slice(0, 16);
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setFormData(prev => ({ ...prev, cardNumber: value }));
        if (touched.cardNumber) validateField('cardNumber', value);
        if (value.replace(/\s/g, '').length === 16) expiryRef.current?.focus();
    };

    const handleCardExpiryChange = (e) => {
        let value = e.target.value.replace(/[^\d]/g, '').slice(0, 4);
        if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2);
        setFormData(prev => ({ ...prev, cardExpiry: value }));
        if (touched.cardExpiry) validateField('cardExpiry', value);
        if (value.replace(/[^\d]/g, '').length === 4) cvcRef.current?.focus();
    };

    const handleCardCvcChange = (e) => {
        const value = e.target.value.replace(/[^\d]/g, '').slice(0, 4);
        setFormData(prev => ({ ...prev, cardCvc: value }));
        if (touched.cardCvc) validateField('cardCvc', value);
    };

    // ─── Render ──────────────────────────────────────────────────────────────

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

                        {/* Progress Steps */}
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

                            {/* ── Step 1 — Contact ── */}
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
                                            { name: 'zip',         labelKey: 'schedule.zip',          type: 'text', placeholder: '02300', maxLength: 5, inputMode: 'numeric',
                                              onInput: (e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 5); } },
                                        ].map(({ name, labelKey, type, placeholder, maxLength, inputMode, onInput }) => (
                                            <div key={name}>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t(labelKey)} <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={type} name={name} value={formData[name]}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder={placeholder}
                                                        maxLength={maxLength}
                                                        inputMode={inputMode}
                                                        onInput={onInput}
                                                        className={inputClass(name)}
                                                    />
                                                    <FieldIcon name={name} />
                                                </div>
                                                {touched[name] && errors[name] && (
                                                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                                        {errors[name]}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <button onClick={nextStep} className="inline-flex items-center justify-center gap-2 text-sm font-medium h-10 rounded-md px-6 w-full bg-[#361b6b] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mt-5">
                                        {t('schedule.continue_schedule')}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </button>
                                </div>
                            )}

                            {/* ── Step 2 — Schedule + Payment ── */}
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
                                            <div className="relative">
                                                <input
                                                    type="date" name="pickupDate" value={formData.pickupDate}
                                                    onChange={handleChange} onBlur={handleBlur}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className={inputClass('pickupDate')} style={{ colorScheme: 'light' }}
                                                />
                                                <FieldIcon name="pickupDate" />
                                            </div>
                                            {touched.pickupDate && errors.pickupDate && <p className="mt-1 text-sm text-red-500">{errors.pickupDate}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule.preferred_time')} <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <input
                                                    type="time" name="preferredTime" value={formData.preferredTime}
                                                    onChange={handleChange} onBlur={handleBlur}
                                                    className={inputClass('preferredTime')} style={{ colorScheme: 'light' }}
                                                />
                                                <FieldIcon name="preferredTime" />
                                            </div>
                                            {touched.preferredTime && errors.preferredTime && <p className="mt-1 text-sm text-red-500">{errors.preferredTime}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('schedule.special_instructions')} <span className="text-gray-400 text-xs">({t('schedule.optional')})</span>
                                        </label>
                                        <textarea
                                            name="specialInstructions" value={formData.specialInstructions}
                                            onChange={handleChange}
                                            placeholder={t('schedule.special_instructions_placeholder')}
                                            rows="3"
                                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                                        />
                                    </div>

                                    {/* Payment section */}
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{t('schedule.payment_title')}</h3>
                                                <p className="text-sm text-gray-600">{t('schedule.payment_subtitle')} ({String(activeGateway).toUpperCase()})</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">

                                            {/* Cardholder Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule.cardholder_name')} <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <input
                                                        type="text" name="cardholderName" value={formData.cardholderName}
                                                        onChange={handleChange} onBlur={handleBlur}
                                                        placeholder="John Doe"
                                                        className={cardInputClass('cardholderName')}
                                                    />
                                                    <FieldIcon name="cardholderName" />
                                                </div>
                                                {touched.cardholderName && errors.cardholderName && <p className="mt-1 text-sm text-red-500">{errors.cardholderName}</p>}
                                            </div>

                                            {/* Card Number */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule.card_number')} <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <input
                                                        type="text" name="cardNumber" value={formData.cardNumber}
                                                        onChange={handleCardNumberChange}
                                                        onBlur={handleBlur}
                                                        placeholder="4242 4242 4242 4242"
                                                        inputMode="numeric" autoComplete="cc-number" maxLength={19}
                                                        className={cardInputClass('cardNumber')}
                                                    />
                                                    <FieldIcon name="cardNumber" />
                                                </div>
                                                {touched.cardNumber && errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                                            </div>

                                            {/* Expiry + CVC */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule.expiry_date')} <span className="text-red-500">*</span></label>
                                                    <div className="relative">
                                                        <input
                                                            ref={expiryRef}
                                                            type="text" name="cardExpiry" value={formData.cardExpiry}
                                                            onChange={handleCardExpiryChange}
                                                            onBlur={handleBlur}
                                                            placeholder="MM/YY"
                                                            inputMode="numeric" autoComplete="cc-exp" maxLength={5}
                                                            className={cardInputClass('cardExpiry')}
                                                        />
                                                        <FieldIcon name="cardExpiry" />
                                                    </div>
                                                    {touched.cardExpiry && errors.cardExpiry && <p className="mt-1 text-sm text-red-500">{errors.cardExpiry}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule.cvc')} <span className="text-red-500">*</span></label>
                                                    <div className="relative">
                                                        <input
                                                            ref={cvcRef}
                                                            type="text" name="cardCvc" value={formData.cardCvc}
                                                            onChange={handleCardCvcChange}
                                                            onBlur={handleBlur}
                                                            placeholder="123"
                                                            inputMode="numeric" autoComplete="cc-csc" maxLength={4}
                                                            className={cardInputClass('cardCvc')}
                                                        />
                                                        <FieldIcon name="cardCvc" />
                                                    </div>
                                                    {touched.cardCvc && errors.cardCvc && <p className="mt-1 text-sm text-red-500">{errors.cardCvc}</p>}
                                                </div>
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
                                            disabled={!formData.cardConsent || isProcessing}
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

                            {/* ── Step 3 — Review ── */}
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
                                            <p className="text-black">•••• •••• •••• {formData.cardNumber.replace(/\s/g, '').slice(-4)} &nbsp; exp {formData.cardExpiry}</p>
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
                                                    setTouched({});
                                                    setErrors({});
                                                    setFormData({
                                                        fullName: '', phoneNumber: '', street: '', city: '', zip: '',
                                                        pickupDate: '', preferredTime: '', specialInstructions: '',
                                                        cardholderName: '', paymentMethodId: '', cardNumber: '', cardExpiry: '', cardCvc: '',
                                                        cardConsent: false,
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
