"use client";

import React, { useState, useEffect, useRef } from 'react';
import { getAllProducts, createReview } from '@/api';
import Header from '@/partials/Header';
import Footer from '@/partials/Footer';
import { toast } from 'react-hot-toast';
import SecondaryHeader from '@/partials/SecondaryHeader';

const ReviewPage = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        rating: 0,
        message: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        rating: '',
        message: '',
        product: ''
    });
    const [touched, setTouched] = useState({
        name: false,
        rating: false,
        message: false,
        product: false
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data.data || []);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchProducts();

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const isValidName = formData.name.trim().length >= 3;
        const isValidRating = formData.rating > 0;
        const isValidMessage = formData.message.trim().length >= 10;
        const isValidProduct = selectedProductId !== '';

        setErrors({
            name: touched.name && !isValidName ? "Name must be at least 3 characters long" : "",
            rating: touched.rating && !isValidRating ? "Please select a rating" : "",
            message: touched.message && !isValidMessage ? "Message must be at least 10 characters long" : "",
            product: touched.product && !isValidProduct ? "Please select a product" : ""
        });

        setIsFormValid(isValidName && isValidRating && isValidMessage && isValidProduct);
    }, [formData, selectedProductId, touched]);

    const handleRatingClick = (val: number) => {
        setFormData(prev => ({ ...prev, rating: val }));
        setTouched(prev => ({ ...prev, rating: true }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleProductSelect = (productId: string) => {
        const newValue = selectedProductId === productId ? '' : productId;
        setSelectedProductId(newValue);
        setTouched(prev => ({ ...prev, product: true }));

        if (newValue) {
            const product = products.find(p => p._id === productId);
            toast.success(`Selected: ${product?.name}`, { id: 'product-selection' });
        } else {
            toast.error('Product deselected', { id: 'product-selection' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all as touched on submit
        setTouched({
            name: true,
            rating: true,
            message: true,
            product: true
        });

        if (!isFormValid) {
            toast.error("Please fill all the fields correctly");
            return;
        }

        setIsSubmitting(true);

        try {
            const data = await createReview({
                ...formData,
                product: selectedProductId,
            });

            if (data.success) {
                toast.success(data.message || 'Thank you! Your review has been submitted.');
                setFormData({ name: '', rating: 0, message: '' });
                setSelectedProductId('');
                setTouched({
                    name: false,
                    rating: false,
                    message: false,
                    product: false
                });
            } else {
                toast.error(data.message || 'Failed to submit review');
            }
        } catch (error) {
            console.error("Failed to submit review:", error);
            toast.error('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedProduct = products.find(p => p._id === selectedProductId);

    return (
        <main className="review-page bg-white min-h-screen">
            <SecondaryHeader />

            <section className="review-form-section">
                <div className="container py-lg-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="review-card shadow-sm rounded-4 overflow-hidden border">
                                <div className="row g-0">
                                    {/* Left Side: Form Controls */}
                                    <div className="col-md-6 p-4 p-lg-5 bg-white">
                                        <h2 className="section-title mb-2 text-dark">Share Your Experience</h2>
                                        <p className="text-muted mb-3">Your feedback helps us provide you with even better service and better quality snacks.</p>

                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label fw-bold text-dark">Your Name</label>
                                                <input
                                                    name="name"
                                                    type="text"
                                                    className={`form-control py-2 rounded-3 ${errors.name ? 'is-invalid' : ''}`}
                                                    placeholder="Enter your name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-bold text-dark">Your Rating</label>
                                                <div className="star-rating d-flex gap-2 h3 mb-0">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span
                                                            key={star}
                                                            className="cursor-pointer transition-all"
                                                            style={{
                                                                cursor: 'pointer',
                                                                color: (hoverRating || formData.rating) >= star ? 'var(--veloz-primary)' : '#dee2e6'
                                                            }}
                                                            onMouseEnter={() => setHoverRating(star)}
                                                            onMouseLeave={() => setHoverRating(0)}
                                                            onClick={() => handleRatingClick(star)}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                                {errors.rating && <div className="text-danger small mt-1">{errors.rating}</div>}
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-bold text-dark">Your Message</label>
                                                <textarea
                                                    name="message"
                                                    className={`form-control rounded-3 ${errors.message ? 'is-invalid' : ''}`}
                                                    rows={4}
                                                    placeholder="Write your review here..."
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                ></textarea>
                                                {errors.message && <div className="text-danger small mt-1">{errors.message}</div>}
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-primary w-100 py-3 rounded-pill fw-bold bg-veloz-primary border-0"
                                                disabled={isSubmitting || !isFormValid}
                                                style={{ backgroundColor: 'var(--veloz-primary)' }}
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                            </button>
                                        </form>
                                    </div>

                                    {/* Right Side: Product Selection */}
                                    <div className="col-md-6 p-4 p-lg-5 bg-light border-start">
                                        <div className="h-100 d-flex flex-column">
                                            <h3 className="h4 mb-4 text-dark">Select Products</h3>
                                            <p className="small text-muted mb-4">You can select the products you're reviewing (Optional)</p>

                                            <div className="custom-dropdown position-relative" ref={dropdownRef}>
                                                <div
                                                    className="dropdown-trigger bg-white border rounded-3 p-3 d-flex align-items-center justify-content-between cursor-pointer shadow-sm"
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <span className="text-muted">
                                                        {selectedProductId
                                                            ? `1 product selected`
                                                            : 'Choose a product...'}
                                                    </span>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </div>

                                                {isDropdownOpen && (
                                                    <div className="dropdown-menu-custom position-absolute w-100 bg-white border rounded-3 mt-2 shadow-lg overflow-auto" style={{ maxHeight: '400px', zIndex: 1000, display: 'block' }}>
                                                        <div className="p-2">
                                                            {products.length === 0 ? (
                                                                <div className="p-3 text-center text-muted">Loading products...</div>
                                                            ) : products.map((product) => (
                                                                <div
                                                                    key={product._id}
                                                                    className={`product-item p-2 d-flex align-items-center gap-3 rounded-2 mb-1 cursor-pointer transition-all ${selectedProductId === product._id ? 'bg-light' : 'hover-bg'}`}
                                                                    onClick={() => handleProductSelect(product._id)}
                                                                    style={{ cursor: 'pointer' }}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input ms-2"
                                                                        checked={selectedProductId === product._id}
                                                                        onChange={() => { }} // Controlled by div click
                                                                    />
                                                                    <div className="product-img-sm" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                                        <img
                                                                            src={product.image.url}
                                                                            alt={product.name}
                                                                            className="w-100 h-100 object-fit-cover rounded"
                                                                        />
                                                                    </div>
                                                                    <div className="text-truncate">
                                                                        <div className="fw-bold small text-dark">{product.name}</div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-4 flex-grow-1" style={{ maxHeight: '300px' }}>
                                                <h6 className="text-uppercase fw-bold x-small text-muted mb-3">Selected Product</h6>
                                                <div className="row g-2">
                                                    {!selectedProductId ? (
                                                        <div className="col-12">
                                                            <div className="p-4 border border-dashed rounded-3 text-center text-muted small bg-white">
                                                                No product selected yet
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="col-12">
                                                            <div className="p-2 bg-white border rounded-3 d-flex align-items-center gap-2">
                                                                <img src={selectedProduct?.image.url} alt="" className="rounded" style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
                                                                <span className="small text-truncate fw-medium text-dark">{selectedProduct?.name}</span>
                                                                <button
                                                                    className="btn btn-link btn-sm p-0 ms-auto text-danger"
                                                                    onClick={() => handleProductSelect(selectedProductId)}
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .cursor-pointer { cursor: pointer; }
                .transition-all { transition: all 0.2s ease; }
                .hover-bg:hover { background-color: #f8f9fa; }
                .bg-veloz-primary { background-color: var(--veloz-primary); }
                .section-title { font-family: var(--veloz-font-main); font-weight: 700; color: #333; }
                .x-small { font-size: 0.75rem; }
                .border-dashed { border-style: dashed !important; }
            `}</style>
        </main>
    );
};

export default ReviewPage;
