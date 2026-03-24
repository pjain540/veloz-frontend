import React, { useEffect, useState } from 'react';
import { createCustomer, createOrder, getFreeShippingAbove } from '@/api';
import toast from 'react-hot-toast';
import { useCart } from '@/providers/CartProvider';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutDrawer = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        pincode: '',
        houseNo: '',
        street: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        pincode: '',
        houseNo: '',
        street: ''
    });

    const [price, setPrice] = useState(0)
    const [shippingPrice, setShippingPrice] = useState(0)
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const data = await getFreeShippingAbove();
                setPrice(data?.data?.value?.price);
                setShippingPrice(data?.data?.value?.shippingPrice);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPrice();
    }, []);

    const grandTotal = cartTotal <= price ? cartTotal + shippingPrice : cartTotal;
    const shippingFee = cartTotal <= price ? shippingPrice : 0;

    const validateField = (name: string, value: string) => {
        let error = '';
        switch (name) {
            case 'name':
                if (!value) error = 'Name is required';
                else if (value.length < 3) error = 'Name must be at least 3 characters';
                else if (value.length > 30) error = 'Name must be at most 30 characters';
                break;
            case 'phone':
                if (!value) error = 'Mobile number is required';
                else if (!/^\d{10}$/.test(value)) error = 'Mobile number must be 10 digits';
                break;
            case 'email':
                if (!value) error = 'Email is required';
                else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid';
                break;
            case 'pincode':
                if (!value) error = 'Pincode is required';
                else if (!/^\d+$/.test(value)) error = 'Pincode must be numeric';
                break;
            case 'houseNo':
                if (!value) error = 'House No is required';
                break;
            case 'street':
                if (!value) error = 'Street is required';
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Numeric only restrictions
        if (name === 'phone' || name === 'pincode') {
            if (value !== '' && !/^\d*$/.test(value)) return;
            if (name === 'phone' && value.length > 10) return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));

        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Final validation before submission
        const newErrors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            phone: validateField('phone', formData.phone),
            pincode: validateField('pincode', formData.pincode),
            houseNo: validateField('houseNo', formData.houseNo),
            street: validateField('street', formData.street),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (hasErrors) {
            toast.error("Please correct the errors in the form");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setLoading(true);
        try {
            // 1. Create/Update Customer
            const customerData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: [
                    {
                        pincode: formData.pincode,
                        houseNo: formData.houseNo,
                        street: formData.street
                    }
                ]
            };

            const customerResponse = await createCustomer(customerData);

            if (customerResponse.success == false) {
                toast.error(customerResponse.message || "Failed to update customer details");
                setLoading(false);
                return;
            }

            // toast.success("Details updated successfully!");
            const customerId = customerResponse.data._id;

            // 2. Create Order
            const orderData = {
                products: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                })),
                customer: customerId,
                amount: grandTotal,
                address:
                {
                    pincode: formData.pincode,
                    houseNo: formData.houseNo,
                    street: formData.street
                }

            };

            const orderResponse = await createOrder(orderData);
            if (orderResponse.success) {
                toast.success("Redirecting to payment... 💳");
                const checkoutUrl = orderResponse.data.session.url;
                if (checkoutUrl) {
                    window.location.href = checkoutUrl;
                }
                // clearCart();

                // Close the drawer
                const closeBtn = document.querySelector('#checkoutOffcanvas .cart-close-btn') as HTMLElement;
                if (closeBtn) closeBtn.click();

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    pincode: '',
                    houseNo: '',
                    street: ''
                });
                setErrors({
                    name: '',
                    email: '',
                    phone: '',
                    pincode: '',
                    houseNo: '',
                    street: ''
                });
            } else {
                toast.error(orderResponse.message || "Failed to place order");
            }
        } catch (error: any) {
            console.error("Checkout/Order error:", error);
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="offcanvas offcanvas-end offcanvas-container" tabIndex={-1} id="checkoutOffcanvas" aria-labelledby="checkoutOffcanvasLabel">
            {/* Header */}
            <div className="offcanvas-header px-lg-5 px-3">
                <h5 className="offcanvas-title cart-header-title" id="checkoutOffcanvasLabel">Delivery Details</h5>
                <button type="button" className="cart-close-btn" data-bs-dismiss="offcanvas" aria-label="Close">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Body - Delivery Form */}
            <div className="offcanvas-body cart-body px-lg-5 px-3">
                <form className="delivery-form" onSubmit={handleSubmit}>
                    {/* Section 2: Receiver's Detail */}
                    <div className="form-section mb-4">
                        <h6 className="form-section-label mb-1">Receiver's Detail</h6>
                        <p className="form-section-subtext mb-3">Information provided here will be used to contact you for delivery updates</p>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`form-control checkout-input ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Full Name"
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`form-control checkout-input ${errors.phone ? 'is-invalid' : ''}`}
                                placeholder="Mobile Number"
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-control checkout-input ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="Email Address"
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                    </div>
                    {/* Section 1: Delivery Address */}
                    <div className="form-section mb-4">
                        <h6 className="form-section-label mb-3">Delivery Address</h6>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className={`form-control checkout-input ${errors.pincode ? 'is-invalid' : ''}`}
                                placeholder="Pincode"
                            />
                            {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="houseNo"
                                value={formData.houseNo}
                                onChange={handleChange}
                                className={`form-control checkout-input ${errors.houseNo ? 'is-invalid' : ''}`}
                                placeholder="House/Flat No./Locality"
                            />
                            {errors.houseNo && <div className="invalid-feedback">{errors.houseNo}</div>}
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                className={`form-control checkout-input ${errors.street ? 'is-invalid' : ''}`}
                                placeholder="Road Name/Area/Colony"
                            />
                            {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                        </div>
                    </div>
                </form>
            </div>

            {/* Footer - Navigation Buttons */}
            <div className="cart-footer px-lg-5 py-4 p-3 mt-auto">
                <div className="d-flex gap-3">
                    <button
                        className="btn back-to-cart-btn flex-grow-1"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#cartOffcanvas"
                        type="button"
                    >
                        Back to Cart
                    </button>
                    <button
                        className="btn proceed-btn flex-grow-1 py-3"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : `Pay ₹${grandTotal}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutDrawer;
