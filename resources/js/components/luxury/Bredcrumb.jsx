export default function Bredcrumb() {
    return (
        <section className="bg-[#d9b6ff] opacity-95 text-white text-center pt-15 pb-20 px-4">
            <div className="max-w-4xl mx-auto text-center text-gray-900">
                <div className="inline-flex items-center gap-2 bg-[#fcfaff] backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-crown w-5 h-5" aria-hidden="true"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg>
                    <span >
                        Premium Services
                    </span>
                </div>
                
                <h1 className="mb-6 text-5xl md:text-6xl text-gray-900">
                    Luxury & Enterprise Solutions
                </h1>
                <p className="text-xl mb-8 text-gray-900 max-w-3xl mx-auto">
                    Specialized dry cleaning services for high-end garments, corporate accounts, and large events. White-glove service with dedicated support for orders of 40+ items.
                </p>
                <button 
                    onClick={() => window.location.href = '/luxury/#consultation'}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 rounded-md px-6 has-[>svg]:px-4 bg-[#fcfaff] text-gray-900 hover:bg-purple-50"
                    >
                    Request Consultation
                </button>
            </div>
        </section>
    )
}
