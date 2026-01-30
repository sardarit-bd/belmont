import React, { useState } from "react";
import AppHeaderLayout from "@/layouts/app/app-header-layout";

export default function CheckRates() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [expandedCategories, setExpandedCategories] = useState({
        shirts: true,
        polos: false,
        bottoms: false,
        tops: false,
    });

    const services = {
        shirts: [
            { id: 1, name: "Shirt (Hanger)", price: 5.5 },
            { id: 2, name: "Shirt (Box)", price: 6.0 },
            { id: 3, name: "Shirt (Laundry)", price: 4.45 },
        ],
        polos: [{ id: 4, name: "Polo Shirt", price: 7.0 }],
        bottoms: [
            { id: 5, name: "Pants", price: 8.5 },
            { id: 6, name: "Jeans", price: 9.0 },
            { id: 7, name: "Shorts", price: 7.5 },
        ],
        tops: [
            { id: 8, name: "Blouse", price: 8.0 },
            { id: 9, name: "Sweater", price: 10.0 },
        ],
    };

    const categoryLabels = {
        shirts: "Shirts",
        polos: "Polos",
        bottoms: "Bottoms",
        tops: "Tops",
    };

    const addToCart = (item) => {
        const existing = cart.find((c) => c.id === item.id);

        if (existing) {
            setCart(
                cart.map((c) =>
                    c.id === item.id
                        ? { ...c, quantity: c.quantity + 1 }
                        : c
                )
            );
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) =>
        setCart(cart.filter((item) => item.id !== id));

    const updateQuantity = (id, delta) => {
        setCart(
            cart
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity + delta,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const getTotalItems = () =>
        cart.reduce((sum, item) => sum + item.quantity, 0);

    const getTotalPrice = () =>
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const toggleCategory = (cat) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [cat]: !prev[cat],
        }));
    };

    return (
        <AppHeaderLayout>
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* CART BAR OR BUTTON */}
                    {cart.length === 0 ? (
                        <div className="flex justify-center mb-6">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-purple-700"
                            >
                                View Cart
                            </button>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-lg p-6 mb-6 flex items-center justify-between text-white">
                            <div>
                                <p className="text-sm">Your Cart</p>
                                <p className="text-xl font-bold">
                                    {getTotalItems()} items
                                </p>
                            </div>
                            <p className="text-2xl font-bold">
                                ~${getTotalPrice().toFixed(2)}
                            </p>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold"
                            >
                                View Cart
                            </button>
                        </div>
                    )}

                    {/* SERVICE LIST */}
                    <div className="space-y-4">
                        {Object.entries(services).map(([category, items]) => (
                            <div
                                key={category}
                                className="bg-white rounded-xl shadow"
                            >
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className="w-full px-6 py-4 flex justify-between"
                                >
                                    <h2 className="font-semibold text-lg">
                                        {categoryLabels[category]}
                                    </h2>
                                    <span>
                                        {expandedCategories[category]
                                            ? "−"
                                            : "+"}
                                    </span>
                                </button>

                                {expandedCategories[category] && (
                                    <div className="grid md:grid-cols-3 gap-4 p-6">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="border rounded-lg p-4"
                                            >
                                                <h3 className="font-semibold">
                                                    {item.name}
                                                </h3>
                                                <p className="text-purple-600 font-bold">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        addToCart(item)
                                                    }
                                                    className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* DRAWER */}
            {/* CART DRAWER */}
            {isCartOpen && (
                <>
                    {/* OVERLAY */}
                    <div
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/30 z-40"
                    />

                    {/* PANEL */}
                    <div className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-[#faf7ff] z-50 shadow-2xl flex flex-col">

                        {/* HEADER */}
                        <div className="flex items-start justify-between p-6 border-b">
                            <div className="flex gap-3">
                                <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
                                    🛒
                                </div>
                                <div>
                                    <h2 className="font-bold text-xl">Your Cart</h2>
                                    <p className="text-sm text-gray-500">
                                        {getTotalItems()} item ready for estimate
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-xl text-gray-500"
                            >
                                ✕
                            </button>
                        </div>

                        {/* ITEMS */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4">

                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl p-4 shadow-sm border"
                                >
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-semibold">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Shirts
                                            </p>
                                            <p className="text-purple-600 font-semibold">
                                                ${item.price.toFixed(2)} each
                                            </p>
                                        </div>

                                        <button
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                            className="text-red-500 text-lg"
                                        >
                                            🗑
                                        </button>
                                    </div>

                                    <div className="mt-4 flex justify-between items-center">

                                        {/* QTY */}
                                        <div className="flex gap-3 items-center bg-purple-50 px-3 py-2 rounded-xl">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, -1)
                                                }
                                                className="bg-white border rounded-lg w-8 h-8"
                                            >
                                                −
                                            </button>

                                            <span className="font-semibold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, 1)
                                                }
                                                className="bg-white border rounded-lg w-8 h-8"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <p className="font-bold text-purple-600">
                                            ~$
                                            {(item.price * item.quantity).toFixed(
                                                2
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL BOX */}
                        {cart.length > 0 && (
                            <>
                                <div className="mx-5 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white p-5 space-y-3">

                                    <div className="flex justify-between text-sm">
                                        <span>Total Items:</span>
                                        <span>{getTotalItems()}</span>
                                    </div>

                                    <hr className="opacity-30" />

                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">
                                            Estimated Total:
                                        </span>
                                        <span className="text-3xl font-bold">
                                            ~${getTotalPrice().toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* WARNING */}
                                <div className="mx-5 mt-4 bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-sm text-yellow-800">
                                    <strong>Important:</strong> Prices are
                                    estimates only.
                                    Text{" "}
                                    <span className="font-bold">
                                        508-718-7711
                                    </span>{" "}
                                    to confirm the final amount.
                                </div>

                                {/* ACTIONS */}
                                <div className="p-5 space-y-3">

                                    <button className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold flex justify-center gap-2">
                                        🛒 Text for Quote Confirmation
                                    </button>

                                    <button className="w-full border py-4 rounded-xl font-semibold flex justify-center gap-2">
                                        📞 Call to Schedule Pickup
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}

        </AppHeaderLayout>
    );
}
