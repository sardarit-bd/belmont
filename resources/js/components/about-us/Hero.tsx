import React from 'react';

export default function Hero() {
  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-6xl space-y-10">
        
        {/* Header Text Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-sm md:text-base font-medium text-gray-900 tracking-wide">
            About Belmont Dry Cleaners
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A family tradition rooted in Peruvian heritage, delivering exceptional garment
            care with warmth and dedication to the Brockton community.
          </p>
        </div>

        {/* Video Card Component */}
        <div className="w-full bg-white rounded-2xl border border-gray-200 overflow-hidden">
          
          {/* Video Container (16:9 Aspect Ratio) */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=ad88k8s8w8s8s" 
              title="Rick Astley - Never Gonna Give You Up"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>

          {/* Card Footer Content */}
          <div className="p-8 md:p-10 text-center space-y-3 bg-white">
            <h3 className="text-2xl font-serif text-gray-900">
              Discover Our Story
            </h3>
            <p className="text-gray-600 text-base md:text-lg font-serif mx-auto">
              Watch how our Peruvian heritage shapes the exceptional care we provide to every garment.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}