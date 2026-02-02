import React from 'react';

export default function Story() {
  return (
    <div className="bg-white max-w-6xl mx-auto py-5 flex justify-center">
        {/* Our Story Text Card Component */}
        <div className="w-full bg-white rounded-2xl border border-gray-200 p-12">
          <div className="mx-auto space-y-8">
            <h2 className="font-serif text-gray-900 text-center font-medium">
              Our Story
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Belmont Dry Cleaners was founded with a vision inspired by the rich textile heritage of Peru, where craftsmanship and attention to detail have been passed down through generations. Our founders brought this tradition of excellence to Brockton, Massachusetts, combining time-honored techniques with modern technology.
              </p>
              <p>
                In Peru, textile arts are more than a craft—they're a way of life. From the vibrant colors of traditional weaving to the meticulous care given to every garment, this cultural heritage shapes everything we do. We treat each piece of clothing that comes through our doors with the same reverence and skill that Peruvian artisans have shown for centuries.
              </p>
              <p>
                Today, we continue to serve the Brockton community with pride, bringing together the warmth of Peruvian hospitality and the precision of professional garment care. Our commitment extends beyond cleaning clothes—we're preserving memories, maintaining professional wardrobes, and helping our neighbors look and feel their best.
              </p>
            </div>
          </div>
        </div>

      </div>
  );
}