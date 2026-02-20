"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { isProductShowAtHome } from '@/api';
import { useCart } from '@/providers/CartProvider';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    salePrice: number;
    packContain: string;
    image: { url: string };
    gallery: { url: string }[];
    slug: string;
    category: { name: string } | string;
}

const ExoticCombo = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (!product) return;
        addToCart({
            id: product._id,
            name: product.name,
            price: product.salePrice,
            salePrice: product.price,
            quantity: 1,
            image: product.image.url,
            slug: product.slug,
            category: typeof product.category === 'object' ? product.category.name : product.category || 'Featured'
        });
    };
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await isProductShowAtHome();
                if (response.success && response.data.length > 0) {
                    const productData = response.data[0];
                    setProduct(productData);
                    setSelectedImage(productData.image.url);
                }
            } catch (error) {
                console.error("Error fetching featured product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);

    if (loading || !product) {
        return (
            <section className="exotic-combo-section py-5">
                <div className="container text-center">
                    <p>{loading ? "Loading featured product..." : ""}</p>
                </div>
            </section>
        );
    }

    const discountPercentage = Math.round(((product.price - product.salePrice) / product.price) * 100);

    // Combine main image and gallery for the thumbnail list
    const galleryImages = [product.image, ...product.gallery];

    return (
        <section className="exotic-combo-section py-5">
            <div className="">
                <div className="exotic-outer-box p-4 p-md-5">
                    <div className="exotic-inner-box p-4">
                        <div className="row g-4 align-items-center">
                            {/* Left Thumbnails */}
                            <div className="col-lg-1 d-none d-lg-flex flex-column gap-3">
                                {galleryImages.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`exotic-thumb ${selectedImage === img.url ? 'active-thumb' : ''}`}
                                        onClick={() => setSelectedImage(img.url)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Image src={img.url} alt={`Thumbnail ${index + 1}`} width={80} height={80} className="img-fluid rounded" />
                                    </div>
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className="col-lg-5">
                                <div className="exotic-main-image text-center">
                                    <Image
                                        src={selectedImage || product.image.url}
                                        alt={product.name}
                                        width={500}
                                        height={400}
                                        className="img-fluid rounded"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="col-lg-6">
                                <div className="exotic-content ps-lg-4">
                                    <div className="exotic-offer-badge mb-3">
                                        Introductory Offer <span className='fw-bold'>{discountPercentage}% OFF</span>
                                    </div>
                                    <h2 className="exotic-title mb-2">{product.name}</h2>
                                    <div className="exotic-price mb-3">
                                        <span className="current-price me-2">₹{product.salePrice} /-</span>
                                        <span className="old-price text-decoration-line-through text-muted small">₹{product.price}/-</span>
                                    </div>
                                    <div
                                        className="exotic-desc text-muted mb-4"
                                        dangerouslySetInnerHTML={{ __html: product.description }}
                                    />
                                    <div className="exotic-info mb-4">
                                        <h6 className="exotic-highlight mb-2">Pack Contains :</h6>
                                        <div
                                            className="exotic-list text-muted"
                                            dangerouslySetInnerHTML={{ __html: product.packContain }}
                                        />
                                    </div>
                                    <button className="btn hero-btn d-flex align-items-center" onClick={handleAddToCart}>
                                        Add to Cart
                                        <span className="hero-btn-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExoticCombo;
