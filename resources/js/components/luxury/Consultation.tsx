import React from 'react';
import { Phone } from 'lucide-react';

export default function App() {
  return (
    <div className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white flex items-center justify-center" id="consultation">
      <div className="container mx-auto max-w-3xl bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-purple-100">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl mb-4">
            Request a Consultation
          </h2>
          <p className="text-gray-600">
            Let's discuss your luxury or enterprise dry cleaning needs
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          
          {/* Row 1: Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="John Smith"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-gray-700 mb-2">Company Name</label>
              <input 
                type="text" 
                placeholder="Your Company"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Row 2: Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                placeholder="(508) 555-0100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-gray-700 mb-2">Email (Optional)</label>
              <input 
                type="email" 
                placeholder="john@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-1.5">
            <label className="block text-gray-700 mb-2">Service Type</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition">
                <option>Wedding Services</option>
                <option>Corporate Uniforms</option>
                <option>Hotel & Hospitality</option>
                <option>Theatre & Costume</option>
              </select>
            </div>
          </div>

          {/* Item Count */}
          <div className="space-y-1.5">
            <label className="block text-gray-700 mb-2">Estimated Item Count</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition">
                <option>40-99 items</option>
                <option>100-199 items</option>
                <option>200-499 items</option>
                <option>500+ items</option>
              </select>
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-1.5">
            <label className="block text-gray-700 mb-2">Event Date / Service Needed By (if applicable)</label>
            <div className="relative">
              <input 
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition uppercase"
                placeholder="mm/dd/yyyy"
              />
            </div>
          </div>

          {/* Text Area */}
          <div className="space-y-1.5">
            <label className="block text-gray-700 mb-2">Additional Details</label>
            <textarea 
              rows={4}
              placeholder="Tell us about your specific needs, timeline, or any special requirements..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-[#361b6b] hover:bg-[#5c2baa] text-white font-medium py-3.5 rounded-lg transition-colors shadow-sm text-sm tracking-wide mt-2 cursor-pointer">
            Submit Consultation Request
          </button>
        </form>

        {/* Footer Contact */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 mb-4">Prefer to speak with us directly?</p>
          <div className="flex items-center justify-center gap-2 text-[#9333EA] font-medium text-sm">
            <Phone className="w-4 h-4" />
            <span>(508) 580-4610</span>
          </div>
        </div>

      </div>
    </div>
  );
}