import { Link } from '@inertiajs/react';
import { LuSparkles  } from "react-icons/lu";
export default function HeroSection() {
    return (
        <section className="w-full py-10 lg:pb-24 pt-5 bg-gradient-to-l from-pink-50 via-white to-gray-50/10" animation="fade-up">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="absolute inset-0 overflow-hidden pointer-events-none">
                    <div class="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                    <div class="absolute top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                </div>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Trust Badge */}
                        <div className="px-4 py-2 flex items-center inline-flex gap-2 text-purple-600 rounded-full px-2 py-0.5 h bg-[#F8E7F9] hover:scale-105 transition-all">
                            <LuSparkles />
                            <span className="text-md font-medium">Trusted by 1000+ Happy Customers</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-2xl lg:text-[17px] text-purple-600 leading-tight">
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
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Schedule Pickup
                            </Link>
                            <Link
                                href="/luxury"
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background dark:bg-input/30 h-10 rounded-md px-6 border-2 border-purple-600 dark:border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all duration-300"
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
                                <h3 className="text-sm md:text-base">24hr Service</h3>
                                <p className="text-xs md:text-sm text-gray-600">Fast turnaround</p>
                            </div>

                            {/* Certified */}
                            <div className="text-center">
                                <div className="bg-pink-100 w-15 h-15 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award w-6 h-6 md:w-7 md:h-7 text-pink-600" aria-hidden="true"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
                                </div>
                                <h3 className="text-sm md:text-base">Certified</h3>
                                <p className="text-xs md:text-sm text-gray-600">Expert care</p>
                            </div>

                            {/* Guaranteed */}
                            <div className="text-center">
                                <div className="bg-blue-100 w-15 h-15 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up w-6 h-6 md:w-7 md:h-7 text-indigo-600" aria-hidden="true"><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path><path d="M7 10v12"></path></svg>
                                </div>
                                <h3 className="text-sm md:text-base">Guaranteed</h3>
                                <p className="text-xs md:text-sm text-gray-600">100% satisfaction</p>
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
                            <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg></div>
                            <div>
                                <div className="text-xl md:text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">4.9★</div>
                                <div className="text-xs md:text-sm text-gray-600">Customer Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
