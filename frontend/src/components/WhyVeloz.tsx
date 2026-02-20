import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const WhyVeloz = () => {
    return (
        <section className="why-veloz-section py-5">
            <div className="">
                <div className="why-veloz-outer-box p-4 p-md-5">
                    <div className="why-veloz-inner-box p-4 p-lg-5">
                        <div className="row g-4 align-items-center">
                            <div className="col-lg-6">
                                <div className="why-veloz-content">
                                    <h2 className="why-veloz-heading mb-4">Why Velloz Foods?</h2>
                                    <p className="why-veloz-para mb-2 text-muted">
                                        We understand busy days and real cravings. That's why Veloz Foods is designed to fit seamlessly into your routine, easy to cook, easy to enjoy, and always dependable.
                                    </p>
                                    <p className="why-veloz-para mb-4 text-muted">
                                        From quick snacks to complete meals, our products are made to deliver consistent taste and comfort, helping you put together great food without the extra effort. Whether it's a rushed weekday or a relaxed weekend, Veloz Foods brings reliability and flavour you can count on, every single time.
                                    </p>
                                    <Link href="/about" className="btn view-all-btn why-veloz-btn d-flex align-items-center gap-2 shadow-sm">
                                        Know More
                                        <span className="view-all-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="why-veloz-video-wrapper position-relative">
                                    <video
                                        src="/assets/why-veloz.mp4"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="why-veloz-video img-fluid rounded"
                                    />
                                    <div className="video-behind-box"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="why-veloz-features-bar py-4 px-5 mt-5">
                        <div className="row g-4 justify-content-between align-items-center">
                            <div className="col-md-4 d-flex align-items-center gap-3 px-0">
                                <div className="feature-icon-wrapper">
                                    <Image src="/assets/chilled.png" alt="Innovative Freezing" width={48} height={48} />
                                </div>
                                <div className="feature-text">
                                    <h4 className="feature-title mb-0">Innovative Freezing Methods</h4>
                                    <p className="feature-desc mb-0">Freshness locked with advanced freezing</p>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex align-items-center gap-3 px-0">
                                <div className="feature-icon-wrapper">
                                    <Image src="/assets/mortar.png" alt="Zero Additives" width={48} height={48} />
                                </div>
                                <div className="feature-text">
                                    <h4 className="feature-title mb-0">Zero Artificial Additives</h4>
                                    <p className="feature-desc mb-0">Just honest, clean food</p>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex align-items-center gap-3 px-0">
                                <div className="feature-icon-wrapper">
                                    <Image src="/assets/no-prservative.png" alt="100% Natural" width={48} height={48} />
                                </div>
                                <div className="feature-text">
                                    <h4 className="feature-title mb-0">100% Natural Ingredients</h4>
                                    <p className="feature-desc mb-0">Made using only real, carefully sourced ingredients</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Bar */}

            </div>
        </section>
    );
};

export default WhyVeloz;
