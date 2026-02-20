"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAllCategories } from '@/api';

interface Category {
    _id: string;
    name: string;
    slug: string;
    image: {
        public_id: string;
        url: string;
    };
}

interface ShopByCategoryProps {
    page?: string;
    onCategorySelect?: (id: string) => void;
    activeCategoryId?: string;
}


const ShopByCategory = ({ page, onCategorySelect, activeCategoryId }: ShopByCategoryProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                if (response.success) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Static 'All Products' category for the products page
    const allProductsCategory = {
        _id: 'all-products',
        name: 'All Products',
        image: { url: '/assets/product_banner.png', public_id: '' },
        slug: 'all-products'
    };

    // Filter categories based on page prop
    const displayedCategories = page === 'products'
        ? [allProductsCategory, ...categories]
        : categories;

    if (loading) {
        return (
            <section className="category-section py-5">
                <div className="container text-center">
                    <p>Loading categories...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="category-section py-5">
            <div className="container">
                <h2 className="category-section-title text-center mb-5">Shop by Category</h2>
                <div className='row mx-0 justify-content-center'>
                    <div className={`${page === 'products' ? 'col-12 col-md-12' : 'col-12 col-md-11'}`}>
                        <div className="row g-4 justify-content-center">
                            {displayedCategories.map((category, index) => (
                                <div
                                    key={index}
                                    className={`${page === 'products' ? 'col-6 col-md-4 col-lg-2' : 'col-6 col-md-4 col-lg-2-5'} d-flex flex-column align-items-center cursor-pointer`}
                                    onClick={() => onCategorySelect && onCategorySelect(category._id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={`category-item text-center ${activeCategoryId === category._id ? 'active-category' : ''}`}>
                                        <div className={`${page === 'products' ? 'category-image-wrapper-162' : 'category-image-wrapper'} mb-3 ${activeCategoryId === category._id ? 'active-categoryy' : ''}`}>
                                            <Image
                                                src={category.image.url}
                                                alt={category.name}
                                                width={page === 'products' ? 162 : 180}
                                                height={page === 'products' ? 162 : 180}
                                                className="category-image"
                                            />
                                        </div>
                                        <h3 className={`category-item-name ${activeCategoryId === category._id ? 'fw-bold text-orange' : ''}`}>{category.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopByCategory;
