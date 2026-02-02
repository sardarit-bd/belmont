import React from 'react';

export default function Why() {
  const features = [
    {
      title: "Expert Care",
      description: "Trained professionals treating every garment with expertise and respect."
    },
    {
      title: "Convenient Service",
      description: "Free pickup and delivery for orders over $35—we come to you."
    },
    {
      title: "Trusted Locally",
      description: "Serving Brockton with pride, building trust one garment at a time."
    }
  ];

  return (
    <div className="min-h-[50vh] bg-gradient-to-r from-white to-[#f3e9ff] py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-6xl space-y-10">
        
        {/* Section Header */}
        <h2 className="mb-8 text-center">
          Why Choose Belmont Dry Cleaners?
        </h2>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-gray-100 px-4 py-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-xl font-serif text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}