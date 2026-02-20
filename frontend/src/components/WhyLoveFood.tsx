import React from 'react';
import Image from 'next/image';

const WhyLoveFood = () => {
    const features = [
        {
            icon: '/assets/fasting.png',
            title: 'Meals in Minutes',
            description: 'Enjoy wholesome, delicious food in minutes, not hours.'
        },
        {
            icon: '/assets/cereal.png',
            title: 'Frozen at Peak Freshness',
            description: 'Carefully frozen to lock in flavour, texture, and quality.'
        },
        {
            icon: '/assets/cooking.png',
            title: 'Authentic Traditional Recipes',
            description: 'Inspired by time-honored flavors and regional cooking styles.'
        },
        {
            icon: '/assets/soup.png',
            title: 'Ready-to-Cook & Heat-and-Serve',
            description: 'Designed for convenience without compromising on taste.'
        }
    ];

    return (
        <section className="whylove-section py-5">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-6 col-12">
                        <div className="whylove-content">
                            {/* Orange Icon Badge */}
                            <div className="whylove-icon-badge mb-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>

                            <h2 className="whylove-heading mb-4">Why You'll Love Our Food</h2>
                            <p className="whylove-intro mb-5">
                                From rich gravies and aromatic rice dishes to crunchy snacks and curated combo packs, our range brings together:
                            </p>

                            <div className="whylove-features-list">
                                {features.map((feature, index) => (
                                    <div key={index} className="whylove-feature-item d-flex align-items-start gap-4 mb-5">
                                        <div className="whylove-icon-box flex-shrink-0">
                                            <Image
                                                src={feature.icon}
                                                alt={feature.title}
                                                width={48}
                                                height={48}
                                                className="whylove-icon-img"
                                            />
                                        </div>
                                        <div className="whylove-text-content">
                                            <h3 className="whylove-feature-title mb-1">{feature.title}</h3>
                                            <p className="whylove-feature-desc mb-0">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="whylove-image-wrapper">
                            <Image
                                src="/assets/whyLove.png"
                                alt="Why Love Our Food"
                                width={600}
                                height={750}
                                className="img-fluid rounded-4 shadow-sm"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyLoveFood;
