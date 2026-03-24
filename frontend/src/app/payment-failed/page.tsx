"use client"
import { useEffect, useState, use } from "react";
import { useCart } from "@/providers/CartProvider";
import { getOrderById } from "@/api";
import Image from "next/image";
import Link from "next/link";
import SecondaryHeader from "@/partials/SecondaryHeader";
import Footer from "@/partials/Footer";

interface OrderData {
    success: boolean;
    data: {
        _id: string;
        orderNo: string;
        customer: {
            name: string;
            email: string;
            phone: string;
        };
        address: {
            houseNo: string;
            street: string;
            pincode: string;
        };
        products: Array<{
            productId: {
                name: string;
                image: { url: string };
                category: { name: string };
                salePrice: number;
            };
            quantity: number;
        }>;
        amount: number;
        paymentStatus: string;
        paymentMethod: string;
        createdAt: string;
    };
}

export default function PaymentFailed({
    searchParams,
}: {
    searchParams: Promise<{ orderId: string }>;
}) {
    const { orderId } = use(searchParams);
    const [order, setOrder] = useState<OrderData['data'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails(orderId);
        } else {
            setLoading(false);
            // We don't necessarily need an error if it's just a general failure page
        }
    }, [orderId]);

    const fetchOrderDetails = async (id: string) => {
        try {
            const response = await getOrderById(id);
            if (response.success) {
                setOrder(response.data);
            } else {
                setError(response.message || "Failed to fetch order details");
            }
        } catch (err) {
            setError("Something went wrong while fetching order details");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex justify-content-center align-items-center bg-white">
                <div className="spinner-border text-primary" style={{ color: 'var(--veloz-primary) !important' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const itemsTotal = order ? order.products.reduce((acc, item) => acc + (item.productId.salePrice * item.quantity), 0) : 0;
    const shippingPrice = order ? order.amount - itemsTotal : 0;

    return (
        <div className="bg-white min-vh-100">
            <SecondaryHeader />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-11">

                        {/* Status Panel - Failure Theme */}
                        <div className="failure-banner mb-5 text-center p-md-5 p-4 rounded-5" style={{ backgroundColor: '#3E2723', position: 'relative', overflow: 'hidden' }}>
                            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ opacity: 0.05, backgroundImage: 'url("/assets/Group.png")', backgroundSize: 'cover' }}></div>
                            <div className="mb-4 d-inline-block p-3 bg-white bg-opacity-10 rounded-circle">
                                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FF5252" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                            </div>
                            <h1 className="display-5 text-white mb-3" style={{ fontFamily: 'var(--veloz-font-main)', fontWeight: 700 }}>Payment Failed</h1>
                            <p className="lead text-white-50 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                                Your payment was not successful. This could be due to a cancellation or a bank processing issue.
                            </p>
                            <div className="d-flex justify-content-center gap-3">
                                <Link href="/products" className="hero-btn">
                                    Retry Checkout
                                    <span className="hero-btn-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm-1.25 11.43l-1.46-1.46C8.46 12.97 8 11.43 8 10c0-4.42 3.58-8 8-8v3l4-4-4-4v3c-5.52 0-10 4.48-10 10 0 1.68.41 3.26 1.14 4.64l1.61-1.21z" /></svg>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {order && (
                            <div className="row g-lg-5 g-4">
                                {/* Order Details Left Column */}
                                <div className="col-lg-7">
                                    <div className="card border-0 rounded-4 shadow-sm mb-4 overflow-hidden">
                                        <div className="card-header bg-white py-3 border-bottom-0 px-4 pt-4">
                                            <h5 className="mb-0 fw-bold" style={{ fontFamily: 'var(--veloz-font-main)', fontSize: '24px', color: '#3E2723' }}>Attempted Order Summary</h5>
                                        </div>
                                        <div className="card-body px-4 pb-4">
                                            <div className="order-items-wrapper">
                                                {order.products.map((item, idx) => (
                                                    <div key={idx} className={`d-flex align-items-center gap-3 py-3 ${idx !== order.products.length - 1 ? 'border-bottom border-light' : ''}`}>
                                                        <div className="position-relative flex-shrink-0" style={{ width: '90px', height: '90px' }}>
                                                            <Image
                                                                src={item.productId.image.url}
                                                                alt={item.productId.name}
                                                                fill
                                                                className="rounded-3 object-fit-cover shadow-sm"
                                                            />
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <span className="cart-item-category-badge mb-2">{item.productId.category.name}</span>
                                                            <h6 className="cart-item-name mb-1" style={{ fontSize: '18px' }}>{item.productId.name}</h6>
                                                            <div className="d-flex justify-content-between align-items-center mt-2">
                                                                <div className="text-muted small fw-bold">Qty: {item.quantity.toString().padStart(2, '0')}</div>
                                                                <div className="current-price" style={{ fontSize: '18px' }}>₹{item.productId.salePrice * item.quantity}/-</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Financial Breakdown */}
                                            <div className="cart-footer mt-4 p-4 rounded-4" style={{ backgroundColor: '#FAFAFA' }}>
                                                <h6 className="price-details-title mb-3">Price Details</h6>
                                                <div className="price-row mb-2">
                                                    <span>Cart (MRP)</span>
                                                    <span className="fw-bold">₹{itemsTotal}</span>
                                                </div>
                                                <div className="price-row mb-3 pb-3 border-bottom border-secondary border-opacity-10">
                                                    <span>Shipping & Platform Fee</span>
                                                    <span className="fw-bold">{shippingPrice > 0 ? `₹${shippingPrice}` : 'FREE'}</span>
                                                </div>

                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                    <div>
                                                        <div className="grand-total-amount" style={{ fontSize: '28px' }}>₹{order.amount}</div>
                                                        <div className="grand-total-label">Grand Total</div>
                                                    </div>
                                                    <div className="badge px-3 py-2 rounded-pill bg-danger bg-opacity-10 text-danger text-uppercase" style={{ letterSpacing: '0.1em', fontSize: '10px' }}>
                                                        {order.paymentStatus}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer & Address Right Column */}
                                <div className="col-lg-5">
                                    <div className="d-flex flex-column gap-4">
                                        {/* Receiver Info */}
                                        <div className="card border-0 rounded-4 shadow-sm">
                                            <div className="card-body p-4">
                                                <h6 className="form-section-label mb-3">Receiver&apos;s Detail</h6>
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <div className="bg-primary bg-opacity-10 d-flex justify-content-center align-items-center rounded-circle" style={{ height: '35px', width: '35px' }}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--veloz-primary)" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                    </div>
                                                    <div>
                                                        <div className="small text-muted mb-1 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>Full Name</div>
                                                        <div className="fw-bold text-dark">{order.customer.name}</div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <div className="bg-primary bg-opacity-10 d-flex justify-content-center align-items-center rounded-circle" style={{ height: '35px', width: '35px' }}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--veloz-primary)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                    </div>
                                                    <div>
                                                        <div className="small text-muted mb-1 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>Mobile Number</div>
                                                        <div className="fw-bold text-dark">{order.customer.phone}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-2">
                                            <Link href="/products" className="hero-btn d-flex justify-content-center mb-3">
                                                Back to Menu
                                                <span className="hero-btn-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14H11V21L20 10H13Z" /></svg>
                                                </span>
                                            </Link>
                                            <p className="text-center text-muted small px-3">
                                                If you think this is a mistake, please contact our support team.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!order && !loading && !error && (
                            <div className="text-center mt-5">
                                <Link href="/products" className="hero-btn mx-auto">
                                    Return to Shopping
                                    <span className="hero-btn-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14H11V21L20 10H13Z" /></svg>
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />

            <style jsx>{`
                .cart-item-category-badge {
                    background: #3E2723;
                    color: #fff;
                    font-size: 10px;
                    font-weight: 600;
                    padding: 4px 10px;
                    border-radius: 100px;
                    display: inline-block;
                }
                .price-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    font-weight: 600;
                    color: #3E2723;
                }
                .grand-total-amount {
                    font-family: var(--veloz-font-sans);
                    font-weight: 800;
                    color: var(--veloz-primary);
                }
                .grand-total-label {
                    font-size: 12px;
                    font-weight: 700;
                    color: #3E2723;
                    margin-top: -5px;
                }
                .form-section-label {
                    color: #3E2723;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
            `}</style>
        </div>
    );
}
