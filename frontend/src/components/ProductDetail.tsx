'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/providers/CartProvider';
import { getReviewByProduct } from '@/api';

interface ProductDetailProps {
    product: any;
    loading: boolean;
}

const ProductDetail = ({ product, loading }: ProductDetailProps) => {
    const [activeTab, setActiveTab] = useState('description');
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState('');
    const [reviews, setReviews] = useState<any[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const { addToCart } = useCart();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        const getOrdinal = (n: number) => {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return s[(v - 20) % 10] || s[v] || s[0];
        };

        return `${day}${getOrdinal(day)} ${month} ${year}`;
    };

    const handleAddToCart = () => {
        addToCart({
            id: product._id,
            name: product.name,
            price: product.salePrice,
            salePrice: product.price,
            quantity: quantity,
            image: product.image.url,
            slug: product.slug,
            category: product.category?.name || 'Product'
        });
    };

    useEffect(() => {
        if (product?.image?.url) {
            setMainImage(product.image.url);
        }

        if (product?._id) {
            const fetchReviews = async () => {
                setReviewsLoading(true);
                try {
                    const response = await getReviewByProduct(product._id);
                    if (response.success) {
                        setReviews(response.data || []);
                    }
                } catch (error) {
                    console.error("Failed to fetch reviews:", error);
                } finally {
                    setReviewsLoading(false);
                }
            };
            fetchReviews();
        }
    }, [product]);

    const handleQuantityChange = (type: 'inc' | 'dec') => {
        if (type === 'inc') setQuantity(prev => prev + 1);
        else if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container py-5 text-center">
                <h2>Product not found</h2>
                <Link href="/products" className="btn btn-primary mt-3">Back to Products</Link>
            </div>
        );
    }

    const discountPercentage = Math.round(((product.price - product.salePrice) / product.price) * 100);

    const thumbnails = [
        product.image.url,
        ...(product.gallery || []).map((img: any) => img.url)
    ];

    const averageRating = reviews.length > 0
        ? Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length)
        : 0;

    return (
        <section className="product-detail-section py-5">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="product-breadcrumb pb-5">
                    <Link href="/">Home</Link>
                    <span className="separator">/</span>
                    <Link href="/products">Products</Link>
                    <span className="separator">/</span>
                    <Link href="/products">{product.category?.name}</Link>
                    <span className="separator">/</span>
                    <span className="current">{product.name}</span>
                </nav>

                <div className="row g-5">
                    {/* Left: Image Gallery */}
                    <div className="col-lg-6">
                        <div className="d-flex gap-3">
                            <div className="product-thumbnails d-none d-md-flex flex-column gap-3">
                                {thumbnails.map((src, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail-box ${mainImage === src ? 'active' : ''}`}
                                        onClick={() => setMainImage(src)}
                                    >
                                        <Image src={src} alt={`Thumbnail ${index + 1}`} width={80} height={80} objectFit="cover" className="rounded" />
                                    </div>
                                ))}
                            </div>
                            <div className="product-main-image flex-grow-1">
                                <Image
                                    src={mainImage || product.image.url}
                                    alt={product.name}
                                    width={600}
                                    height={500}
                                    layout="responsive"
                                    objectFit="cover"
                                    className="rounded-4"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="col-lg-6">
                        <div className="product-info-wrapper">
                            <div className="offer-badge mb-3">Introductory Offer <span className='fw-bold'>{discountPercentage}% OFF</span></div>
                            <h1 className="product-title mb-2">{product.name}</h1>

                            <div className="ratings-reviews mb-3 d-flex align-items-center gap-2">
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= averageRating ? "#FF8D29" : "#DDD"}>
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="review-count">{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</span>
                            </div>

                            <div className="price-tag mb-4 d-flex align-items-center gap-3">
                                <span className="current-price">₹{product.salePrice} /-</span>
                                <span className="old-price">₹{product.price}/-</span>
                            </div>

                            <div className="actions-wrapper d-flex align-items-center gap-4 mb-5">
                                <div className="quantity-selector d-flex align-items-center">
                                    <button onClick={() => handleQuantityChange('dec')}>-</button>
                                    <span className='product-quantity'>{quantity.toString().padStart(2, '0')}</span>
                                    <button onClick={() => handleQuantityChange('inc')}>+</button>
                                </div>
                                <button className="btn add-to-cart-btn" onClick={handleAddToCart}>
                                    Add to Cart
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="product-tabs-wrapper">
                                <div className="tabs-header d-flex gap-5 mb-4">
                                    <button
                                        className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('description')}
                                    >
                                        Description
                                    </button>
                                    <button
                                        className={`tab-btn ${activeTab === 'delivery' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('delivery')}
                                    >
                                        Delivery
                                    </button>
                                    <button
                                        className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('reviews')}
                                    >
                                        Reviews ({reviews.length})
                                    </button>
                                </div>

                                <div className="tab-content">
                                    {activeTab === 'description' && (
                                        <div className="description-tab">
                                            <div className="mb-4" dangerouslySetInnerHTML={{ __html: product.description }} />
                                            {product.packContain && (
                                                <div className="pack-contains mb-4">
                                                    <h4 className="section-title mb-2">Pack Contains :</h4>
                                                    <div dangerouslySetInnerHTML={{ __html: product.packContain }} />
                                                </div>
                                            )}
                                            <div className="key-details mb-4">
                                                <h4 className="section-title mb-3">Key Details</h4>
                                                <div dangerouslySetInnerHTML={{ __html: product.keyDetails }} />
                                            </div>
                                            {product.instructions && (
                                                <div className="usage-instructions">
                                                    <h4 className="section-title mb-3">Instructions for Use</h4>
                                                    <div dangerouslySetInnerHTML={{ __html: product.instructions }} />
                                                </div>
                                            )}
                                            {product.nutritionalValue && (
                                                <div className="nutritional-value mt-4">
                                                    <h4 className="section-title mb-3">Nutritional Value</h4>
                                                    <div dangerouslySetInnerHTML={{ __html: product.nutritionalValue }} />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'delivery' && (
                                        <div className="delivery-tab">
                                            <p className="mb-4">
                                                Orders are usually delivered within 24—72 hours, depending on your location. Delivered in temperature-controlled packaging to maintain freshness and quality. Delivery timelines may vary for remote or non-metro locations.
                                            </p>
                                            <div className="pincode-checker mb-4">
                                                <h5 className="mb-3">Enter your pincode to check availability and exact delivery time.</h5>
                                                <div className="pincode-input-box">
                                                    <input type="text" placeholder="Enter Pincode" />
                                                    <button className="search-btn">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="delivery-status mb-4">
                                                <div className="status-item d-flex align-items-center gap-2 mb-2">
                                                    <span className="check-icon">✓</span>
                                                    <span>Delivery available</span>
                                                </div>
                                                <div className="status-item d-flex align-items-center gap-2">
                                                    <span className="truck-icon">🚚</span>
                                                    <span>Expected delivery in 3—5 days due to your location.</span>
                                                </div>
                                            </div>
                                            <div className="shelf-life-storage">
                                                <h4 className="section-title mb-3">Shelf Life & Storage</h4>
                                                <ul className="details-list list-unstyled">
                                                    <li><strong>Shelf Life:</strong> Up to 6 months from the date of manufacture</li>
                                                    <li><strong>Storage Instructions:</strong> Store frozen at —18°C or below</li>
                                                    <li><strong>Do not refreeze once thawed</strong></li>
                                                    <li><strong>Consume immediately after cooking for best taste and texture</strong></li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'reviews' && (
                                        <div className="reviews-tab">
                                            {reviewsLoading ? (
                                                <div className="text-center py-4">
                                                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                                                        <span className="visually-hidden">Loading reviews...</span>
                                                    </div>
                                                </div>
                                            ) : reviews.length === 0 ? (
                                                <div className="text-center py-4 text-muted">
                                                    No reviews yet for this product.
                                                </div>
                                            ) : (
                                                reviews.map((review, index) => (
                                                    <div key={review._id} className={`review-item mb-4 pb-4 ${index !== reviews.length - 1 ? 'border-bottom' : ''}`}>
                                                        <div className="stars mb-2">
                                                            {[1, 2, 3, 4, 5].map(star => (
                                                                <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= review.rating ? "#FF8D29" : "#DDD"}>
                                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <p className="review-text mb-2">"{review.message}"</p>
                                                        <div className="review-meta">
                                                            {formatDate(review.createdAt)} ~ <span className="author">{review.name}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
