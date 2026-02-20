import React from 'react';
import SecondaryHeader from '@/partials/SecondaryHeader';
import Footer from '@/partials/Footer';
import Link from 'next/link';

const ShippingPolicyPage = () => {
    return (
        <main>
            <SecondaryHeader />

            <section className="policy-section py-5">
                <div className="container">
                    <nav className="product-breadcrumb pb-4">
                        <Link href="/">Home</Link>
                        <span className="separator">/</span>
                        <Link href="/shipping-policy" className="current">Shipping Policy</Link>
                    </nav>

                    <div className="row">
                        <div className="col-12 text-dark">
                            <h1 className="product-title mb-4">Shipping Policy</h1>

                            <div className="policy-content">
                                <h3 className="h5 fw-bold mb-3">1. Order Processing</h3>
                                <p className="mb-4">
                                    All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
                                </p>

                                <h3 className="h5 fw-bold mb-3">2. Delivery Timelines</h3>
                                <p className="mb-4">
                                    Our delivery times range from 3 to 7 business days depending on your location. For metro cities, delivery is usually faster. Frozen products are shipped using specialized cold-chain logistics to ensure they reach you in perfect condition.
                                </p>

                                <h3 className="h5 fw-bold mb-3">3. Shipping Charges</h3>
                                <p className="mb-4">
                                    Shipping charges for your order will be calculated and displayed at checkout. We offer free shipping on orders above a certain threshold as mentioned on the website from time to time.
                                </p>

                                <h3 className="h5 fw-bold mb-3">4. Shipment Confirmation & Order Tracking</h3>
                                <p className="mb-4">
                                    You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
                                </p>

                                <h3 className="h5 fw-bold mb-3">5. Damages</h3>
                                <p className="mb-4">
                                    Veloz is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
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

export default ShippingPolicyPage;
