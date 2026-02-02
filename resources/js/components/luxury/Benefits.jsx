import React from 'react';
import { Award, Users, Package, CheckCircle } from 'lucide-react';

export default function App() {
  const benefits = [
    {
      title: "Volume Discounts",
      description: "Significant savings on orders of 40+ items",
      icon: <Award className="w-10 h-10 text-white" strokeWidth={1.5} />,
    },
    {
      title: "Dedicated Support",
      description: "Personal account manager for your business",
      icon: <Users className="w-10 h-10 text-white" strokeWidth={1.5} />,
    },
    {
      title: "White Glove Service",
      description: "Premium pickup, delivery, and handling",
      icon: <Package className="w-10 h-10 text-white" strokeWidth={1.5} />,
    },
    {
      title: "Quality Guarantee",
      description: "100% satisfaction on every order",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check w-10 h-10 text-white" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
      ),
    }
  ];

  return (
    <div className="bg-white flex items-center justify-center p-8 font-sans">
      <section className="max-w-7xl mx-auto w-full py-20 px-4">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl text-[#1a1a1a] mb-6">
            Enterprise Benefits
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Why businesses choose Belmont Dry Cleaners for their corporate needs
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* Icon Container - Squircle Shape */}
              <div className="w-20 h-20 bg-gradient-to-br from-[#5c2baa] to-[#361b6b] rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              
              {/* Title */}
              <h3 className="mb-2">
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}