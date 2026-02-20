import React from 'react';
import SecondaryHeader from '@/partials/SecondaryHeader';
import Footer from '@/partials/Footer';
import Link from 'next/link';

const TermsAndConditionsPage = () => {
    return (
        <main>
            <SecondaryHeader />

            <section className="policy-section py-5">
                <div className="container">
                    <nav className="product-breadcrumb pb-4">
                        <Link href="/">Home</Link>
                        <span className="separator">/</span>
                        <Link href="/terms-conditions" className="current">Terms and Conditions</Link>
                    </nav>

                    <div className="row">
                        <div className="col-12 text-dark">
                            <h1 className="product-title mb-4">Terms and Conditions</h1>

                            <div className="policy-content">
                                <h3 className="h5 fw-bold mb-3">1. Agreement to Terms</h3>
                                <p className="mb-4">
                                    By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our website.
                                </p>

                                <h3 className="h5 fw-bold mb-3">2. Use of the Site</h3>
                                <p className="mb-4">
                                    You may use our site only for lawful purposes. You are prohibited from using the site to engage in any fraudulent activity or to transmit any harmful or malicious code.
                                </p>

                                <h3 className="h5 fw-bold mb-3">3. Intellectual Property</h3>
                                <p className="mb-4">
                                    All content on this website, including text, graphics, logos, and images, is the property of Veloz and is protected by intellectual property laws. You may not use any content from our site without our express written permission.
                                </p>

                                <h3 className="h5 fw-bold mb-3">4. Limitation of Liability</h3>
                                <p className="mb-4">
                                    Veloz shall not be liable for any direct, indirect, incidental, or consequential damages arising out of your use of or inability to use the website or any products purchased through the site.
                                </p>

                                <h3 className="h5 fw-bold mb-3">5. Governing Law</h3>
                                <p className="mb-4">
                                    These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts in India.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default TermsAndConditionsPage;
