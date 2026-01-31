import { Link } from '@inertiajs/react';
import { LuSparkles } from "react-icons/lu";

export default function HeroSection() {
    return (
        <section className="w-full py-10 lg:pb-24 pt-5 bg-gradient-to-l from-pink-50 via-white to-gray-50/10" animation="fade-up">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                </div>
                
                {/* Modified Grid Layout: Flex-col-reverse puts image on top for mobile */}
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    
                    {/* Left Content */}
                    <div className="space-y-6 lg:space-y-8 w-full">
                        {/* Trust Badge */}
                        <div className="inline-flex items-center gap-2 text-purple-600 rounded-full px-4 py-1.5 bg-[#F8E7F9] hover:scale-105 transition-all">
                            <LuSparkles />
                            <span className="text-sm md:text-md font-medium">Trusted by 1000+ Happy Customers</span>
                        </div>

                        {/* Main Heading: Small on mobile, large on desktop */}
                        <h1 className="text-sm md:text-6xl lg:text-6xl font-bold text-purple-600 leading-tight">
                            Professional Dry Cleaning & Laundry Services
                        </h1>

                        {/* Subheading: Medium size */}
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-lg">
                            Premium care for your garments with convenient pickup and delivery in Brockton, MA
                        </p>

                        {/* CTA Buttons: Full width on mobile, auto on desktop */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <Link
                                href="/schedule-pickup"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-12 rounded-md px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Schedule Pickup
                            </Link>
                            <Link
                                href="/luxury"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-12 rounded-md px-8 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 bg-white/50"
                            >
                                Luxury & Enterprise
                            </Link>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 md:gap-8 pt-4">
                            {/* 24hr Service */}
                            <div className="text-center">
                                <div className="bg-purple-100 w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-sm font-semibold md:text-base">24hr Service</h3>
                                <p className="text-xs text-gray-500">Fast turnaround</p>
                            </div>

                            {/* Certified */}
                            <div className="text-center">
                                <div className="bg-pink-100 w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8 text-pink-600"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
                                </div>
                                <h3 className="text-sm font-semibold md:text-base">Certified</h3>
                                <p className="text-xs text-gray-500">Expert care</p>
                            </div>

                            {/* Guaranteed */}
                            <div className="text-center">
                                <div className="bg-blue-100 w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8 text-indigo-600"><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path><path d="M7 10v12"></path></svg>
                                </div>
                                <h3 className="text-sm font-semibold md:text-base">Guaranteed</h3>
                                <p className="text-xs text-gray-500">100% satisfaction</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative w-full">
                        <div className="rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dg83pvgls/image/upload/v1769666689/hero_side_gmmcpm.png"
                                alt="Belmont Dry Cleaners Store"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Rating Badge - Adjusted position for mobile to not get cut off */}
                        <div className="absolute -bottom-4 right-0 lg:-bottom-6 lg:-right-6 bg-white rounded-2xl shadow-xl p-3 md:p-5 flex items-center gap-3 md:gap-4 border border-gray-100 max-w-[200px] md:max-w-none hover:scale-105 transition-all">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 text-white"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>
                            </div>
                            <div>
                                <div className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">4.9★</div>
                                <div className="text-xs md:text-sm text-gray-600 leading-tight">Customer Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}