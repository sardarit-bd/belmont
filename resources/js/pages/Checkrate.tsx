import React, { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, Trash2, X, Info, Briefcase, Shirt, Waves, Grid } from "lucide-react";
import { Link } from "@inertiajs/react";
import AppHeaderLayout from "@/layouts/app/app-header-layout";

export default function CheckRates() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('laundryServiceCart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart from local storage:", error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('laundryServiceCart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    // Images for Category Headers
    const categoryImages = {
        // Dry Cleaning
        tops: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80", 
        bottoms: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80", 
        full_body: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80", 
        household: "https://images.unsplash.com/photo-1760939151301-4f62a7998f0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        accessories: "https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&w=800&q=80",
        repair: "https://images.unsplash.com/photo-1594848328162-90258f635e2e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        
        // Wash & Fold
        laundry_by_lb: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bulky_items: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",

        // Hang Dry
        activewear: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80",
        delicates: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80"
    };

    const categoryLabels = {
        // Dry Cleaning
        tops: "Tops",
        bottoms: "Bottoms",
        full_body: "Full body",
        household: "Household",
        accessories: "Accessories",
        
        // Wash & Fold
        laundry_by_lb: "Laundry (By Lb)",
        bulky_items: "Bulky Items",

        // Hang Dry
        activewear: "Activewear",
        delicates: "Delicates"
    };

    // Data structured by Service Type
    const pricingData = {
        dry_cleaning: {
            tops: [
                { id: 1, name: "All Shirts", price: 5.95 },
                { id: 2, name: "Polo", price: 5.95 },
                { id: 3, name: "Blouse", price: 11.95 },
                { id: 4, name: "Sweater", price: 15.95 },
                { id: 5, name: "Jacket/Blazer", price: 16.95 },
                { id: 6, name: "Vest", price: 15.95 },
            ],
            bottoms: [
                { id: 7, name: "Pants", price: 15.95 },
                { id: 8, name: "Skirt", price: 11.95 },
                { id: 9, name: "Shorts", price: 11.95 },
            ],
            full_body: [
                { id: 10, name: "Casual Dress", price: 22.95 },
                { id: 11, name: "Formal Dress", price: 34.95 },
                { id: 12, name: "Coat", price: 34.95 },
                { id: 13, name: "Suit (Jacket & Pants)", price: 32.90 },
            ],
            household: [
                 { id: 14, name: "Bath Mat", price: 6.95 },
                 { id: 15, name: "Sheets", price: 19.95 },
                 { id: 16, name: "Comforter", price: 35.00 },
            ],
            accessories: [
                 { id: 17, name: "Napkin", price: 6.95 },
                 { id: 18, name: "Pillowcase", price: 6.95 },
                 { id: 19, name: "Tie/Scarf", price: 8.95 },
            ]
        },
        wash_fold: {
            laundry_by_lb: [
                { id: 101, name: "Wash & Fold (Min 15lbs)", price: 2.25 },
                { id: 102, name: "Towels (per lb)", price: 2.25 },
            ],
            bulky_items: [
                { id: 103, name: "Comforter (Twin)", price: 25.00 },
                { id: 104, name: "Comforter (King)", price: 35.00 },
                { id: 105, name: "Pillows", price: 10.00 },
                { id: 106, name: "Sleeping Bag", price: 20.00 }
            ]
        },
        hang_dry: {
            activewear: [
                { id: 201, name: "Yoga Pants", price: 10.00 },
                { id: 202, name: "Gym Shorts", price: 8.00 },
                { id: 203, name: "Sports Bra", price: 8.00 },
                { id: 204, name: "Technical Shirt", price: 9.00 }
            ],
            delicates: [
                { id: 205, name: "Silk Blouse", price: 15.00 },
                { id: 206, name: "Linen Shirt", price: 15.00 },
                { id: 207, name: "Lingerie", price: 8.00 }
            ]
        }
    };

    // Logic to determine displayed services
    const currentServices = activeTab === 'all' 
        ? { ...pricingData.dry_cleaning, ...pricingData.wash_fold, ...pricingData.hang_dry }
        : pricingData[activeTab];

    const addToCart = (item) => {
        const existing = cart.find((c) => c.id === item.id);
        if (existing) {
            setCart(cart.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
        // Removed setIsCartOpen(true) to prevent drawer from opening automatically
    };

    const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

    const updateQuantity = (id, delta) => {
        setCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0));
    };

    const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);
    const getTotalPrice = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <AppHeaderLayout>
            <div className="relative min-h-screen bg-white">
                
                {/* PAGE HEADER SECTION */}
                <div className="relative py-24 px-6 text-center overflow-hidden">
                    {/* Background Image & Overlay */}
                    <div className="absolute inset-0 w-full h-full">
                        <img 
                            src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1920&q=80" 
                            alt="Laundry Background" 
                            className="w-full h-full object-cover"
                        />
                        {/* Dark Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-[#361b6b]/85 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#361b6b] to-transparent opacity-30" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-sm">
                            Check Rates
                        </h1>
                        <p className="text-purple-100/90 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
                            Browse our services, add items to your cart, and get an estimated quote.
                            <span className="block mt-2 opacity-75 text-base font-normal">
                                All prices are estimates and may vary based on fabric & condition.
                            </span>
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
                    {/* TOP NAVIGATION PILLS */}
                    <div className="flex justify-start md:justify-center mb-16 overflow-x-auto -mx-4 px-4 md:mx-0 py-4 no-scrollbar">
                        <div className="bg-[#EBE6E6] rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-gray-100 p-1.5 flex items-center gap-1 shrink-0">
                            <button 
                                onClick={() => setActiveTab('all')}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'all' ? 'bg-[#5c2baa] text-white shadow-md' : 'text-gray-600 hover:text-[#5c2baa] hover:bg-purple-50'}`}
                            >
                                <Grid className="w-4 h-4" />
                                ALL
                            </button>
                            <button 
                                onClick={() => setActiveTab('wash_fold')}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'wash_fold' ? 'bg-[#5c2baa] text-white shadow-md' : 'text-gray-600 hover:text-[#5c2baa] hover:bg-purple-50'}`}
                            >
                                <Briefcase className="w-4 h-4" />
                                WASH & FOLD
                            </button>
                            <button 
                                onClick={() => setActiveTab('dry_cleaning')}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'dry_cleaning' ? 'bg-[#5c2baa] text-white shadow-md' : 'text-gray-600 hover:text-[#5c2baa] hover:bg-purple-50'}`}
                            >
                                <Shirt className="w-4 h-4" />
                                DRY CLEANING
                            </button>
                            <button 
                                onClick={() => setActiveTab('hang_dry')}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'hang_dry' ? 'bg-[#5c2baa] text-white shadow-md' : 'text-gray-600 hover:text-[#5c2baa] hover:bg-purple-50'}`}
                            >
                                <Waves className="w-4 h-4" />
                                HANG DRY
                            </button>
                        </div>
                    </div>


                    {/* FLOATING CART SUMMARY */}
                    <div className="sticky top-24 z-20 mb-6 flex justify-end pointer-events-none">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="pointer-events-auto bg-[#361b6b] text-white px-5 py-3 rounded-full shadow-xl shadow-purple-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3 font-bold border border-white/20 group"
                        >
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5" />
                                {getTotalItems() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#F2C94C] text-[#361b6b] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </div>
                            <span className="text-sm">{getTotalItems() > 0 ? `$${getTotalPrice().toFixed(2)}` : 'Cart'}</span>
                        </button>
                    </div>

                    {/* MAIN GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
                        {Object.entries(currentServices).map(([category, items]) => (
                            <div 
                                key={category} 
                                className="bg-white rounded-[0.75rem] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300"
                            >
                                {/* CARD HEADER WITH IMAGE */}
                                <div className="relative h-24 overflow-hidden">
                                    <img 
                                        src={categoryImages[category]} 
                                        alt={categoryLabels[category] || category} 
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#361b6b]/80 to-transparent" />
                                    
                                    {/* Category Title */}
                                    <div className="absolute inset-y-0 left-0 p-5 flex items-center">
                                        <h2 className="text-2xl font-bold text-white tracking-wide">
                                            {categoryLabels[category] || category}
                                        </h2>
                                    </div>
                                </div>

                                {/* LIST ITEMS */}
                                <div className="p-4 pt-2">
                                    <div className="flex flex-col">
                                        {items.map((item, idx) => (
                                            <button
                                                key={item.id}
                                                onClick={() => addToCart(item)}
                                                className={`
                                                    group/item flex items-center justify-between py-4 px-2 rounded-lg transition-all duration-200
                                                    hover:bg-gray-50 active:bg-gray-100
                                                    ${idx !== items.length - 1 ? 'border-b border-gray-100' : ''}
                                                `}
                                            >
                                                <span className="text-gray-600 font-medium text-sm text-left group-hover/item:text-gray-900">
                                                    {item.name}
                                                </span>
                                                
                                                <div className="flex items-center gap-3">
                                                    <span className="font-semibold text-gray-800 text-sm tabular-nums group-hover/item:text-[#361b6b]">
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                    <div className="w-5 h-5 rounded-full bg-[#f3e9ff] text-[#361b6b] flex items-center justify-center opacity-70 group-hover/item:opacity-100 transition-opacity">
                                                        <Plus className="w-3 h-3" />
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                         {/* BUTTON REPAIR CARD (Show on 'dry_cleaning' or 'all') */}
                         {(activeTab === 'dry_cleaning' || activeTab === 'all') && (
                             <div className="bg-white rounded-[0.75rem] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                                <div className="relative h-24 overflow-hidden">
                                    <img 
                                        src={categoryImages.repair} 
                                        alt="Button Repair" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent" />
                                    <div className="absolute inset-y-0 left-0 p-5 flex items-center">
                                        <h2 className="text-2xl font-bold text-white tracking-wide">
                                            Button repair
                                        </h2>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col items-start">
                                    <span className="inline-block bg-[#E0F2F1] text-[#00695C] text-xs font-bold px-3 py-1 rounded-full mb-4">
                                        Free!
                                    </span>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Repair service for missing or broken buttons is complimentary with any Rinse Dry Cleaning order.
                                    </p>
                                </div>
                            </div>
                         )}

                    </div>
                </div>
            </div>
            
            {/* SLIDE-OVER CART DRAWER */}
            <>
                <div
                    onClick={() => setIsCartOpen(false)}
                    className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                        isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                />

                <div className={`fixed right-0 top-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                }`}>
                    <div className="p-6 bg-[#361b6b] text-white flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-3">
                            <ShoppingCart className="w-6 h-6 text-[#d9b6ff]" />
                            <div>
                                <h2 className="font-bold text-lg">Your Estimate</h2>
                                <p className="text-xs text-purple-200">Review your items before scheduling</p>
                            </div>
                        </div>
                        <button onClick={() => setIsCartOpen(false)} className="text-white/70 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                                <ShoppingCart className="w-16 h-16 opacity-20" />
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group">
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                        <p className="text-[#361b6b] text-sm font-medium">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                        <button 
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-[#361b6b] active:scale-95"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-[#361b6b] active:scale-95"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors ml-2">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-6 bg-white border-t border-gray-100 space-y-4">
                             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-3">
                                <Info className="w-5 h-5 text-yellow-600 shrink-0" />
                                <p className="text-xs text-yellow-800 leading-tight">
                                    Prices are estimates. Final cost confirmed upon inspection.
                                </p>
                            </div>
                            
                            <div className="flex justify-between items-end pb-2">
                                <span className="text-gray-500">Total Estimate</span>
                                <span className="text-3xl font-bold text-[#361b6b]">${getTotalPrice().toFixed(2)}</span>
                            </div>

                            <Link 
                                href="/schedule" 
                                className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#361b6b] text-white text-md rounded-2xl overflow-hidden transition-transform duration-300 active:scale-95 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 w-full"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Schedule Pickup
                                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                                {/* Button Hover Effect */}
                                <div className="absolute inset-0 bg-[#5c2baa] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                            </Link>
                        </div>
                    )}
                </div>
            </>
        </AppHeaderLayout>
    );
}