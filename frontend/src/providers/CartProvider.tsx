'use client'
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    salePrice: number;
    quantity: number;
    image: string;
    slug: string;
    category: string;
}

export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCartItems = localStorage.getItem('Veloz_cart')
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('Veloz_cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product: CartItem) => {
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            toast.success(`${product.name} quantity updated!`, { id: product.id });
            setCartItems(prev => prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            toast.success(`${product.name} added to cart!`, { id: product.id });
            setCartItems(prev => [...prev, product]);
        }
    }

    const removeFromCart = (id: string) => {
        const itemToRemove = cartItems.find(i => i.id === id);
        if (itemToRemove) {
            toast.error(`${itemToRemove.name} removed from cart`, { id });
        }
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prev =>
            prev.map(item => item.id === id ? { ...item, quantity } : item)
        );
    };

    const clearCart = () => {
        setCartItems([])
    }

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}
