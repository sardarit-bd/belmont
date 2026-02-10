import React from 'react';

export default function Bredcrumb() {
    return (
        <section className="relative text-white text-center pt-16 pb-20 px-4 overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1604335398980-ededcadcc37d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Luxury Laundry Service" 
                    className="w-full h-full object-cover"
                />
                {/* Overlay matching your original bg-[#d9b6ff] opacity-95 */}
                <div className="absolute inset-0 bg-[#361b6b]/85 mix-blend-normal" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center text-gray-900">
                <div className="inline-flex items-center gap-2 bg-[#fcfaff] backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-crown w-5 h-5 text-[#361b6b]" aria-hidden="true"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg>
                    <span className="font-semibold text-[#361b6b]">
                        Premium Services
                    </span>
                </div>
                
                <h1 className="mb-6 text-5xl md:text-6xl text-gray-50 font-bold tracking-tight">
                    Luxury & Enterprise Solutions
                </h1>
                <p className="text-xl mb-8 text-purple-100/90 max-w-3xl mx-auto leading-relaxed">
                    Specialized dry cleaning services for high-end garments, corporate accounts, and large events. White-glove service with dedicated support for orders of 40+ items.
                </p>
                <button 
                    onClick={() => window.location.href = '/luxury/#consultation'}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-12 rounded-lg px-8 has-[>svg]:px-4 bg-[#fcfaff] text-gray-900 hover:bg-white hover:scale-105 shadow-lg shadow-purple-900/10 cursor-pointer"
                    >
                    Request Consultation
                </button>
            </div>
        </section>
    )
}