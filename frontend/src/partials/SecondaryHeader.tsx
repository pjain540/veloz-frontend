"use client"
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CartDrawer from "@/components/CartDrawer";
import CheckoutDrawer from "@/components/CheckoutDrawer";
import SearchDrawer from "@/components/SearchDrawer";
import NavDrawer from "@/components/NavDrawer";
import { useCart } from "@/providers/CartProvider";

const SecondaryHeader = () => {

    const pathname = usePathname();
    const { cartCount } = useCart();

    return (
        <div className="pb-5">
            <header className="secondary-header-wrapper">
                <nav className="secondary-header-nav container">
                    <div className="secondary-logo-group d-flex align-items-center">
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
                        <div className="secondary-logo">
                            <Link href="/">
                                <Image
                                    src="/assets/logo.png"
                                    alt="Veloz Logo"
                                    width={120}
                                    height={80}
                                    priority
                                />
                            </Link>
                        </div>
                    </div>
                    <ul className="secondary-nav-links d-none d-lg-flex">
                        <li>
                            <Link href="/" className={`secondary-nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
                        </li>
                        <li>
                            <Link href="/about" className={`secondary-nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
                        </li>
                        <li>
                            <Link href="/products" className={`secondary-nav-link ${pathname === '/products' ? 'active' : ''}`}>Products</Link>
                        </li>
                        <li>
                            <Link href="/contact" className={`secondary-nav-link ${pathname === '/contact' ? 'active' : ''}`}>Contact Us</Link>
                        </li>
                    </ul>
                    <div className="secondary-header-actions">
                        <div className="secondary-search-icon" style={{ cursor: 'pointer' }} data-bs-toggle="offcanvas" data-bs-target="#searchOffcanvas">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                        {/* <div className="secondary-cart-icon" style={{ cursor: 'pointer' }} data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        </div> */}
                        <div className="secondary-cart-icon position-relative" style={{ cursor: 'pointer' }} data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            {cartCount > 0 && (
                                <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px', top: '5px', right: '-10px' }}>
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </nav>
                <CartDrawer />
                <CheckoutDrawer />
                <SearchDrawer />
                <NavDrawer />
            </header>
        </div>
    );
};

export default SecondaryHeader;
