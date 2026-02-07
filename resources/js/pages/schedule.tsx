import React, { useState } from 'react';
import AppHeaderLayout from "@/layouts/app/app-header-layout";

export default function PickupScheduler() {
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        // Step 1 - Contact
        fullName: '',
        phoneNumber: '',
        street: '',
        city: '',
        zip: '',
        // Step 2 - Schedule
        pickupDate: '',
        preferredTime: '',
        specialInstructions: '',
        // Payment
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        cardConsent: false // Added state for mandatory checkbox
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
        }
        
        if (!formData.street.trim()) {
            newErrors.street = 'Street address is required';
        }
        
        if (!formData.city.trim()) {
            newErrors.city = 'City/State is required';
        }
        
        if (!formData.zip.trim()) {
            newErrors.zip = 'Zip code is required';
        } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
            newErrors.zip = 'Please enter a valid zip code';
        }
        
        return newErrors;
    };

    const validateStep2 = () => {
        const newErrors = {};
        
        if (!formData.pickupDate) {
            newErrors.pickupDate = 'Pickup date is required';
        } else {
            const selectedDate = new Date(formData.pickupDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.pickupDate = 'Please select a future date';
            }
        }
        
        if (!formData.preferredTime) {
            newErrors.preferredTime = 'Preferred time is required';
        }
        
        if (!formData.cardholderName.trim()) {
            newErrors.cardholderName = 'Cardholder name is required';
        }
        
        if (!formData.cardNumber.trim()) {
            newErrors.cardNumber = 'Card number is required';
        } else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
            newErrors.cardNumber = 'Please enter a valid card number';
        }
        
        if (!formData.expiryDate.trim()) {
            newErrors.expiryDate = 'Expiry date is required';
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
            newErrors.expiryDate = 'Format: MM/YY';
        }
        
        if (!formData.cvc.trim()) {
            newErrors.cvc = 'CVC is required';
        } else if (!/^\d{3,4}$/.test(formData.cvc)) {
            newErrors.cvc = 'Please enter a valid CVC';
        }
        
        return newErrors;
    };

    const nextStep = () => {
        let validationErrors = {};
        
        if (currentStep === 1) {
            validationErrors = validateStep1();
        } else if (currentStep === 2) {
            validationErrors = validateStep2();
        }
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            const firstErrorField = Object.keys(validationErrors)[0];
            const element = document.getElementsByName(firstErrorField)[0];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.focus();
            }
            return;
        }
        
        setErrors({});
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        setErrors({});
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('Pickup confirmed! We will contact you shortly.');
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(' ') : value;
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) return v.slice(0, 2) + '/' + v.slice(2, 4);
        return v;
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        setFormData({ ...formData, cardNumber: formatted });
        if (errors.cardNumber) setErrors({ ...errors, cardNumber: '' });
    };

    const handleExpiryDateChange = (e) => {
        const formatted = formatExpiryDate(e.target.value);
        setFormData({ ...formData, expiryDate: formatted });
        if (errors.expiryDate) setErrors({ ...errors, expiryDate: '' });
    };

    return (
        <AppHeaderLayout>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-3">
                        <h1 className="mb-6 text-5xl md:text-6xl bg-[#361b6b] bg-clip-text text-transparent">
                            Schedule Your Pickup
                        </h1>
                        <p className="text-gray-600">
                            Complete these 3 simple steps and we'll take care of the rest
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#361b6b]' : 'bg-gray-300'} transition-colors`}>
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className={`mt-2 text-sm font-medium ${currentStep >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>Contact</span>
                            </div>
                            <div className={`w-24 h-1 mx-2 ${currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-300'} transition-colors`}></div>
                            <div className="flex flex-col items-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#361b6b]' : 'bg-gray-300'} transition-colors`}>
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className={`mt-2 text-sm font-medium ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>Schedule</span>
                            </div>
                            <div className={`w-24 h-1 mx-2 ${currentStep >= 3 ? 'bg-purple-600' : 'bg-gray-300'} transition-colors`}></div>
                            <div className="flex flex-col items-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-[#361b6b]' : 'bg-gray-300'} transition-colors`}>
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className={`mt-2 text-sm font-medium ${currentStep >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>Confirm</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8">
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
                                        <h2 className="mb-0">Contact Information</h2>
                                        <p className="text-sm text-gray-600">Tell us where to find you</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className={`w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none ${errors.fullName ? 'border-2 border-red-500 focus:border-red-500 focus:ring-0' : 'border-0 focus:ring-2 focus:ring-purple-500'}`} />
                                        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="(555) 123-4567" className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.phoneNumber ? 'ring-2 ring-red-500' : ''}`} />
                                        {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Street <span className="text-red-500">*</span></label>
                                        <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="123 Main St" className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.street ? 'ring-2 ring-red-500' : ''}`} />
                                        {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City/State <span className="text-red-500">*</span></label>
                                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Brockton, MA" className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.city ? 'ring-2 ring-red-500' : ''}`} />
                                        {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Zip <span className="text-red-500">*</span></label>
                                        <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="02301" maxLength="10" className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.zip ? 'ring-2 ring-red-500' : ''}`} />
                                        {errors.zip && <p className="mt-1 text-sm text-red-500">{errors.zip}</p>}
                                    </div>
                                </div>
                                <button onClick={nextStep} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-10 rounded-md px-6 w-full bg-[#361b6b] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mt-5">Continue to Schedule <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></button>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="bg-purple-50 rounded-lg p-4 flex items-start gap-3">
                                    <div className="w-10 h-10 bg-[#361b6b] rounded-lg flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg></div>
                                    <div><h2 className="mb-0">Pick Your Perfect Time</h2><p className="text-sm text-gray-600">When should we swing by?</p></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date <span className="text-red-500">*</span></label><input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className={`w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none ${errors.pickupDate ? 'border-2 border-red-500' : 'border-0 focus:ring-2 focus:ring-purple-500'}`} style={{ colorScheme: 'light' }} />{errors.pickupDate && <p className="mt-1 text-sm text-red-500">{errors.pickupDate}</p>}</div>
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time <span className="text-red-500">*</span></label><input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className={`w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none ${errors.preferredTime ? 'border-2 border-red-500' : 'border-0 focus:ring-2 focus:ring-purple-500'}`} style={{ colorScheme: 'light' }} />{errors.preferredTime && <p className="mt-1 text-sm text-red-500">{errors.preferredTime}</p>}</div>
                                </div>

                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions <span className="text-gray-400 text-xs">(Optional)</span></label><textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} placeholder="Gate code, parking instructions..." rows="3" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none" /></div>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg></div>
                                        <div className="flex-1"><h3 className="font-semibold text-gray-900 flex items-center gap-2">Payment Information</h3><p className="text-sm text-gray-600">Secure payment - Card charged only after service completion</p></div>
                                    </div>
                                    <div className="space-y-4">
                                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name <span className="text-red-500">*</span></label><input type="text" name="cardholderName" value={formData.cardholderName} onChange={handleChange} className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.cardholderName ? 'border-2 border-red-500' : ''}`} />{errors.cardholderName && <p className="mt-1 text-sm text-red-500">{errors.cardholderName}</p>}</div>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Card Number <span className="text-red-500">*</span></label><input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleCardNumberChange} maxLength="19" className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.cardNumber ? 'border-2 border-red-500' : ''}`} />{errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}</div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date <span className="text-red-500">*</span></label><input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY" maxLength="5" className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.expiryDate ? 'border-2 border-red-500' : ''}`} />{errors.expiryDate && <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>}</div>
                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">CVC <span className="text-red-500">*</span></label><input type="number" name="cvc" value={formData.cvc} onChange={handleChange} maxLength="4" className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.cvc ? 'border-2 border-red-500' : ''}`} />{errors.cvc && <p className="mt-1 text-sm text-red-500">{errors.cvc}</p>}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkbox at the bottom before buttons */}
                                <div className="pt-2">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="cardConsent"
                                                checked={formData.cardConsent}
                                                onChange={handleChange}
                                                className="w-5 h-5 rounded border-gray-300 text-[#361b6b] focus:ring-[#361b6b] transition-all cursor-pointer"
                                            />
                                        </div>
                                        <span className="text-sm text-gray-700 leading-tight">
                                            I acknowledge and authorize <b>Belmont Cleaners</b> to charge my provided credit or debit card upon the successful completion of the cleaning services. <span className="text-red-500">*</span>
                                        </span>
                                    </label>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <button onClick={prevStep} className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors">← Back</button>
                                    <button
                                        onClick={nextStep}
                                        disabled={!formData.cardConsent}
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-10 rounded-md px-6 w-full bg-[#361b6b] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:pointer-events-none disabled:grayscale"
                                    >
                                        Continue to Review
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                                    <div className="w-10 h-10 bg-[#361b6b] rounded-lg flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg></div>
                                    <div><h2 className="mb-0">Almost There!</h2><p className="text-sm text-gray-600">Review your details and confirm</p></div>
                                </div>
                                <div className="space-y-3 bg-purple-50 rounded-2xl p-6 border-2 border-purple-100">
                                    <div className='bg-white rounded-lg px-4 py-2'><p className="text-purple-600 font-medium text-xs">Name</p><p className="text-black">{formData.fullName}</p></div>
                                    <div className='bg-white rounded-lg px-4 py-2'><p className="text-purple-600 font-medium text-xs">Phone</p><p className="text-black">{formData.phoneNumber}</p></div>
                                    <div className='bg-white rounded-lg px-4 py-2'><p className="text-purple-600 font-medium text-xs">Address</p><p className="text-black">{formData.street}, {formData.city} {formData.zip}</p></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className='bg-white rounded-lg px-4 py-2'><p className="text-purple-600 font-medium text-xs">Date</p><p className="text-black">{formData.pickupDate}</p></div>
                                        <div className='bg-white rounded-lg px-4 py-2'><p className="text-purple-600 font-medium text-xs">Time</p><p className="text-black">{formData.preferredTime}</p></div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <button onClick={handleSubmit} className="h-10 px-6 w-full bg-[#361b6b] text-white rounded-md shadow-lg hover:scale-105 transition-all">Confirm Pickup</button>
                                    <button onClick={prevStep} className="h-10 px-6 w-full border-2 rounded-md hover:bg-gray-50 transition-all">← Back</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}