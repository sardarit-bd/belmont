import React from 'react';

export default function VolumeDiscounts() {
  const tiers = [
    {
      range: "40-99",
      subtext: "Items",
      discount: "10% Off",
      isPremium: false
    },
    {
      range: "100-199",
      subtext: "Items",
      discount: "15% Off",
      isPremium: true
    },
    {
      range: "200-499",
      subtext: "Items",
      discount: "20% Off",
      isPremium: false
    },
    {
      range: "500+",
      subtext: "Items",
      discount: "Custom",
      isPremium: true
    }
  ];

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
      <section className="max-w-5xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl mb-4">
            Volume Discount Tiers
          </h2>
          <p className="text-gray-600 text-[16px]">
            Save more with larger orders - perfect for events and corporate accounts
          </p>
        </div>

        {/* Pricing Card Container */}
        <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200 rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`
                p-6 text-center
                ${index !== tiers.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''}
                ${tier.isPremium ? 'bg-purple-50' : 'bg-white'}
              `}
            >
              <div className="text-3xl mb-2">
                {tier.range}
              </div>
              <div className="text-gray-600 mb-3">
                {tier.subtext}
              </div>
              <div className={`text-2xl ${tier.isPremium ? 'text-purple-600' : 'text-[#A855F7]'}`}>
                {tier.discount}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-600 mt-8">
          Volume discounts apply to single orders or monthly accounts. Contact us for custom enterprise pricing.
        </p>
      </section>
    </div>
  );
}