import { Link } from '@inertiajs/react';
import { LuSparkles  } from "react-icons/lu";
export default function HeroSection() {
    return (
        <section className="w-full py-16 lg:pb-24 pt-30" animation="fade-up">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Trust Badge */}
                        <div className="py-2 flex items-center inline-flex gap-2 text-purple-600 border border-purple-600 rounded-full px-2 py-0.5 h bg-gradient-to-br from-pink-50 to-pink-70 hover:scale-105 transition-all">
                            <LuSparkles />
                            <span className="text-sm font-medium">Trusted by 1000+ Happy Customers</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-2xl lg:text-3xl font-bold text-purple-600 leading-tight">
                            Professional Dry Cleaning & Laundry Services
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Premium care for your garments with convenient pickup and delivery in Brockton, MA
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/schedule-pickup"
                                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                            >
                                Schedule Pickup
                            </Link>
                            <Link
                                href="/luxury"
                                className="inline-block bg-white hover:bg-gray-50 text-purple-600 px-8 py-3.5 rounded-lg font-semibold border-2 border-purple-600 transition-all"
                            >
                                Luxury & Enterprise
                            </Link>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-8 pt-4 ">
                            {/* 24hr Service */}
                            <div className="text-center">
                                <div className="bg-purple-100 w-15 h-15 rounded-sm flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1 text-sm">24hr Service</h3>
                                <p className="text-xs text-gray-600">Fast turnaround</p>
                            </div>

                            {/* Certified */}
                            <div className="text-center">
                                <div className="bg-pink-100 w-15 h-15 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1 text-sm">Certified</h3>
                                <p className="text-xs text-gray-600">Expert care</p>
                            </div>

                            {/* Guaranteed */}
                            <div className="text-center">
                                <div className="bg-blue-100 w-15 h-15 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1 text-sm">Guaranteed</h3>
                                <p className="text-xs text-gray-600">100% satisfaction</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dg83pvgls/image/upload/v1769666689/hero_side_gmmcpm.png"
                                alt="Belmont Dry Cleaners Store"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-5 flex items-center gap-4 border border-gray-100">
                            <div className="bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900 leading-none mb-1">4.9★</div>
                                <div className="text-sm text-gray-600 font-medium">Customer Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
