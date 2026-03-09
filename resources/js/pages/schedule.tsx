import React, { useState } from 'react';
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import { useI18n, I18nProvider  } from '@/contexts/I18nContext';

export default function PickupScheduler() {
    return (
        <I18nProvider>
            <PickupSchedulerInner />
        </I18nProvider>
    );
}

function PickupSchedulerInner() {
    const { t } = useI18n();
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        fullName: '', phoneNumber: '', street: '', city: '', zip: '',
        pickupDate: '', preferredTime: '', specialInstructions: '',
        cardholderName: '', cardNumber: '', expiryDate: '', cvc: '',
        cardConsent: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
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
        else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) e.zip = t('schedule.error_zip_invalid');
        return e;
    };

    const validateStep2 = () => {
        const e = {};
        if (!formData.pickupDate) {
            e.pickupDate = t('schedule.error_date_required');
        } else {
            const selected = new Date(formData.pickupDate);
            const today = new Date(); today.setHours(0,0,0,0);
            if (selected < today) e.pickupDate = t('schedule.error_date_past');
        }
        if (!formData.preferredTime)          e.preferredTime   = t('schedule.error_time_required');
        if (!formData.cardholderName.trim())  e.cardholderName  = t('schedule.error_cardholder_required');
        if (!formData.cardNumber.trim())      e.cardNumber      = t('schedule.error_card_number_required');
        else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, '')))
            e.cardNumber = t('schedule.error_card_number_invalid');
        if (!formData.expiryDate.trim())      e.expiryDate = t('schedule.error_expiry_required');
        else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate))
            e.expiryDate = t('schedule.error_expiry_invalid');
        if (!formData.cvc.trim())             e.cvc = t('schedule.error_cvc_required');
        else if (!/^\d{3,4}$/.test(formData.cvc)) e.cvc = t('schedule.error_cvc_invalid');
        return e;
    };

    const nextStep = () => {
        const validationErrors = currentStep === 1 ? validateStep1() : currentStep === 2 ? validateStep2() : {};
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            const first = document.getElementsByName(Object.keys(validationErrors)[0])[0];
            if (first) { first.scrollIntoView({ behavior: 'smooth', block: 'center' }); first.focus(); }
            return;
        }
        setErrors({});
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => { setErrors({}); if (currentStep > 1) setCurrentStep(currentStep - 1); };
    const handleSubmit = () => { console.log('Form submitted:', formData); alert('Pickup confirmed!'); };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const parts = [];
        for (let i = 0; i < v.length; i += 4) parts.push(v.substring(i, i + 4));
        return parts.length ? parts.join(' ') : value;
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        return v.length >= 2 ? v.slice(0, 2) + '/' + v.slice(2, 4) : v;
    };

    const handleCardNumberChange = (e) => {
        setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) });
        if (errors.cardNumber) setErrors({ ...errors, cardNumber: '' });
    };

    const handleExpiryDateChange = (e) => {
        setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) });
        if (errors.expiryDate) setErrors({ ...errors, expiryDate: '' });
    };

    const inputClass = (field) =>
        `w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none ${
            errors[field] ? 'border-2 border-red-500' : 'border-0 focus:ring-2 focus:ring-purple-500'
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

                    {/* Progress Steps */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center">
                            {[
                                { step: 1, labelKey: 'schedule.step_contact', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" /> },
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

                        {/* Step 1 — Contact */}
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
                                        { name: 'fullName',     labelKey: 'schedule.full_name',    type: 'text',  placeholder: 'John Doe' },
                                        { name: 'phoneNumber',  labelKey: 'schedule.phone_number', type: 'tel',   placeholder: '(555) 123-4567' },
                                        { name: 'street',       labelKey: 'schedule.street',       type: 'text',  placeholder: '123 Main St' },
                                        { name: 'city',         labelKey: 'schedule.city_state',   type: 'text',  placeholder: 'Brockton, MA' },
                                        { name: 'zip',          labelKey: 'schedule.zip',          type: 'text',  placeholder: '02301', maxLength: 10 },
                                    ].map(({ name, labelKey, type, placeholder, maxLength }) => (
                                        <div key={name}>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t(labelKey)} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type={type} name={name} value={formData[name]}
                                                onChange={handleChange} placeholder={placeholder}
                                                maxLength={maxLength}
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
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule.cardholder_name')} <span className="text-red-500">*</span></label>
                                            <input type="text" name="cardholderName" value={formData.cardholderName} onChange={handleChange} className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.cardholderName ? 'border-2 border-red-500' : 'border-gray-200'}`} />
                                            {errors.cardholderName && <p className="mt-1 text-sm text-red-500">{errors.cardholderName}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule.card_number')} <span className="text-red-500">*</span></label>
                                            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleCardNumberChange} maxLength="19" className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.cardNumber ? 'border-2 border-red-500' : 'border-gray-200'}`} />
                                            {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule.expiry_date')} <span className="text-red-500">*</span></label>
                                                <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY" maxLength="5" className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.expiryDate ? 'border-2 border-red-500' : 'border-gray-200'}`} />
                                                {errors.expiryDate && <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule.cvc')} <span className="text-red-500">*</span></label>
                                                <input type="number" name="cvc" value={formData.cvc} onChange={handleChange} maxLength="4" className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.cvc ? 'border-2 border-red-500' : 'border-gray-200'}`} />
                                                {errors.cvc && <p className="mt-1 text-sm text-red-500">{errors.cvc}</p>}
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

                                <div className="space-y-3 pt-4">
                                    <button onClick={prevStep} className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors">
                                        {t('schedule.back')}
                                    </button>
                                    <button onClick={nextStep} disabled={!formData.cardConsent} className="inline-flex items-center justify-center gap-2 text-sm font-medium h-10 rounded-md px-6 w-full bg-[#361b6b] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:pointer-events-none disabled:grayscale">
                                        {t('schedule.continue_review')}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3 — Review */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
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
                                    <div className="bg-white rounded-lg px-4 py-2"><p className="text-purple-600 font-medium text-xs">{t('schedule.label_name')}</p><p className="text-black">{formData.fullName}</p></div>
                                    <div className="bg-white rounded-lg px-4 py-2"><p className="text-purple-600 font-medium text-xs">{t('schedule.label_phone')}</p><p className="text-black">{formData.phoneNumber}</p></div>
                                    <div className="bg-white rounded-lg px-4 py-2"><p className="text-purple-600 font-medium text-xs">{t('schedule.label_address')}</p><p className="text-black">{formData.street}, {formData.city} {formData.zip}</p></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white rounded-lg px-4 py-2"><p className="text-purple-600 font-medium text-xs">{t('schedule.label_date')}</p><p className="text-black">{formData.pickupDate}</p></div>
                                        <div className="bg-white rounded-lg px-4 py-2"><p className="text-purple-600 font-medium text-xs">{t('schedule.label_time')}</p><p className="text-black">{formData.preferredTime}</p></div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button onClick={handleSubmit} className="h-10 px-6 w-full bg-[#361b6b] text-white rounded-md shadow-lg hover:scale-105 transition-all">
                                        {t('schedule.confirm_pickup')}
                                    </button>
                                    <button onClick={prevStep} className="h-10 px-6 w-full border-2 rounded-md hover:bg-gray-50 transition-all">
                                        {t('schedule.back')}
                                    </button>
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