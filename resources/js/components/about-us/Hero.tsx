import React from 'react';

export default function Hero() {
  return (
    <section className="relative text-white text-center pt-16 pb-20 px-4 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1635274605638-d44babc08a4f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Belmont Dry Cleaners" 
          className="w-full h-full object-cover"
        />
        {/* Purple overlay */}
        <div className="absolute inset-0 bg-[#361b6b]/85 mix-blend-normal" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-gray-900">
        <h1 className="mb-6 text-5xl md:text-6xl text-gray-50 font-bold tracking-tight">
          About Belmont Dry Cleaners
        </h1>
        
        <p className="text-xl mb-8 text-purple-100/90 max-w-3xl mx-auto leading-relaxed">
          A family tradition rooted in Peruvian heritage, delivering exceptional garment
          care with warmth and dedication to the Brockton community.
        </p>
      </div>
    </section>
  );
}