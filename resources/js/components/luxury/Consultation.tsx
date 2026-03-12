import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Calendar } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import { router } from '@inertiajs/react';

const PACKAGE_TO_SERVICE_MAP = {
    wedding:     'luxury.form_service_wedding',
    corporate:   'luxury.form_service_corporate',
    hospitality: 'luxury.form_service_hospitality',
};

const SERVICE_KEY_TO_VALUE = {
    'luxury.form_service_wedding':     'wedding',
    'luxury.form_service_corporate':   'corporate',
    'luxury.form_service_hospitality': 'hospitality',
    'luxury.form_service_theatre':     'theatre',
};

const COUNT_KEY_TO_VALUE = {
    'luxury.form_count_40':  '1-40',
    'luxury.form_count_100': '41-100',
    'luxury.form_count_200': '101-200',
    'luxury.form_count_500': '201-500',
};

const EMPTY_FORM = {
    firstName: '', lastName: '', company: '',
    phone: '', email: '', neededBy: '', details: '',
};

export default function ConsultationForm() {
    const { t } = useI18n();

    // Derived once on mount — stable for the lifetime of this page visit
    const selectedPackage = useMemo(() =>
        new URLSearchParams(window.location.search).get('package') ?? 'wedding'
    , []);

    const defaultServiceKey = PACKAGE_TO_SERVICE_MAP[selectedPackage] ?? 'luxury.form_service_wedding';

    const serviceOptionKeys = [
        'luxury.form_service_wedding',
        'luxury.form_service_corporate',
        'luxury.form_service_hospitality',
        'luxury.form_service_theatre',
    ];

    const countOptionKeys = [
        'luxury.form_count_40',
        'luxury.form_count_100',
        'luxury.form_count_200',
        'luxury.form_count_500',
    ];

    const [serviceOpen, setServiceOpen]               = useState(false);
    const [selectedServiceKey, setSelectedServiceKey] = useState(defaultServiceKey);
    const [countOpen, setCountOpen]                   = useState(false);
    const [selectedCountKey, setSelectedCountKey]     = useState('luxury.form_count_40');
    const [submitted, setSubmitted]                   = useState(false);
    const [errors, setErrors]                         = useState({});
    const [formData, setFormData]                     = useState(EMPTY_FORM);

    const serviceRef   = useRef(null);
    const countRef     = useRef(null);
    const dateInputRef = useRef(null);

    // Close dropdowns on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (serviceRef.current && !serviceRef.current.contains(event.target)) setServiceOpen(false);
            if (countRef.current && !countRef.current.contains(event.target)) setCountOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleDateContainerClick = () => {
        if (dateInputRef.current) {
            typeof dateInputRef.current.showPicker === 'function'
                ? dateInputRef.current.showPicker()
                : dateInputRef.current.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/luxury/consultation', {
            package:      selectedPackage,
            first_name:   formData.firstName,
            last_name:    formData.lastName,
            email:        formData.email,
            phone:        formData.phone      || null,
            company:      formData.company    || null,
            service_type: SERVICE_KEY_TO_VALUE[selectedServiceKey],
            item_count:   COUNT_KEY_TO_VALUE[selectedCountKey],
            needed_by:    formData.neededBy   || null,
            details:      formData.details    || null,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitted(true);
                setErrors({});
            },
            onError: (errs) => setErrors(errs),
        });
    };

    const resetForm = () => {
        setSubmitted(false);
        setFormData(EMPTY_FORM);
        setErrors({});
        setSelectedServiceKey(defaultServiceKey);
        setSelectedCountKey('luxury.form_count_40');
    };

    const inputClass = (field) =>
        `w-full px-5 py-3.5 border rounded-2xl bg-[#fcfaff] focus:ring-2 focus:ring-[#b47bff] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700 ${
            errors[field] ? 'border-red-400 bg-red-50' : 'border-[#f3e9ff]'
        }`;

    const labelClass = "block text-[#361b6b] text-sm font-bold uppercase tracking-wider";

    if (submitted) {
        return (
            <div className="py-20 px-4 bg-[#fafafa] flex items-center justify-center" id="consultation">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8 text-[#5c2baa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl text-gray-900">{t('luxury.consultation_success_title')}</h2>
                    <p className="text-gray-600">{t('luxury.consultation_success_subtitle')}</p>
                    <button
                        onClick={resetForm}
                        className="text-[#361b6b] underline text-sm hover:text-purple-700"
                    >
                        {t('luxury.consultation_submit_another')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20 px-4 bg-[#fafafa] flex items-center justify-center font-sans" id="consultation">
            <div className="container mx-auto max-w-3xl bg-white rounded-[2.5rem] shadow-2xl shadow-purple-900/5 p-8 md:p-14 border border-[#f3e9ff]">

                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-sans mb-4 tracking-tight">{t('luxury.consultation_title')}</h2>
                    <p className="text-gray-500 text-md md:text-xl leading-relaxed">{t('luxury.consultation_subtitle')}</p>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>

                    {/* Row 1 — Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className={labelClass}>{t('luxury.form_first_name')}</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className={inputClass('first_name')} />
                            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                        </div>
                        <div className="space-y-3">
                            <label className={labelClass}>{t('luxury.form_last_name')}</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Smith" className={inputClass('last_name')} />
                            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                        </div>
                    </div>

                    {/* Row 2 — Company & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className={labelClass}>{t('luxury.form_company')}</label>
                            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your Company" className={inputClass('company')} />
                            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                        </div>
                        <div className="space-y-3">
                            <label className={labelClass}>{t('luxury.form_phone')}</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(508) 555-0100" className={inputClass('phone')} />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                    </div>

                    {/* Row 3 — Email & Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className={labelClass}>{t('luxury.form_email')}</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" className={inputClass('email')} />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="space-y-3">
                            <label className={labelClass}>{t('luxury.form_needed_by')}</label>
                            <div className="relative group cursor-pointer" onClick={handleDateContainerClick}>
                                <input
                                    ref={dateInputRef}
                                    type="date"
                                    name="neededBy"
                                    value={formData.neededBy}
                                    onChange={handleChange}
                                    className={`${inputClass('needed_by')} pr-12 uppercase cursor-pointer`}
                                />
                                <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b47bff] pointer-events-none group-hover:text-[#5c2baa] transition-colors" />
                            </div>
                            {errors.needed_by && <p className="text-red-500 text-xs mt-1">{errors.needed_by}</p>}
                        </div>
                    </div>

                    {/* Row 4 — Service Type & Item Count */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Service Type */}
                        <div className="space-y-3" ref={serviceRef}>
                            <label className={labelClass}>{t('luxury.form_service_type')}</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setServiceOpen(!serviceOpen)}
                                    className={`flex items-center justify-between w-full px-5 py-3.5 border rounded-2xl transition-all duration-300 ${
                                        serviceOpen ? 'border-[#b47bff] ring-4 ring-purple-100 bg-white' : 'border-[#f3e9ff] bg-[#fcfaff]'
                                    }`}
                                >
                                    <span className="text-gray-900 font-medium">{t(selectedServiceKey)}</span>
                                    <ChevronDown className={`w-5 h-5 text-[#b47bff] transition-transform duration-300 ${serviceOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {serviceOpen && (
                                    <div className="absolute z-50 w-full mt-2 bg-white border border-[#f3e9ff] rounded-2xl shadow-2xl shadow-purple-900/10 overflow-hidden">
                                        <div className="py-2">
                                            {serviceOptionKeys.map((key) => (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => { setSelectedServiceKey(key); setServiceOpen(false); }}
                                                    className="flex items-center justify-between w-full px-5 py-3 text-left text-sm hover:bg-[#f3e9ff] transition-colors"
                                                >
                                                    <span className={selectedServiceKey === key ? 'text-[#5c2baa] font-bold' : 'text-gray-600'}>
                                                        {t(key)}
                                                    </span>
                                                    {selectedServiceKey === key && <Check className="w-4 h-4 text-[#5c2baa]" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {errors.service_type && <p className="text-red-500 text-xs mt-1">{errors.service_type}</p>}
                        </div>

                        {/* Item Count */}
                        <div className="space-y-3" ref={countRef}>
                            <label className={labelClass}>{t('luxury.form_item_count')}</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setCountOpen(!countOpen)}
                                    className={`flex items-center justify-between w-full px-5 py-3.5 border rounded-2xl transition-all duration-300 ${
                                        countOpen ? 'border-[#b47bff] ring-4 ring-purple-100 bg-white' : 'border-[#f3e9ff] bg-[#fcfaff]'
                                    }`}
                                >
                                    <span className="text-gray-900 font-medium">{t(selectedCountKey)}</span>
                                    <ChevronDown className={`w-5 h-5 text-[#b47bff] transition-transform duration-300 ${countOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {countOpen && (
                                    <div className="absolute z-50 w-full mt-2 bg-white border border-[#f3e9ff] rounded-2xl shadow-2xl shadow-purple-900/10 overflow-hidden">
                                        <div className="py-2">
                                            {countOptionKeys.map((key) => (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => { setSelectedCountKey(key); setCountOpen(false); }}
                                                    className="flex items-center justify-between w-full px-5 py-3 text-left text-sm hover:bg-[#f3e9ff] transition-colors"
                                                >
                                                    <span className={selectedCountKey === key ? 'text-[#5c2baa] font-bold' : 'text-gray-600'}>
                                                        {t(key)}
                                                    </span>
                                                    {selectedCountKey === key && <Check className="w-4 h-4 text-[#5c2baa]" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {errors.item_count && <p className="text-red-500 text-xs mt-1">{errors.item_count}</p>}
                        </div>
                    </div>

                    {/* Row 5 — Details */}
                    <div className="space-y-3">
                        <label className={labelClass}>{t('luxury.form_details')}</label>
                        <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            rows={4}
                            placeholder={t('luxury.form_details_placeholder')}
                            className="w-full px-5 py-4 border border-[#f3e9ff] rounded-2xl bg-[#fcfaff] focus:ring-2 focus:ring-[#b47bff] focus:bg-white outline-none transition-all resize-none text-gray-700 leading-relaxed"
                        />
                        {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#361b6b] hover:bg-[#5c2baa] text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-purple-900/20 active:scale-95 text-base cursor-pointer"
                    >
                        {t('luxury.form_submit')}
                    </button>

                </form>
            </div>
        </div>
    );
}