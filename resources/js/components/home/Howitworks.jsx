import { FaCalendarAlt, FaBox, FaTruck, FaCheckCircle, FaStar, FaMobileAlt } from 'react-icons/fa';
import { motion } from "framer-motion";

export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-10 h-10 text-purple-600" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
            ),
            title: "Schedule Pickup",
            description: "Book your pickup online or call us. We offer paid pickup and delivery service."
        },
        {
            number: 2,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package w-10 h-10 text-purple-600" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
            ),
            title: "We Clean",
            description: "Our experts clean your items with care using professional-grade equipment"
        },
        {
            number: 3,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-10 h-10 text-purple-600" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>
            ),
            title: "Delivery",
            description: "Get your items delivered fresh and clean to your doorstep"
        }
    ];

    const benefits = [
        {
            icon: "✓",
            title: "Eco-Friendly Products",
            description: "We use environmentally safe cleaning solutions that are gentle on your clothes and the planet."
        },
        {
            icon: "✓",
            title: "Expert Care",
            description: "Our trained professionals handle each garment with individual attention and care."
        },
        {
            icon: "✓",
            title: "Convenient Tracking",
            description: "Track your order in real-time from pickup to delivery through our mobile app."
        }
    ];

    return (
        <section id="Howitworks" className="py-20 scroll-mt-14 bg-gradient-to-r from-white to-purple-50/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Getting your clothes cleaned has never been easier. Our simple 3-step process ensures quality service from pickup to delivery.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-2 mb-20">
                    {steps.map((step) => (
                        <div key={step.number} className="text-center upperAnimation">
                            {/* Icon with Number Badge */}
                            <div className="relative inline-block mb-6">
                                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center text-purple-600">
                                    {step.icon}
                                </div>
                                <div className="absolute -top-2 -right-2 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                    {step.number}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="mb-2">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Why Choose Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Image */}
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src="https://res.cloudinary.com/dg83pvgls/image/upload/v1769670802/how_g3fmyy.jpg"
                            alt="Dry cleaning facility"
                            className="rounded-2xl shadow-xl w-full"
                        />
                    </div>

                    {/* Right Content */}
                    <div className="order-1 lg:order-2 space-y-4">
                        <h3 className="text-3xl lg:text-2xl text-gray-900">
                            Why Choose Belmont Dry Cleaners?
                        </h3>

                        {/* Benefits List */}
                        <div className="space-y-3">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex gap-1">
                                    {/* Icon */}
                                    <div className="flex-shrink-0">
                                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-white">
                                            {benefit.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="pl-2">
                                        <span className="text-md text-gray-900">
                                            {benefit.title}
                                        </span>
                                        <p className="text-gray-600 leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
