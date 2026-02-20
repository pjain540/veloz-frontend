"use client";
import React, { useState, useEffect } from 'react';
import { searchProductByName } from '@/api';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchDrawer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchResults = async () => {
            if (searchTerm.trim().length > 0) {
                setLoading(true);
                try {
                    const response = await searchProductByName(searchTerm);
                    if (response.success) {
                        setResults(response.data);
                    }
                } catch (error) {
                    console.error("Search failed:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
            }
        };

        const timer = setTimeout(fetchResults, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleProductClick = (slug: string) => {
        setSearchTerm('');
        setResults([]);

        // Manual navigation using router.push
        router.push(`/products/${slug}`);

        // Close the offcanvas programmatically
        const offcanvasElement = document.getElementById('searchOffcanvas');
        if (offcanvasElement) {
            const closeBtn = offcanvasElement.querySelector('.btn-close') as HTMLElement;
            if (closeBtn) {
                closeBtn.click();
            } else {
                // Fallback if no close button found
                const backdrop = document.querySelector('.offcanvas-backdrop');
                if (backdrop) (backdrop as HTMLElement).click();
            }
        }
    };

    return (
        <div className="offcanvas offcanvas-top search-offcanvas-container" tabIndex={-1} id="searchOffcanvas" aria-labelledby="searchOffcanvasLabel">
            {/* <div className="offcanvas-header container px-3 pt-4">
                <h5 className="offcanvas-title cart-header-title" id="searchOffcanvasLabel">Search Products</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div> */}
            <div className="offcanvas-body container px-3 pt-5">
                <form className="search-form mt-2" onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3 d-flex gap-3">
                        <input
                            type="text"
                            className="form-control checkout-input"
                            placeholder="Search your favorite products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn contact-btn d-flex align-items-center gap-3" type="button">
                            {loading ? '...' : 'Search'}
                            <span className="arrow-icon-wrapper">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </span>
                        </button>
                    </div>
                </form>

                {/* Search Results */}
                {results.length > 0 && (
                    <div className="search-results-wrapper">
                        <ul className="search-results-list list-unstyled">
                            {results.map((product) => (
                                <li key={product._id} className="search-result-item border-bottom">
                                    <div
                                        className="d-flex align-items-center gap-3 p-3 text-decoration-none text-dark cursor-pointer"
                                        onClick={() => handleProductClick(product.slug)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="search-result-image">
                                            <Image
                                                src={product.image.url}
                                                alt={product.name}
                                                width={50}
                                                height={50}
                                                className="rounded object-fit-cover"
                                            />
                                        </div>
                                        <div className="search-result-info">
                                            <h6 className="mb-0 fw-bold">{product.name}</h6>
                                            <small className="text-muted">{product.category?.name}</small>
                                        </div>
                                        <div className="ms-auto fw-bold text-orange">
                                            ₹{product.salePrice}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {searchTerm.trim() !== '' && results.length === 0 && !loading && (
                    <div className="text-center py-4">
                        <p className="text-muted">No products found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchDrawer;