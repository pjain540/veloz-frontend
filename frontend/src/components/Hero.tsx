"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Hero = () => {
    return (
        <section className="hero-section">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                // fadeEffect={{
                //     crossFade: true,
                // }}
                speed={1500}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                className="hero-slider"
            >
                <SwiperSlide>
                    <div className="hero-slide">
                        <Image
                            src="/assets/heroImage.png"
                            alt="Delicious Snacks"
                            fill
                            className="hero-slide-image"
                            priority
                        />
                        <div className="hero-overlay">
                            <div className="hero-content container">
                                <h1 className="hero-title">Good Food,<br />Ready When You Are</h1>
                                <p className="hero-subtitle">Restaurant-style snacks and meals made for everyday living.</p>
                                <a href="#menu" className="hero-btn">
                                    Explore Menu
                                    <span className="hero-btn-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14H11V21L20 10H13Z" /></svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* Placeholder for more slides if needed */}
                <SwiperSlide>
                    <div className="hero-slide">
                        <Image
                            src="/assets/heroImage.png" /* Reusing same image for demo */
                            alt="Delicious Snacks"
                            fill
                            className="hero-slide-image"
                        />
                        <div className="hero-overlay">
                            <div className="hero-content container">
                                <h1 className="hero-title">Taste The<br />Premium Quality</h1>
                                <p className="hero-subtitle">Carefully crafted recipes for your midnight cravings.</p>
                                <a href="#menu" className="hero-btn">
                                    Explore Menu
                                    <span className="hero-btn-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14H11V21L20 10H13Z" /></svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Hero;
