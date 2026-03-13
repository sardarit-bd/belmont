import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, Trash2, X, Info, Briefcase, Shirt, Waves, Grid, ChevronDown } from "lucide-react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import CartDrawer from "@/components/cart-drawer";
import { useI18n } from "@/contexts/I18nContext";
import { I18nProvider } from '@/contexts/I18nContext';

export default function CheckRates() {
    return (
        <I18nProvider>
            <CheckRatesInner />
        </I18nProvider>
    );
}

// Static category images — slug as key
const CATEGORY_IMAGES = {
    tops:          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
    bottoms:       "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    full_body:     "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    household:     "https://images.unsplash.com/photo-1760939151301-4f62a7998f0a?q=80&w=1170&auto=format&fit=crop",
    accessories:   "https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&w=800&q=80",
    comforter:     "https://images.unsplash.com/photo-1686828431244-405819565147?q=80&w=735&auto=format&fit=crop",
    dawn_comforter:"https://plus.unsplash.com/premium_photo-1664284793025-c5183e2a4dc8?q=80&w=687&auto=format&fit=crop",
    blanket:       "https://images.unsplash.com/photo-1457545195570-67f207084966?auto=format&fit=crop&w=800&q=80",
    delicates:     "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
};

function CheckRatesInner() {
    const { t }      = useI18n();
    const { services } = usePage().props;

    const [cart, setCart]                   = useState([]);
    const [isCartOpen, setIsCartOpen]       = useState(false);
    const [activeTab, setActiveTab]         = useState('all');
    const [isLoaded, setIsLoaded]           = useState(false);
    const [openCategories, setOpenCategories] = useState({});

    useEffect(() => {
        const savedCart = localStorage.getItem('laundryServiceCart');
        if (savedCart) {
            try { setCart(JSON.parse(savedCart)); } catch (e) {}
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) localStorage.setItem('laundryServiceCart', JSON.stringify(cart));
    }, [cart, isLoaded]);

    // Build currentCategories from services prop
    const currentCategories = (() => {
        if (activeTab === 'all') {
            return services.flatMap(s => s.categories);
        }
        return services.find(s => s.slug === activeTab)?.categories ?? [];
    })();

    const toggleCategory = (slug) =>
        setOpenCategories(prev => ({ ...prev, [slug]: !prev[slug] }));

    const addToCart = (item) => {
        const existing = cart.find(c => c.id === item.id);
        if (existing) {
            setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart   = (id) => setCart(cart.filter(item => item.id !== id));
    const updateQuantity   = (id, delta) =>
        setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
                    .filter(item => item.quantity > 0));
    const getTotalItems    = () => cart.reduce((sum, item) => sum + item.quantity, 0);
    const getTotalPrice    = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const tabs = [
        { slug: 'all',          labelKey: 'checkrate.tab_all',          icon: <Grid className="w-4 h-4" /> },
        { slug: 'wash_fold',    labelKey: 'checkrate.tab_wash_fold',    icon: <Briefcase className="w-4 h-4" /> },
        { slug: 'dry_cleaning', labelKey: 'checkrate.tab_dry_cleaning', icon: <Shirt className="w-4 h-4" /> },
        { slug: 'hang_dry',     labelKey: 'checkrate.tab_hang_dry',     icon: <Waves className="w-4 h-4" /> },
    ];

    return (
        <AppHeaderLayout>
            <div className="relative min-h-screen bg-white">

                {/* PAGE HEADER */}
                <div className="relative py-24 px-6 text-center overflow-hidden">
                    <div className="absolute inset-0 w-full h-full">
                        <img
                            src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1920&q=80"
                            alt="Laundry Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#361b6b]/85 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#361b6b] to-transparent opacity-30" />
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-sm">
                            {t('checkrate.title')}
                        </h1>
                        <p className="text-purple-100/90 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
                            {t('checkrate.subtitle')}
                            <span className="block mt-2 opacity-75 text-base font-normal">
                                {t('checkrate.subtitle_note')}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">

                    {/* TABS */}
                    <div className="flex justify-start md:justify-center mb-16 overflow-x-auto -mx-4 px-4 md:mx-0 py-4 no-scrollbar">
                        <div className="bg-[#EBE6E6] rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-gray-100 p-1.5 flex items-center gap-1 shrink-0">
                            {tabs.map(tab => (
                                <button
                                    key={tab.slug}
                                    onClick={() => setActiveTab(tab.slug)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                                        activeTab === tab.slug
                                            ? 'bg-[#5c2baa] text-white shadow-md'
                                            : 'text-gray-600 hover:text-[#5c2baa] hover:bg-purple-50'
                                    }`}
                                >
                                    {tab.icon}
                                    {t(tab.labelKey)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FLOATING CART */}
                    <div className="sticky top-24 z-20 mb-6 flex justify-end pointer-events-none">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="pointer-events-auto bg-[#361b6b] text-white px-5 py-3 rounded-full shadow-xl shadow-purple-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3 font-bold border border-white/20"
                        >
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5" />
                                {getTotalItems() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#F2C94C] text-[#361b6b] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </div>
                            <span className="text-sm">
                                {getTotalItems() > 0 ? `$${getTotalPrice().toFixed(2)}` : t('checkrate.cart')}
                            </span>
                        </button>
                    </div>

                    {/* MAIN GRID */}
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 pb-24 space-y-8">
                        {currentCategories.map((category) => {
                            const isOpen = !!openCategories[category.slug];
                            return (
                                <div
                                    key={category.slug}
                                    className="break-inside-avoid bg-white rounded-[0.75rem] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300"
                                >
                                    <button
                                        onClick={() => toggleCategory(category.slug)}
                                        className="relative h-24 overflow-hidden w-full text-left focus:outline-none"
                                    >
                                        <img
                                            src={CATEGORY_IMAGES[category.slug] ?? CATEGORY_IMAGES.tops}
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#361b6b]/80 to-transparent" />
                                        <div className="absolute inset-0 px-5 flex items-center justify-between">
                                            <h2 className="text-2xl font-bold text-white tracking-wide">
                                                {category.name} {/* ← already translated by controller */}
                                            </h2>
                                            <ChevronDown className={`w-5 h-5 text-white/80 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                                        </div>
                                    </button>

                                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                        <div className="overflow-hidden">
                                            <div className="p-4 pt-2">
                                                <div className="flex flex-col">
                                                    {category.products.map((item, idx) => (
                                                        <button
                                                            key={item.id}
                                                            onClick={() => addToCart(item)}
                                                            className={`group/item flex items-center justify-between py-4 px-2 rounded-lg transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 ${
                                                                idx !== category.products.length - 1 ? 'border-b border-gray-100' : ''
                                                            }`}
                                                        >
                                                            <span className="text-gray-600 font-medium text-sm text-left group-hover/item:text-gray-900">
                                                                {item.name} {/* ← already translated */}
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
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CART DRAWER */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                getTotalItems={getTotalItems}
                getTotalPrice={getTotalPrice}
            />
        </AppHeaderLayout>
    );
}