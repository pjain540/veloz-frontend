import React from 'react';
import Image from 'next/image';

const OurStory = () => {
    return (
        <section className="our-story-section py-5">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-6">
                        <div className="our-story-image-wrapper">
                            <Image
                                src="/assets/combo_platter.png"
                                alt="Our Story"
                                width={600}
                                height={400}
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="our-story-content">
                            <h2 className="our-story-heading mb-4">Our Story</h2>
                            <p className="our-story-para mb-3">
                                Veloz Foods was created with a simple belief, good food should fit effortlessly into everyday life. We bring together authentic flavors and dependable quality to make meals easier, without compromising on taste.
                            </p>
                            <p className="our-story-para mb-0">
                                Designed for busy days and real cravings, our food is crafted to be easy to prepare and consistently satisfying so every meal feels familiar, comforting, and enjoyable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
