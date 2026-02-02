import React from 'react';
import { Heart, Users, Award, Globe } from 'lucide-react';

export default function Value() {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-[#361B6B]" />,
      title: "Care & Craftsmanship",
      description: "Every garment receives the meticulous attention inspired by Peruvian textile traditions."
    },
    {
      icon: <Users className="w-8 h-8 text-[#361B6B]" />,
      title: "Community First",
      description: "Building lasting relationships with our neighbors through exceptional service."
    },
    {
      icon: <Award className="w-8 h-8 text-[#361B6B]" />,
      title: "Quality Excellence",
      description: "Combining traditional techniques with modern technology for superior results."
    },
    {
      icon: <Globe className="w-8 h-8 text-[#361B6B]" />,
      title: "Cultural Heritage",
      description: "Honoring our Peruvian roots while serving the diverse Brockton community."
    }
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-6xl space-y-16">
        
        {/* Our Values Section */}
        <div className="space-y-10">
          <h2 className="text-center text-xl font-serif font-medium text-gray-900">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The Peruvian Textile Tradition Section */}
        <div className="w-full bg-[#d9b6ff] rounded-2xl shadow-xl overflow-hidden text-gray-900 p-8 md:p-12 lg:p-16">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="mb-6 text-center">
              The Peruvian Textile Tradition
            </h2>
            
            <div className="space-y-4">
              <p>
                Peru's textile heritage dates back thousands of years, with ancient civilizations creating some of the world's finest fabrics. The Inca and pre-Inca cultures developed sophisticated techniques for weaving, dyeing, and preserving textiles that remain unmatched to this day.
              </p>
              <p>
                This dedication to textile excellence is woven into the fabric of our business. Just as Peruvian artisans take pride in every thread they work with, we take pride in every garment we care for. The same attention to detail, respect for materials, and commitment to quality that defines Peruvian craftsmanship defines Belmont Dry Cleaners.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}