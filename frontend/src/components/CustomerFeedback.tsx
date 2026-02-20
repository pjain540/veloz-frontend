"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const CustomerFeedback = () => {
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

    const testimonials = [
        {
            id: 1,
            name: "Pooja Malhotra",
            role: "Freelance Designer",
            location: "Mumbai, India",
            image: "/assets/image.jpg",
            highlight: "“Really impressed with the taste and quality.”",
            text: "The gravies are rich and flavourful, and everything is super easy to prepare. Perfect for busy weekdays.",
            rating: 5
        },
        {
            id: 2,
            name: "Rahul Sharma",
            role: "Software Engineer",
            location: "Bangalore, India",
            image: "/assets/image.jpg", // Reusing image for placeholder
            highlight: "“Best premium snacks I've ever had!”",
            text: "The quality is top-notch. I love how they maintain the restaurant taste while being so convenient to make at home.",
            rating: 5
        },
        {
            id: 3,
            name: "Ananya Iyer",
            role: "Content Creator",
            location: "Delhi, India",
            image: "/assets/image.jpg", // Reusing image for placeholder
            highlight: "“Absolutely delicious and authentic.”",
            text: "Authentic flavors that remind me of home-cooked meals but with a professional touch. Highly recommended!",
            rating: 5
        }
    ];

    return (
        <section className="feedback-section py-5">
            <div className="feedback-outer-container p-md-5">
                <div className="">
                    <div className="feedback-inner-card">
                        <div className="feedback-header py-4 text-center text-lg-start">
                            <h2 className="feedback-main-title mb-2 text-center">Customer Feedback</h2>
                            <p className="feedback-subtitle text-center">Stories from customers who rely on Veloz Foods every day.</p>
                        </div>
                        <div className="row align-items-center pb-5">
                            {/* Left Side: Testimonial Slider */}
                            <div className="col-lg-6 col-12">
                                <div className="testimonial-card-wrapper position-relative">
                                    {/* Quote Icon */}
                                    <div className="quote-icon-container">
                                        <svg
                                            width="150"
                                            height="150"
                                            viewBox="0 0 24 24"
                                            fill="#FF8D29"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6v-6H5.17A3.17 3.17 0 0 1 8.34 8.83V6H7.17Zm9 0A5.17 5.17 0 0 0 11 11.17V18h6v-6h-2.83a3.17 3.17 0 0 1 3.17-3.17V6h-1.17Z" />
                                        </svg>
                                    </div>

                                    <Swiper
                                        modules={[Navigation, Autoplay]}
                                        spaceBetween={30}
                                        slidesPerView={1}
                                        loop={true}
                                        autoplay={{
                                            delay: 4000,
                                            disableOnInteraction: false,
                                        }}
                                        navigation={{
                                            prevEl,
                                            nextEl,
                                        }}
                                        className="feedback-swiper"
                                    >
                                        {testimonials.map((item) => (
                                            <SwiperSlide key={item.id}>
                                                <div className="testimonial-card gradient-border">
                                                    {/* Profile Header */}
                                                    <div className="d-flex align-items-center gap-3 mb-4">
                                                        <div className="profile-img-wrapper">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={80}
                                                                height={80}
                                                                className="rounded-circle"
                                                                style={{ objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                        <div className="profile-info">
                                                            <h4 className="profile-name mb-0">{item.name}</h4>
                                                            <p className="profile-role mb-0 text-muted">{item.role}</p>
                                                            <p className="profile-location mb-0 small">
                                                                <span className="location-icon me-1">📍</span>
                                                                {item.location}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="divider-line mb-4"></div>

                                                    {/* Review Content */}
                                                    <div className="review-content">
                                                        <h3 className="review-highlight mb-3">
                                                            {item.highlight}
                                                        </h3>
                                                        <p className="review-subtext text-center mb-4">
                                                            {item.text}
                                                        </p>

                                                        <div className="star-rating d-flex justify-content-center gap-1">
                                                            {Array.from({ length: item.rating }).map((_, i) => (
                                                                <span key={i} className="star">★</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>


                                </div>
                            </div>

                            {/* Right Side: Map */}
                            <div className="col-lg-6 col-12 px-0 d-none d-lg-block">
                                <div className="map-container text-end pe-lg-5" style={{ position: 'relative' }}>
                                    <Image
                                        src="/assets/Group.png"
                                        alt="Customer Locations"
                                        width={600}
                                        height={400}
                                        className="img-fluid"
                                        style={{ opacity: 0.8 }}
                                    />
                                    <div style={{ position: 'absolute', top: "45%", left: "65%" }}>
                                        <Image
                                            src="/assets/MapPinFill.png"
                                            alt="Customer Locations"
                                            width={64}
                                            height={64}
                                            className="img-fluid"
                                            style={{ opacity: 0.8 }}
                                        />
                                    </div>
                                    <div style={{ position: 'absolute', top: "10%", left: "5%" }}>
                                        <Image
                                            src="/assets/MapPinFill.png"
                                            alt="Customer Locations"
                                            width={50}
                                            height={50}
                                            className="img-fluid"
                                            style={{ opacity: 0.8 }}
                                        />
                                    </div>
                                    <div style={{ position: 'absolute', top: "52%", left: "37%" }}>
                                        <Image
                                            src="/assets/MapPinFill.png"
                                            alt="Customer Locations"
                                            width={40}
                                            height={40}
                                            className="img-fluid"
                                            style={{ opacity: 0.8 }}
                                        />
                                    </div>
                                    <div style={{ position: 'absolute', top: "10%", left: "5%" }}>
                                        <Image
                                            src="/assets/MapPinFill.png"
                                            alt="Customer Locations"
                                            width={50}
                                            height={50}
                                            className="img-fluid"
                                            style={{ opacity: 0.8 }}
                                        />
                                    </div>
                                    <div style={{ position: 'absolute', top: "10%", left: "66%" }}>
                                        <Image
                                            src="/assets/MapPinFill.png"
                                            alt="Customer Locations"
                                            width={40}
                                            height={40}
                                            className="img-fluid"
                                            style={{ opacity: 0.8 }}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Navigation Arrows */}
                            {/* <div className="col-12 px-0">
                                <div className="feedback-nav-arrows d-flex gap-3 my-4 justify-content-center">
                                    <button
                                        ref={(node) => setPrevEl(node)}
                                        className="nav-arrow feedback-prev"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="19" y1="12" x2="5" y2="12"></line>
                                            <polyline points="12 19 5 12 12 5"></polyline>
                                        </svg>
                                    </button>
                                    <button
                                        ref={(node) => setNextEl(node)}
                                        className="nav-arrow feedback-next"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerFeedback;
