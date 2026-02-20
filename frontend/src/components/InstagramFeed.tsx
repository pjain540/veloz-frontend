import React from 'react';
import Image from 'next/image';

const InstagramFeed = () => {
    const feeds = [
        { id: 1, image: '/assets/snack1.jpg' },
        { id: 2, image: '/assets/snack2.jpg' },
        { id: 3, image: '/assets/snack1.jpg' },
    ];

    return (
        <section className="instagram-feed-section bg-white py-5">
            <div className="container">
                <div className="d-flex justify-content-md-between justify-content-center align-items-center mb-5 flex-wrap gap-3">
                    <h2 className="instagram-feed-title mb-0">
                        Perfect snacks for office, travel, evenings!
                    </h2>
                    <button className="btn instagram-btn d-flex align-items-center gap-2 py-2">
                        Check us on Instagram
                        <span className="instagram-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 2C4.24 2 2 4.24 2 7V17C2 19.76 4.24 22 7 22H17C19.76 22 22 19.76 22 17V7C22 4.24 19.76 2 17 2H7ZM12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9ZM18.5 4.5C19.05 4.5 19.5 4.95 19.5 5.5C19.5 6.05 19.05 6.5 18.5 6.5C17.95 6.5 17.5 6.05 17.5 5.5C17.5 4.95 17.95 4.5 18.5 4.5Z" />
                            </svg>
                        </span>
                    </button>
                </div>
                <div className="row g-4 justify-content-center">
                    {feeds.map((feed) => (
                        <div key={feed.id} className="col-lg-4 d-flex justify-content-center px-0">
                            <div className="instagram-card">
                                <Image
                                    src={feed.image}
                                    alt={`Snack Feed ${feed.id}`}
                                    width={384}
                                    height={384}
                                    className="instagram-img"
                                />
                                <div className="instagram-play-overlay">
                                    <div className="instagram-play-btn">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramFeed;
