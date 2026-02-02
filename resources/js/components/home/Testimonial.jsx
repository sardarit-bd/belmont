import { FaStar } from 'react-icons/fa';

export default function Testimonial() {
    const testimonials = [
        {
            rating: 5,
            text: "Excellent service! My suits have never looked better. The pickup and delivery is so convenient.",
            name: "Michael Chen",
            title: "Business Executive"
        },
        {
            rating: 5,
            text: "I've been using Belmont Dry Cleaners for years. They always deliver quality work on time.",
            name: "Sarah Johnson",
            title: "Restaurant Owner"
        },
        {
            rating: 5,
            text: "The stain removal service is amazing. They got out a wine stain I thought was permanent!",
            name: "David Martinez",
            title: "Marketing Director"
        }
    ];

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-r from-white via-[#FBF8FF] to-[#F7EEFF]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl text-gray-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Join thousands of satisfied customers who trust Belmont Dry Cleaners for their garment care needs.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="upperAnimation bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:trasnlate-y-4"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} className="w-5 h-5 text-[#361b6b]" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="border-gray-200 pt-4">
                                <p className="text-gray-900">{testimonial.name}</p>
                                <p className="text-[16px] text-gray-600">{testimonial.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
