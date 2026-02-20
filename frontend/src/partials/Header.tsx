'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CartDrawer from "@/components/CartDrawer";
import CheckoutDrawer from "@/components/CheckoutDrawer";
import SearchDrawer from "@/components/SearchDrawer";
import NavDrawer from "@/components/NavDrawer";
import { useCart } from "@/providers/CartProvider";
import { getFreeShippingAbove } from "@/api";
import { useEffect, useState } from "react";

const Header = () => {
    const pathname = usePathname();
    const { cartCount } = useCart()
    const [price, setPrice] = useState(0)
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const data = await getFreeShippingAbove();
                setPrice(data?.data?.value?.price);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPrice();
    }, []);

    return (
        <header className="header-wrapper">
            <div className="container">
                {
                    pathname === "/" && (
                        <div className="header-announcement-bar">
                            Free shipping on all orders {price && `above ₹${price}`}
                        </div>
                    )
                }
                <nav className={`header-nav-container ${pathname !== '/' ? 'mt-4' : ''}`}>
                    <div className="header-logo-group d-flex align-items-center">
                        <button
                            className="hamburger-menu d-lg-none"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#navOffcanvas"
                            aria-label="Toggle navigation"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                        <div className="header-logo">
                            <Link href="/">
                                <Image
                                    src="/assets/logo.png"
                                    alt="Veloz Logo"
                                    width={120}
                                    height={45}
                                    priority
                                />
                            </Link>
                        </div>
                    </div>

                    <ul className="header-nav-links d-none d-lg-flex">
                        <li>
                            <Link href="/" className={`header-nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
                        </li>
                        <li>
                            <Link href="/about" className={`header-nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
                        </li>
                        <li>
                            <Link href="/products" className={`header-nav-link ${pathname === '/products' ? 'active' : ''}`}>Products</Link>
                        </li>
                        <li>
                            <Link href="/contact" className={`header-nav-link ${pathname === '/contact' ? 'active' : ''}`}>Contact Us</Link>
                        </li>
                    </ul>

                    <div className="header-actions">
                        <div className="header-search-icon" style={{ cursor: 'pointer' }} data-bs-toggle="offcanvas" data-bs-target="#searchOffcanvas">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                        {/* <div className="header-cart-icon" style={{ cursor: 'pointer' }} data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        </div> */}
                        <div className="header-cart-icon position-relative" style={{ cursor: 'pointer' }} data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            {cartCount > 0 && (
                                <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px', top: '5px', right: '-10px' }}>
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
            <CartDrawer />
            <CheckoutDrawer />
            <SearchDrawer />
            <NavDrawer />
        </header>
    );
};

export default Header;
