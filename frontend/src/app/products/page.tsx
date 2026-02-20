"use client";
import React, { useEffect, useState } from 'react';
import Header from "@/partials/Header";
import Banner from "@/components/Banner";
import Footer from "@/partials/Footer";
import ShopByCategory from '@/components/ShopByCategory';
import GoogleReview from '@/components/GoogleReview';
import ProductShow from '@/components/ProductShow';
import { getAllProducts, productFilterByCategory } from '@/api';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategoryId, setActiveCategoryId] = useState('all-products');

    const fetchProducts = async (categoryId: string) => {
        setLoading(true);
        try {
            let data;
            if (categoryId === 'all-products') {
                data = await getAllProducts();
            } else {
                data = await productFilterByCategory(categoryId);
            }
            if (data.success) {
                setProducts(data.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(activeCategoryId);
    }, [activeCategoryId]);

    const handleCategorySelect = (id: string) => {
        setActiveCategoryId(id);
    };

    return (
        <main>
            <Header />
            <Banner />
            <ShopByCategory
                page="products"
                activeCategoryId={activeCategoryId}
                onCategorySelect={handleCategorySelect}
            />
            <ProductShow products={products} loading={loading} />
            <GoogleReview />
            <Footer />
        </main>
    );
}
