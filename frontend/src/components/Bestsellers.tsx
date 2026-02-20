"use client";
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { bestsellerProducts as fetchBestsellers } from '@/api';

interface Product {
    _id: string;
    name: string;
    price: number;
    salePrice: number;
    cookingTime: string;
    slug: string;
    category: {
        name: string;
    };
    image: {
        url: string;
    };
}

const Bestsellers = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBestsellers = async () => {
            try {
                const response = await fetchBestsellers();
                if (response.success) {
                    setProducts(response.data);
                }
            } catch (error) {
                console.error("Error fetching bestsellers:", error);
            } finally {
                setLoading(false);
            }
        };

        loadBestsellers();
    }, []);

    if (loading) {
        return (
            <section className="bestsellers-section py-5">
                <div className="container text-center">
                    <p>Loading bestsellers...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bestsellers-section py-5">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h2 className="bestsellers-title">Bestsellers</h2>
                    <Link href="/products" className="btn view-all-btn d-flex align-items-center gap-2">
                        View All
                        <span className="view-all-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8h2.5V2c-2.76 0-5 2.24-5 4z" />
                            </svg>
                        </span>
                    </Link>
                </div>
                <div className="row g-4">
                    {products.slice(0, 4).map((product) => (
                        <div key={product._id} className="col-12 col-sm-6 col-lg-3">
                            <ProductCard
                                id={product._id}
                                image={product.image.url}
                                name={product.name}
                                category={product.category.name}
                                currentPrice={product.salePrice}
                                oldPrice={product.price}
                                time={product.cookingTime}
                                slug={product.slug}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Bestsellers;
