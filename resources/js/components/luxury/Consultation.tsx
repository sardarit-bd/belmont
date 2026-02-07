import React, { useState, useRef, useEffect } from 'react';
import { Phone, ChevronDown, Check, Calendar } from 'lucide-react';

export default function App() {
  // State for Custom Selects
  const [serviceOpen, setServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Wedding Services');
  
  const [countOpen, setCountOpen] = useState(false);
  const [selectedCount, setSelectedCount] = useState('40-99 items');

  const serviceOptions = ['Wedding Services', 'Corporate Uniforms', 'Hotel & Hospitality', 'Theatre & Costume'];
  const countOptions = ['40-99 items', '100-199 items', '200-499 items', '500+ items'];

  // Refs for managing focus and interactions
  const serviceRef = useRef(null);
  const countRef = useRef(null);
  const dateInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (serviceRef.current && !serviceRef.current.contains(event.target)) setServiceOpen(false);
      if (countRef.current && !countRef.current.contains(event.target)) setCountOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to trigger native date picker
  const handleDateContainerClick = () => {
    if (dateInputRef.current) {
      // Modern browsers support showPicker()
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <div className="py-20 px-4 bg-[#fafafa] flex items-center justify-center font-sans" id="consultation">
      <div className="container mx-auto max-w-3xl bg-white rounded-[2.5rem] shadow-2xl shadow-purple-900/5 p-8 md:p-14 border border-[#f3e9ff]">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans mb-4 tracking-tight">
            Request a Consultation
          </h2>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
            Let's discuss your luxury or enterprise dry cleaning needs
          </p>
        </div>

        {/* Form */}
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* Row 1: Split Name Fields (Compact) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-[#361b6b] text-sm font-bold uppercase tracking-wider">First Name</label>
              <input 
                type="text" 
                placeholder="John"
                className="w-full px-5 py-3.5 border border-[#f3e9ff] rounded-2xl bg-[#fcfaff] focus:ring-2 focus:ring-[#b47bff] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[#361b6b] text-sm font-bold uppercase tracking-wider">Last Name</label>
              <input 
                type="text" 
                placeholder="Smith"
                className="w-full px-5 py-3.5 border border-[#f3e9ff] rounded-2xl bg-[#fcfaff] focus:ring-2 focus:ring-[#b47bff] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700"
              />
            </div>
          </div>

          {/* Row 2: Company & Phone (Compact) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-[#361b6b] text-sm font-bold uppercase tracking-wider">Company Name</label>
              <input 
                type="text" 
                placeholder="Your Company"
                className="w-full px-5 py-3.5 border border-[#f3e9ff] rounded-2xl bg-[#fcfaff] focus:ring-2 focus:ring-[#b47bff] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[#361b6b] text-sm font-bold uppercase tracking-wider">Phone Number</label>
              <input 
                type="tel" 
                placeholder="(508) 555-0100"
                className="w-full px-5 py-3.5 border border-[#f3e9ff] rounded-2xl bg-[#fcfaff] focus:ring-2 focus:ring-[#b47bff] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700"
              />
            </div>
          </div>

          {/* Row 3: Email & Date (Now side-by-side for compactness) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-[#361b6b] text-sm font-bold uppercase tracking-wider">Email (Optional)</label>
              <input 
                type="email" 
                placeholder="john@company.com"
                className="w-full px-5 py-3.5 border border-[#f3e9ff] rounded-2xl bg-[#fcfaff] focus:ring-2 focus:ring-[#b47bff] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[#361b6b] text-sm font-bold uppercase tracking-wider">Needed By Date</label>
              <div 
                className="relative group cursor-pointer" 
                onClick={handleDateContainerClick}
              >
                <input 
                  ref={dateInputRef}
                  type="date"
                  className="w-full px-5 py-3.5 border border-[#f3e9ff] rounded-2xl bg-[#fcfaff] focus:ring-2 focus:ring-[#b47bff] focus:bg-white outline-none transition-all text-gray-700 uppercase pr-12 cursor-pointer"
                />
                <Calendar 
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b47bff] pointer-events-none group-hover:text-[#5c2baa] transition-colors" 
                />
              </div>
            </div>
          </div>

          {/* Row 4: Service Type & Item Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service Type Custom Select */}
            <div className="space-y-3" ref={serviceRef}>
              <label className="block text-[#361b6b] text-sm font-bold uppercase tracking-wider">Service Type</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setServiceOpen(!serviceOpen)}
                  className={`flex items-center justify-between w-full px-5 py-3.5 border rounded-2xl transition-all duration-300 ${
                    serviceOpen ? 'border-[#b47bff] ring-4 ring-purple-100 bg-white' : 'border-[#f3e9ff] bg-[#fcfaff]'
                  }`}
                >
                  <span className={selectedService ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                    {selectedService}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#b47bff] transition-transform duration-300 ${serviceOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {serviceOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-[#f3e9ff] rounded-2xl shadow-2xl shadow-purple-900/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                      {serviceOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setSelectedService(opt); setServiceOpen(false); }}
                          className="flex items-center justify-between w-full px-5 py-3 text-left text-sm hover:bg-[#f3e9ff] transition-colors group"
                        >
                          <span className={`${selectedService === opt ? 'text-[#5c2baa] font-bold' : 'text-gray-600'}`}>
                            {opt}
                          </span>
                          {selectedService === opt && <Check className="w-4 h-4 text-[#5c2baa]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Estimated Count Custom Select */}
            <div className="space-y-3" ref={countRef}>
              <label className="block text-[#361b6b] text-sm font-bold uppercase tracking-wider">Estimated Item Count</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCountOpen(!countOpen)}
                  className={`flex items-center justify-between w-full px-5 py-3.5 border rounded-2xl transition-all duration-300 ${
                    countOpen ? 'border-[#b47bff] ring-4 ring-purple-100 bg-white' : 'border-[#f3e9ff] bg-[#fcfaff]'
                  }`}
                >
                  <span className={selectedCount ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                    {selectedCount}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#b47bff] transition-transform duration-300 ${countOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {countOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-[#f3e9ff] rounded-2xl shadow-2xl shadow-purple-900/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                      {countOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setSelectedCount(opt); setCountOpen(false); }}
                          className="flex items-center justify-between w-full px-5 py-3 text-left text-sm hover:bg-[#f3e9ff] transition-colors group"
                        >
                          <span className={`${selectedCount === opt ? 'text-[#5c2baa] font-bold' : 'text-gray-600'}`}>
                            {opt}
                          </span>
                          {selectedCount === opt && <Check className="w-4 h-4 text-[#5c2baa]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 5: Text Area (Full Width) */}
          <div className="space-y-3">
            <label className="block text-[#361b6b] text-sm font-bold uppercase tracking-wider">Additional Details</label>
            <textarea 
              rows={4}
              placeholder="Tell us about your specific needs, timeline, or any special requirements..."
              className="w-full px-5 py-4 border border-[#f3e9ff] rounded-2xl bg-[#fcfaff] focus:ring-2 focus:ring-[#b47bff] focus:bg-white outline-none transition-all resize-none text-gray-700 leading-relaxed"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-[#361b6b] hover:bg-[#5c2baa] text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-purple-900/20 active:scale-95 text-base cursor-pointer">
            Submit Consultation Request
          </button>
        </form>

        {/* Footer Contact */}
        <div className="mt-12 pt-10 border-t border-[#f3e9ff]">
          <p className="text-center text-gray-800 mb-6 text-base italic">Prefer to speak with us directly?</p>
          <div className="flex items-center justify-center">
            <a 
              href="tel:5085804610"
              className="flex items-center gap-3 px-8 py-4 bg-[#fcfaff] text-[#5c2baa] border border-[#f3e9ff] rounded-full font-bold text-lg hover:shadow-lg transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>(508) 580-4610</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}