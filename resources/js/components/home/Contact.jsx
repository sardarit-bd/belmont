import { useState, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';

function generateCaptcha() {
    const a = Math.floor(Math.random() * 15) + 1;
    const b = Math.floor(Math.random() * 15) + 1;
    return { a, b, answer: a + b };
}

export default function Contact() {
    const { t } = useI18n();

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', message: '', numcaptcha: ''
    });
    const [captcha, setCaptcha]     = useState(() => generateCaptcha());
    const [errors, setErrors]       = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setCaptcha(generateCaptcha());
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim())    newErrors.name    = t('contact.error_name');
        if (!formData.email.trim())   newErrors.email   = t('contact.error_email');
        if (!formData.phone.trim())   newErrors.phone   = t('contact.error_phone');
        if (!formData.message.trim()) newErrors.message = t('contact.error_message');

        if (!formData.numcaptcha.trim()) {
            newErrors.numcaptcha = t('contact.error_captcha_empty');
        } else if (parseInt(formData.numcaptcha, 10) !== captcha.answer) {
            newErrors.numcaptcha = t('contact.error_captcha_wrong');
            setCaptcha(generateCaptcha());
            setFormData((prev) => ({ ...prev, numcaptcha: '' }));
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setSubmitted(true);
        setErrors({});
    };

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        setFormData((prev) => ({ ...prev, numcaptcha: '' }));
        setErrors((prev) => ({ ...prev, numcaptcha: null }));
    };

    const resetForm = () => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '', numcaptcha: '' });
        setCaptcha(generateCaptcha());
    };

    if (submitted) {
        return (
            <div className="min-h-screen py-12 px-4 bg-gradient-to-r from-white via-[#FBF8FF] to-purple-100/60 flex items-center justify-center" id="contact">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8 text-[#5c2baa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl text-gray-900">{t('contact.success_title')}</h2>
                    <p className="text-gray-600">{t('contact.success_subtitle')}</p>
                    <button onClick={resetForm} className="text-[#361b6b] underline text-sm hover:text-purple-700">
                        {t('contact.send_another')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 scroll-mt-16 bg-gradient-to-r from-white via-[#FBF8FF] to-purple-100/60" id="contact">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl text-gray-900 mb-4">{t('contact.title')}</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('contact.subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">

                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-xl text-gray-900 mb-2">{t('contact.form_title')}</h2>
                        <p className="text-gray-600 mb-6">{t('contact.form_subtitle')}</p>

                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={t('contact.name')}
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 placeholder-gray-500
                                            ${errors.name ? 'border-red-400 bg-red-50' : 'border-0'}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={t('contact.email')}
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 placeholder-gray-500
                                            ${errors.email ? 'border-red-400 bg-red-50' : 'border-0'}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder={t('contact.phone')}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 placeholder-gray-500
                                        ${errors.phone ? 'border-red-400 bg-red-50' : 'border-0'}`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    placeholder={t('contact.message')}
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 placeholder-gray-500 resize-none
                                        ${errors.message ? 'border-red-400 bg-red-50' : 'border-0'}`}
                                />
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>

                            {/* Dynamic Captcha */}
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500 flex-shrink-0">
                                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                    </svg>
                                    <span className="whitespace-nowrap">
                                        {t('contact.verify_human')}: {captcha.a} + {captcha.b} =
                                    </span>
                                    <input
                                        value={formData.numcaptcha}
                                        onChange={handleChange}
                                        name="numcaptcha"
                                        type="number"
                                        className={`w-16 px-2 py-1 bg-gray-50 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900
                                            ${errors.numcaptcha ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={refreshCaptcha}
                                        title="Get a new question"
                                        className="text-gray-400 hover:text-purple-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                </div>
                                {errors.numcaptcha && (
                                    <p className="text-red-500 text-xs ml-7">{errors.numcaptcha}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#361b6b] hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 text-sm cursor-pointer"
                            >
                                {t('contact.send_button')}
                            </button>
                        </form>
                    </div>

                    {/* Business Information */}
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-[#5c2baa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl text-gray-900 mb-2">{t('contact.visit_us')}</h3>
                                <p className="text-gray-600">92 Torrey St</p>
                                <p className="text-gray-600">Brockton, MA 02301</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-[#5c2baa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl text-gray-900 mb-2">{t('contact.business_hours')}</h3>
                                <p className="text-gray-600">{t('contact.hours_weekday')}</p>
                                <p className="text-gray-600">{t('contact.hours_saturday')}</p>
                                <p className="text-gray-600">{t('contact.hours_sunday')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}