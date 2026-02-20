import React from 'react';
import SecondaryHeader from '@/partials/SecondaryHeader';
import Footer from '@/partials/Footer';
import Link from 'next/link';

const PrivacyPolicyPage = () => {
    return (
        <main>
            <SecondaryHeader />

            <section className="policy-section py-5">
                <div className="container">
                    <nav className="product-breadcrumb pb-4">
                        <Link href="/">Home</Link>
                        <span className="separator">/</span>
                        <Link href="/privacy-policy" className="current">Privacy Policy</Link>
                    </nav>

                    <div className="row">
                        <div className="col-12 text-dark">
                            <h1 className="product-title mb-4">Privacy Policy</h1>

                            <div className="policy-content">
                                <p className="mb-4">This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from veloz.com.</p>

                                <h3 className="h5 fw-bold mb-3">1. Personal Information We Collect</h3>
                                <p className="mb-4">
                                    When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                                </p>

                                <h3 className="h5 fw-bold mb-3">2. How Do We Use Your Personal Information?</h3>
                                <p className="mb-4">
                                    We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
                                </p>

                                <h3 className="h5 fw-bold mb-3">3. Sharing Your Personal Information</h3>
                                <p className="mb-4">
                                    We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store.
                                </p>

                                <h3 className="h5 fw-bold mb-3">4. Your Rights</h3>
                                <p className="mb-4">
                                    If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted.
                                </p>

                                <h3 className="h5 fw-bold mb-3">5. Data Retention</h3>
                                <p className="mb-4">
                                    When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
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

export default PrivacyPolicyPage;
