import React, { useState } from 'react';
import AppHeaderLayout from "@/layouts/app/app-header-layout";

export default function PickupScheduler() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1 - Contact
        fullName: '',
        phoneNumber: '',
        pickupAddress: '',
        // Step 2 - Schedule
        pickupDate: '',
        preferredTime: '',
        specialInstructions: '',
        // Payment
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('Pickup confirmed!');
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
                            {/* Step 1 - Contact */}
                            <div className="flex flex-col items-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#361b6b]' : 'bg-gray-300'
                                    } transition-colors`}>
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className={`mt-2 text-sm font-medium ${currentStep >= 1 ? 'text-purple-600' : 'text-gray-400'
                                    }`}>
                                    Contact
                                </span>
                            </div>

                            {/* Connector Line 1 */}
                            <div className={`w-24 h-1 mx-2 ${currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-300'
                                } transition-colors`}></div>

                            {/* Step 2 - Schedule */}
                            <div className="flex flex-col items-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#361b6b]' : 'bg-gray-300'
                                    } transition-colors`}>
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className={`mt-2 text-sm font-medium ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'
                                    }`}>
                                    Schedule
                                </span>
                            </div>

                            {/* Connector Line 2 */}
                            <div className={`w-24 h-1 mx-2 ${currentStep >= 3 ? 'bg-purple-600' : 'bg-gray-300'
                                } transition-colors`}></div>

                            {/* Step 3 - Confirm */}
                            <div className="flex flex-col items-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-[#361b6b]' : 'bg-gray-300'
                                    } transition-colors`}>
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className={`mt-2 text-sm font-medium ${currentStep >= 3 ? 'text-purple-600' : 'text-gray-400'
                                    }`}>
                                    Confirm
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {/* Step 1 - Contact Information */}
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="(555) 123-4567"
                                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pickup Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="pickupAddress"
                                            value={formData.pickupAddress}
                                            onChange={handleChange}
                                            placeholder="123 Main St, Brockton, MA 02301"
                                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={nextStep}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground h-10 rounded-md px-6 has-[>svg]:px-4 w-full bg-[#361b6b] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group mt-5"
                                >
                                    Continue to Schedule
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* Step 2 - Schedule */}
                        {currentStep === 2 && (
                        <div>
                            <div className="bg-purple-50 rounded-lg p-4 mb-6 flex items-start gap-3">
                                <div className="w-10 h-10 bg-[#361b6b] rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-6 h-6 text-white" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                                </div>
                                <div>
                                    <h2 className="mb-0">Pick Your Perfect Time</h2>
                                    <p className="text-sm text-gray-600">When should we swing by?</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                {/* CHANGED: grid-cols-1 for mobile (stacked), md:grid-cols-2 for desktop (side-by-side) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pickup Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="pickupDate"
                                            value={formData.pickupDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 text-black bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Preferred Time <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            name="preferredTime"
                                            value={formData.preferredTime}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Special Instructions <span className="text-gray-400 text-xs">(Optional)</span>
                                    </label>
                                    <textarea
                                        name="specialInstructions"
                                        value={formData.specialInstructions}
                                        onChange={handleChange}
                                        placeholder="Gate code, parking instructions, or anything else we should know..."
                                        rows="3"
                                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                                    />
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                            Payment Information
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </h3>
                                        <p className="text-sm text-gray-600">Secure payment - Card charged only after service completion</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <p className="text-sm text-blue-900">
                                        <strong>Protected Payment:</strong> Your card information is securely stored and will <strong>only be charged after your items are cleaned and delivered</strong>. No upfront charges!
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cardholder Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="cardholderName"
                                            value={formData.cardholderName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Card Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Expiry Date <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleChange}
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                CVC <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="cvc"
                                                value={formData.cvc}
                                                onChange={handleChange}
                                                placeholder="123"
                                                maxLength="3"
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={prevStep}
                                    className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors"
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground h-10 rounded-md px-6 has-[>svg]:px-4 w-full bg-[#361b6b] hover:from-pink-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                                >
                                    Continue to Review
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                        {/* Step 3 - Confirm */}
                        {currentStep === 3 && (
                            <div>
                                <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                                    <div className="w-10 h-10 bg-[#361b6b] rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check-big w-6 h-6 text-white" aria-hidden="true"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                                    </div>
                                    <div>
                                        <h2 className="mb-0">Almost There!</h2>
                                        <p className="text-sm text-gray-600">Review your details and confirm</p>
                                    </div>
                                </div>

                                <div className="space-y-4 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-purple-100 mb-6">
                                    <div className='bg-white rounded-lg px-4 py-2'>
                                        <p className="text-purple-600 font-medium">Name</p>
                                        <p className="text-black">{formData.fullName || 'Not provided'}</p>
                                    </div>

                                    <div className='bg-white rounded-lg px-4 py-2'>
                                        <p className="text-purple-600 font-medium">Phone</p>
                                        <p className="text-black">{formData.phoneNumber || 'Not provided'}</p>
                                    </div>

                                    <div className='bg-white rounded-lg px-4 py-2'>
                                        <p className="text-purple-600 font-medium">Pickup Address</p>
                                        <p className="text-black">{formData.pickupAddress || 'Not provided'}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className='bg-white rounded-lg px-4 py-2'>
                                            <p className="text-purple-600 font-medium">Date</p>
                                            <p className="text-black">{formData.pickupDate || 'Not selected'}</p>
                                        </div>
                                        <div className='bg-white rounded-lg px-4 py-2'>
                                            <p className="text-purple-600 font-medium">Time</p>
                                            <p className="text-black">{formData.preferredTime || 'Not selected'}</p>
                                        </div>
                                    </div>

                                    {formData.specialInstructions && (
                                        <div>
                                            <p className="text-sm text-purple-600 font-medium">Special Instructions</p>
                                            <p className="text-gray-900">{formData.specialInstructions}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                                    <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <p className="text-sm text-yellow-900">
                                        <strong>What's Next?</strong> We'll contact you to confirm your pickup. Your card will only be charged after your items are cleaned and delivered!
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    
                                    <button
                                        onClick={handleSubmit}
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground h-10 rounded-md px-6 has-[>svg]:px-4 w-full bg-[#361b6b] hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                                    >
                                        Confirm Pickup
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={prevStep}
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background text-foreground hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[>svg]:px-4 w-full border-2 hover:bg-gray-50 transition-all duration-300"
                                    >
                                        ← Back
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Back to Home Link */}
                    <div className="text-center mt-8">
                        <a href="/" className="text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center gap-2">
                            ← Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
