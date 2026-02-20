import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/providers/CartProvider';

interface ProductCardProps {
    id: string;
    image: string;
    name: string;
    category: string;
    currentPrice: number;
    oldPrice: number;
    time: string;
    slug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, category, currentPrice, oldPrice, time, slug, id }) => {
    const { addToCart } = useCart();
    const handleAddToCart = () => {
        addToCart({
            id: id,
            name: name,
            price: currentPrice,
            salePrice: oldPrice,
            quantity: 1,
            image: image,
            slug: slug,
            category: category
        });
    };
    return (
        <Link href={`/products/${slug}`}>
            <div className="product-card-wrapper">
                <div className="product-card-image-box">
                    <div className="product-card-time-badge">
                        <span className="time-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 11h-1V7c0-1.1-.9-2-2-2h-3V3c0-.55-.45-1-1-1s-1 .45-1 1v2H8c-1.1 0-2 .9-2 2v4H5c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2zM8 7h8v4H8V7zm11 8H5v-2h14v2z" />
                            </svg>
                        </span>
                        ~ {time}
                    </div>
                    <Image
                        src={image}
                        alt={name}
                        width={300}
                        height={280}
                        className="product-card-image"
                    />
                </div>
                <div className="product-card-body p-4 text-center">
                    <div className="product-card-category-pill">
                        {category}
                    </div>
                    <h3 className="product-card-title my-1">{name}</h3>
                    <div className="product-card-price mb-3">
                        <span className="current-price me-2">₹{currentPrice}</span>
                        <span className="old-price text-decoration-line-through text-muted">₹{oldPrice}</span>
                    </div>
                    <button className="btn hero-btn product-card-add-btn mx-auto" onClick={handleAddToCart}>
                        Add to Cart
                        <span className="hero-btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        </span>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
