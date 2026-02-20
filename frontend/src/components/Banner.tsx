import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Banner = () => {
    return (
        <div className='pb-5'>
            <section className="banner-section">
                <div className="banner-image-wrapper">
                    <Image
                        src="/assets/product_banner.png"
                        alt="Products Banner"
                        fill
                        priority
                        className="banner-image"
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="banner-overlay"></div>
                </div>
                <div className="banner-content-wrapper">
                    <div className="container">
                        <div className="banner-breadcrumb">
                            <Link href="/" className="banner-breadcrumb-home">Home</Link>
                            <span className="banner-breadcrumb-separator">\</span>
                            <span className="banner-breadcrumb-active">Products</span>
                        </div>
                        <h1 className="banner-heading">Crafted for Taste</h1>
                        <p className="banner-description">
                            A range of frozen foods made with care, quality, and consistency.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;
