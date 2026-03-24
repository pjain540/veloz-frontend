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

export default function PaymentSuccess({
    searchParams,
}: {
    searchParams: Promise<{ orderId: string }>;
}) {
    const { orderId } = use(searchParams);
    const { clearCart } = useCart();
    const [order, setOrder] = useState<OrderData['data'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        clearCart();
        if (orderId) {
            fetchOrderDetails(orderId);
        } else {
            setLoading(false);
            setError("Order ID not found in URL");
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

    if (error || !order) {
        return (
            <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-white text-center px-3">
                <div className="bg-light p-5 rounded-4 border border-1 shadow-sm" style={{ maxWidth: '500px' }}>
                    <div className="text-danger mb-4">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </div>
                    <h2 className="fw-bold mb-3" style={{ fontFamily: 'var(--veloz-font-main)', color: '#3E2723' }}>Order Not Found</h2>
                    <p className="text-muted mb-4">{error || "We couldn't find the details for this order."}</p>
                    <Link href="/products" className="hero-btn mx-auto">
                        Explore Menu
                        <span className="hero-btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14H11V21L20 10H13Z" /></svg>
                        </span>
                    </Link>
                </div>
            </div>
        );
    }

    const itemsTotal = order.products.reduce((acc, item) => acc + (item.productId.salePrice * item.quantity), 0);
    const shippingPrice = order.amount - itemsTotal;

    return (
        <div className="bg-white min-vh-100">
            <SecondaryHeader />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-11">

                        {/* Status Panel */}
                        <div className="success-banner mb-5 text-center p-md-5 p-4 rounded-5" style={{ backgroundColor: '#3E2723', position: 'relative', overflow: 'hidden' }}>
                            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ opacity: 0.05, backgroundImage: 'url("/assets/Group.png")', backgroundSize: 'cover' }}></div>
                            <div className="mb-4 d-inline-block p-3 bg-white bg-opacity-10 rounded-circle animate-pulse">
                                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--veloz-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <h1 className="display-5 text-white mb-3" style={{ fontFamily: 'var(--veloz-font-main)', fontWeight: 700 }}>Payment Successful!</h1>
                            <p className="lead text-white-50 mb-0 mx-auto" style={{ maxWidth: '600px' }}>Your order <span className="text-white fw-bold">{order.orderNo}</span> has been confirmed and is being prepared with care.</p>
                        </div>

                        <div className="row g-lg-5 g-4">
                            {/* Order Details Left Column */}
                            <div className="col-lg-7">
                                <div className="card border-0 rounded-4 shadow-sm mb-4 overflow-hidden">
                                    <div className="card-header bg-white py-3 border-bottom-0 px-4 pt-4">
                                        <h5 className="mb-0 fw-bold" style={{ fontFamily: 'var(--veloz-font-main)', fontSize: '24px', color: '#3E2723' }}>Order Summary</h5>
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
                                                <div className="badge px-3 py-2 rounded-pill bg-success bg-opacity-10 text-success text-uppercase" style={{ letterSpacing: '0.1em', fontSize: '10px' }}>
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
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-primary bg-opacity-10 d-flex justify-content-center align-items-center rounded-circle" style={{ height: '35px', width: '35px' }}>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--veloz-primary)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                </div>
                                                <div>
                                                    <div className="small text-muted mb-1 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>Email Address</div>
                                                    <div className="fw-bold text-dark">{order.customer.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delivery Address */}
                                    <div className="card border-0 rounded-4 shadow-sm">
                                        <div className="card-body p-4">
                                            <h6 className="form-section-label mb-3">Delivery Address</h6>
                                            <div className="d-flex gap-3">
                                                <div className="bg-primary bg-opacity-10 p-3 rounded-4 flex-shrink-0" style={{ height: 'fit-content' }}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--veloz-primary)" strokeWidth="2">
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                        <circle cx="12" cy="10" r="3"></circle>
                                                    </svg>
                                                </div>
                                                <div className="pt-1">
                                                    <div className="fw-bold text-dark mb-1" style={{ fontSize: '18px' }}>
                                                        House {order.address.houseNo}
                                                    </div>
                                                    <div className="text-muted fw-bold mb-1">{order.address.street}</div>
                                                    <div className="badge bg-light text-dark px-3 py-2 rounded-pill mt-2">
                                                        PIN: {order.address.pincode}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Info */}
                                    <div className="card border-0 rounded-4 shadow-sm" style={{ borderLeft: '5px solid var(--veloz-primary) !important' }}>
                                        <div className="card-body p-4 d-flex justify-content-between align-items-center">
                                            <div>
                                                <div className="small text-muted mb-1 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>Payment Method</div>
                                                <div className="fw-bold text-dark h5 mb-0">{order.paymentMethod.toUpperCase()}</div>
                                            </div>
                                            <div className="bg-light p-3 rounded-circle">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3E2723" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-2">
                                        <Link href="/products" className="hero-btn d-flex justify-content-center">
                                            Continue Shopping
                                            <span className="hero-btn-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14H11V21L20 10H13Z" /></svg>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <style jsx>{`
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: .7; transform: scale(1.05); }
                }
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