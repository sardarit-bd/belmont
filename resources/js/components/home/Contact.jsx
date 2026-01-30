import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        namecaptcha: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //all input validation first not empty
        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.message ||
            !formData.namecaptcha
        ) {
            alert('Please fill out all required fields.');
            return;
        }

        //send form data to backend
    };

    return (
        <div className="min-h-screen py-12 px-4 scroll-mt-16 bg-gradient-to-r from-white to-purple-100/60" id='contact'>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
                        Get In Touch
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-xl text-gray-900 mb-2">
                            Send Us a Message
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Fill out the form and we'll get back to you within 24 hours
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 placeholder-gray-500"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 placeholder-gray-500"
                            />

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 placeholder-gray-500"
                            />

                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 placeholder-gray-500 resize-none"
                            />

                            {/* Captcha */}
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Verify you're human: 8+13 =
                                    <input
                                        value={formData.numcaptcha}
                                        onChange={handleChange}
                                        name="numcaptcha"
                                        type="text"
                                        className='mx-2 w-16 px-2 py-1 bg-gray-50 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 placeholder-gray-500' />
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 text-sm"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Business Information */}
                    <div className="space-y-8">
                        {/* Visit Us */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl text-gray-900 mb-2">Visit Us</h3>
                                <p className="text-gray-600">92 Torrey St</p>
                                <p className="text-gray-600">Brockton, MA 02301</p>
                            </div>
                        </div>

                        {/* Call Us */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl text-gray-900 mb-2">Call Us</h3>
                                <p className="text-gray-600">(508) 580-4610</p>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl text-gray-900 mb-2">Business Hours</h3>
                                <p className="text-gray-600">Monday - Friday: 7:00 AM - 7:00 PM</p>
                                <p className="text-gray-600">Saturday: 7:00 AM - 5:00 PM</p>
                                <p className="text-gray-600">Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
