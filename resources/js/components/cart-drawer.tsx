import { ShoppingCart, Plus, Minus, Trash2, X, Info } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useI18n } from "@/contexts/I18nContext";

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemove, getTotalItems, getTotalPrice }) {
    const { t } = useI18n();

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            />

            {/* Drawer */}
            <div className={`fixed right-0 top-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 bg-[#361b6b] text-white flex justify-between items-center shadow-md">
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="w-6 h-6 text-[#d9b6ff]" />
                        <div>
                            <h2 className="font-bold text-lg">{t('checkrate.your_estimate')}</h2>
                            <p className="text-xs text-purple-200">{t('checkrate.review_items')}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                            <ShoppingCart className="w-16 h-16 opacity-20" />
                            <p>{t('checkrate.cart_empty')}</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group">
                                <div>
                                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                    <p className="text-[#361b6b] text-sm font-medium">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-[#361b6b] active:scale-95">
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-[#361b6b] active:scale-95">
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                                <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors ml-2">
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
                            <p className="text-xs text-yellow-800 leading-tight">{t('checkrate.prices_note')}</p>
                        </div>
                        <div className="flex justify-between items-end pb-2">
                            <span className="text-gray-500">{t('checkrate.total_estimate')}</span>
                            <span className="text-3xl font-bold text-[#361b6b]">${getTotalPrice().toFixed(2)}</span>
                        </div>
                        <Link
                            href="/schedule"
                            className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#361b6b] text-white text-md rounded-2xl overflow-hidden transition-transform duration-300 active:scale-95 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 w-full"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {t('checkrate.schedule_pickup')}
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-[#5c2baa] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}