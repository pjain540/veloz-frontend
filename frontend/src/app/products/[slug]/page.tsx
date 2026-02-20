"use client";
import SecondaryHeader from '@/partials/SecondaryHeader';
import Footer from '@/partials/Footer';
import ProductDetail from '@/components/ProductDetail';
import React, { useEffect, useState, use } from 'react';
import { productGetBySlug } from '@/api';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productGetBySlug(slug);
                if (response.success && response.data.length > 0) {
                    setProduct(response.data[0]);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    return (
        <main>
            <SecondaryHeader />
            <ProductDetail product={product} loading={loading} />
            <Footer />
        </main>
    );
}
