"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/providers/CartProvider';
import { getFreeShippingAbove } from '@/api';

const CartDrawer = () => {

    const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const [price, setPrice] = useState(0)
    const [shippingPrice, setShippingPrice] = useState(0)
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const data = await getFreeShippingAbove();
                setPrice(data?.data?.value?.price);
                setShippingPrice(data?.data?.value?.shippingPrice);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPrice();
    }, []);
    // const shippingFee = cartTotal > 500 ? 50 : 0;
    const grandTotal = cartTotal <= price ? cartTotal + shippingPrice : cartTotal;

    return (
        <div className="offcanvas offcanvas-end offcanvas-container" tabIndex={-1} id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">

            {/* Header */}
            <div className="offcanvas-header px-lg-5 px-3">
                <h5 className="offcanvas-title cart-header-title" id="cartOffcanvasLabel">Cart</h5>
                <button type="button" className="cart-close-btn" data-bs-dismiss="offcanvas" aria-label="Close">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            {
                cartItems.length < 1 ? (<>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div>
                            <p className='cart-empty'>Oops!! cart is empty</p>
                            <div className='d-flex justify-content-center'>
                                <a href="/products" className="hero-btn">
                                    Explore Menu
                                    <span className="hero-btn-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14H11V21L20 10H13Z" /></svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </>) : (
                    <>
                        {/* Body - Cart Items */}
                        <div className="offcanvas-body cart-body px-lg-5 px-3 pb-0">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item-card mb-3">
                                    <div className="d-flex align-items-center gap-3 position-relative">
                                        <div className="cart-item-img-wrapper">
                                            <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-2" objectFit="cover" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <span className="cart-item-category-badge mb-1">{item.category}</span>
                                            <h6 className="cart-item-name mb-2">{item.name}</h6>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="cart-quantity-pill">
                                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                    <span className="qty-val">{item.quantity.toString().padStart(2, '0')}</span>
                                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </div>
                                                <div className="cart-item-pricing pt-1">
                                                    <span className="current-price">₹{item.price} /-</span>
                                                    <span className="old-price ms-2">₹{item.salePrice}/-</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="cart-item-remove-btn" onClick={() => removeFromCart(item.id)}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer - Price Details */}
                        <div className="cart-footer px-lg-5 py-lg-4 p-3 ">
                            <h6 className="price-details-title mb-3">Price Details</h6>
                            <div className="price-row mb-2">
                                <span>Cart (MRP)</span>
                                <span className="fw-bold">₹{cartTotal}</span>
                            </div>
                            <div className="price-row mb-3 pb-3 border-bottom border-secondary">
                                <span>Shipping & Platform Fee</span>
                                <span className="fw-bold">{cartTotal <= price ? `₹${shippingPrice}` : 'Free'}</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    <div className="grand-total-amount">₹{grandTotal}</div>
                                    <div className="grand-total-label">Grand Total</div>
                                </div>
                                <button className="btn proceed-btn d-flex align-items-center gap-2" data-bs-toggle="offcanvas" data-bs-target="#checkoutOffcanvas">
                                    Proceed
                                    <span className="proceed-icon-circle">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default CartDrawer;