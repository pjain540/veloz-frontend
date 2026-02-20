import React from 'react';
import ProductCard from './ProductCard';

const bestsellerProducts = [
    {
        name: 'Cheese Corn Samosa',
        category: 'Snacks',
        image: '/assets/cheese_corn.png',
        currentPrice: '₹549 /-',
        oldPrice: '₹700/-',
        time: '8mins'
    },
    {
        name: 'Kadhai Paneer',
        category: 'Gravy',
        image: '/assets/kadai_paneer.png',
        currentPrice: '₹549 /-',
        oldPrice: '₹700/-',
        time: '8mins'
    },
    {
        name: 'Exotic Platter',
        category: 'Combo',
        image: '/assets/exotic_platter.png',
        currentPrice: '₹549 /-',
        oldPrice: '₹700/-',
        time: '8mins'
    },
    {
        name: 'Butter Paneer Masala',
        category: 'Gravy',
        image: '/assets/butter_paneer.png',
        currentPrice: '₹549 /-',
        oldPrice: '₹700/-',
        time: '8mins'
    },
    {
        name: 'Cheese Corn Samosa',
        category: 'Snacks',
        image: '/assets/cheese_corn.png',
        currentPrice: '₹549 /-',
        oldPrice: '₹700/-',
        time: '8mins'
    },
    {
        name: 'Kadhai Paneer',
        category: 'Gravy',
        image: '/assets/kadai_paneer.png',
        currentPrice: '₹549 /-',
        oldPrice: '₹700/-',
        time: '8mins'
    },
    {
        name: 'Exotic Platter',
        category: 'Combo',
        image: '/assets/exotic_platter.png',
        currentPrice: '₹549 /-',
        oldPrice: '₹700/-',
        time: '8mins'
    },
    {
        name: 'Butter Paneer Masala',
        category: 'Gravy',
        image: '/assets/butter_paneer.png',
        currentPrice: '₹549 /-',
        oldPrice: '₹700/-',
        time: '8mins'
    }
];

interface ShowProduct {
    _id: string;
    name: string;
    category: {
        name: string;
    } | string;
    image: {
        url: string;
    } | string;
    salePrice: number;
    price: number;
    cookingTime: string;
    slug: string;
}

interface ProductShowProps {
    products: ShowProduct[];
    loading: boolean;
}

const ProductShow = ({ products, loading }: ProductShowProps) => {
    if (loading) {
        return (
            <section className="py-5">
                <div className="container text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading products...</span>
                    </div>
                </div>
            </section>
        );
    }

    if (!products || products.length === 0) {
        return (
            <section className="py-5">
                <div className="container text-center">
                    <h3>No products found in this category.</h3>
                </div>
            </section>
        );
    }

    return (
        <section className="py-5">
            <div className="product-show-section">
                <div className="container">
                    <div className="row g-4">
                        {products.map((product, index) => (
                            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <ProductCard
                                    id={product._id}
                                    name={product.name}
                                    category={typeof product.category === 'object' ? product.category.name : product.category}
                                    image={typeof product.image === 'object' ? product.image.url : product.image}
                                    currentPrice={product.salePrice || product.price}
                                    oldPrice={product.salePrice ? product.price : 0}
                                    time={product.cookingTime || '8mins'}
                                    slug={product.slug}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShow;