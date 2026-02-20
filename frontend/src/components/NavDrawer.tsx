"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NavDrawer = () => {
    const pathname = usePathname();

    // Close offcanvas when pathname changes
    React.useEffect(() => {
        const offcanvasElement = document.getElementById('navOffcanvas');
        if (offcanvasElement) {
            // Find the close button and click it to ensure Bootstrap clean up
            const closeBtn = offcanvasElement.querySelector('.cart-close-btn') as HTMLButtonElement;
            if (closeBtn && offcanvasElement.classList.contains('show')) {
                closeBtn.click();
            }
        }
    }, [pathname]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Products', href: '/products' },
        { name: 'Contact Us', href: '/contact' },
    ];

    return (
        <div className="offcanvas offcanvas-end offcanvas-container" tabIndex={-1} id="navOffcanvas" aria-labelledby="navOffcanvasLabel">
            <div className="offcanvas-header px-4">
                <div className="offcanvas-title">
                    <Image src="/assets/logo.png" alt="Veloz Logo" width={120} height={100} />
                </div>
                <button type="button" className="cart-close-btn" data-bs-dismiss="offcanvas" aria-label="Close">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div className="offcanvas-body px-4">
                <ul className="nav-drawer-links list-unstyled pt-4">
                    {navLinks.map((link) => (
                        <li key={link.name} className="mb-4">
                            <Link
                                href={link.href}
                                className={`nav-drawer-link ${pathname === link.href ? 'active' : ''}`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="offcanvas-footer p-4">
                <div className="social-links-drawer d-flex gap-3 mb-3">
                    {/* Social links can be added here */}
                </div>
                <p className="text-white-50 small mb-0">© 2026 Veloz. All rights reserved.</p>
            </div>
        </div>
    );
};

export default NavDrawer;
