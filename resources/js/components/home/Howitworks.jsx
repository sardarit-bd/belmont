import { FaCalendarAlt, FaBox, FaTruck, FaCheckCircle, FaStar, FaMobileAlt } from 'react-icons/fa';

export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            icon: <FaCalendarAlt className="w-8 h-8" />,
            title: "Schedule Pickup",
            description: "Book your pickup online or call us. We offer paid pickup and delivery service."
        },
        {
            number: 2,
            icon: <FaBox className="w-8 h-8" />,
            title: "We Clean",
            description: "Our experts clean your items with care using professional-grade equipment"
        },
        {
            number: 3,
            icon: <FaTruck className="w-8 h-8" />,
            title: "Delivery",
            description: "Get your items delivered fresh and clean to your doorstep"
        }
    ];

    const benefits = [
        {
            icon: <FaCheckCircle className="w-6 h-6" />,
            title: "Eco-Friendly Products",
            description: "We use environmentally safe cleaning solutions that are gentle on your clothes and the planet."
        },
        {
            icon: <FaStar className="w-6 h-6" />,
            title: "Expert Care",
            description: "Our trained professionals handle each garment with individual attention and care."
        },
        {
            icon: <FaMobileAlt className="w-6 h-6" />,
            title: "Convenient Tracking",
            description: "Track your order in real-time from pickup to delivery through our mobile app."
        }
    ];

    return (
        <section id="Howitworks" className="py-20 scroll-mt-14">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Getting your clothes cleaned has never been easier. Our simple 4-step process ensures quality service from pickup to delivery.
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
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Why Choose Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Image */}
                    <div className="order-2 lg:order-1">
                        <img
                            src="https://res.cloudinary.com/dg83pvgls/image/upload/v1769670802/how_g3fmyy.jpg"
                            alt="Dry cleaning facility"
                            className="rounded-2xl shadow-xl w-full"
                        />
                    </div>

                    {/* Right Content */}
                    <div className="order-1 lg:order-2 space-y-8">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                            Why Choose Belmont Dry Cleaners?
                        </h2>

                        {/* Benefits List */}
                        <div className="space-y-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex gap-4">
                                    {/* Icon */}
                                    <div className="flex-shrink-0">
                                        <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center">
                                            {benefit.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            {benefit.title}
                                        </h3>
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
