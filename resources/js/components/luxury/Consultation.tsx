import { useState, useRef, useEffect } from 'react';
import { Phone, ChevronDown, Check, Calendar } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';

export default function ConsultationForm() {
    const { t } = useI18n();

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

    const [serviceOpen, setServiceOpen]       = useState(false);
    const [selectedServiceKey, setSelectedServiceKey] = useState('luxury.form_service_wedding');
    const [countOpen, setCountOpen]           = useState(false);
    const [selectedCountKey, setSelectedCountKey]     = useState('luxury.form_count_40');

    const serviceRef  = useRef(null);
    const countRef    = useRef(null);
    const dateInputRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (serviceRef.current && !serviceRef.current.contains(event.target)) setServiceOpen(false);
            if (countRef.current && !countRef.current.contains(event.target)) setCountOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDateContainerClick = () => {
        if (dateInputRef.current) {
            typeof dateInputRef.current.showPicker === 'function'
                ? dateInputRef.current.showPicker()
                : dateInputRef.current.focus();
        }
    };

    const inputClass = "w-full px-5 py-3.5 border border-[#f3e9ff] rounded-2xl bg-[#fcfaff] focus:ring-2 focus:ring-[#b47bff] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700";
    const labelClass = "block text-[#361b6b] text-sm font-bold uppercase tracking-wider";

    return (
        <div className="py-20 px-4 bg-[#fafafa] flex items-center justify-center font-sans" id="consultation">
            <div className="container mx-auto max-w-3xl bg-white rounded-[2.5rem] shadow-2xl shadow-purple-900/5 p-8 md:p-14 border border-[#f3e9ff]">

                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-sans mb-4 tracking-tight">{t('luxury.consultation_title')}</h2>
                    <p className="text-gray-500 text-md md:text-xl leading-relaxed">{t('luxury.consultation_subtitle')}</p>
                </div>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

                    {/* Row 1 — Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className={labelClass}>{t('luxury.form_first_name')}</label>
                            <input type="text" placeholder="John" className={inputClass} />
                        </div>
                        <div className="space-y-3">
                            <label className={labelClass}>{t('luxury.form_last_name')}</label>
                            <input type="text" placeholder="Smith" className={inputClass} />
                        </div>
                    </div>

                    {/* Row 2 — Company & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className={labelClass}>{t('luxury.form_company')}</label>
                            <input type="text" placeholder="Your Company" className={inputClass} />
                        </div>
                        <div className="space-y-3">
                            <label className={labelClass}>{t('luxury.form_phone')}</label>
                            <input type="tel" placeholder="(508) 555-0100" className={inputClass} />
                        </div>
                    </div>

                    {/* Row 3 — Email & Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className={labelClass}>{t('luxury.form_email')}</label>
                            <input type="email" placeholder="john@company.com" className={inputClass} />
                        </div>
                        <div className="space-y-3">
                            <label className={labelClass}>{t('luxury.form_needed_by')}</label>
                            <div className="relative group cursor-pointer" onClick={handleDateContainerClick}>
                                <input ref={dateInputRef} type="date" className={`${inputClass} pr-12 uppercase cursor-pointer`} />
                                <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b47bff] pointer-events-none group-hover:text-[#5c2baa] transition-colors" />
                            </div>
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
                        </div>
                    </div>

                    {/* Row 5 — Details */}
                    <div className="space-y-3">
                        <label className={labelClass}>{t('luxury.form_details')}</label>
                        <textarea
                            rows={4}
                            placeholder={t('luxury.form_details_placeholder')}
                            className="w-full px-5 py-4 border border-[#f3e9ff] rounded-2xl bg-[#fcfaff] focus:ring-2 focus:ring-[#b47bff] focus:bg-white outline-none transition-all resize-none text-gray-700 leading-relaxed"
                        />
                    </div>

                    <button className="w-full bg-[#361b6b] hover:bg-[#5c2baa] text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-purple-900/20 active:scale-95 text-base cursor-pointer">
                        {t('luxury.form_submit')}
                    </button>

                </form>
            </div>
        </div>
    );
}