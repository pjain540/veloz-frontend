import React from 'react';
import Link from 'next/link';

const AboutHero = () => {
    return (
        <section className="about-hero-section py-5">
            <div className="container">
                <div className="about-breadcrumb">
                    <Link href="/" className="breadcrumb-home">Home</Link>
                    <span className="breadcrumb-separator">\</span>
                    <span className="breadcrumb-active">About Us</span>
                </div>

                <div className="row g-5 align-items-center pb-5">
                    <div className="col-lg-6">
                        <div className="about-hero-content">
                            <h1 className="about-hero-heading mb-4">
                                Where Freshness Meets Convenience
                            </h1>
                            <p className="about-hero-para">
                                At Veloz Foods, we make frozen meals and ready-to-cook foods that are as delicious as home-cooked, without the long prep time. Every dish is crafted with care, using quality ingredients and authentic recipes so that you never have to compromise on taste or nutrition; even on your busiest days
                            </p>
                            <Link href="/contact" className="btn contact-btn d-flex align-items-center gap-3">
                                Contact Us
                                <span className="arrow-icon-wrapper">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-video-wrapper">
                            <video
                                width="100%"
                                height="333"
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="about-hero-video"
                            >
                                <source src="/assets/freshness-video.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>

                <div className='pt-5'>
                    <div className="about-hero-banner">
                        <p className="about-hero-banner-text">
                            Founded with the belief that convenient food should be wholesome and flavourful, Veloz Foods combines culinary expertise with modern food-ready technology.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
