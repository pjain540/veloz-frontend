const ContactAddressDetail = () => {
    return (
        <section className="py-5">
            <div className="contact-address-detail">
                <div className="bg-white row mx-0 py-4" style={{ borderRadius: "40px" }}>
                    <div className="col-12 col-lg-4 d-flex justify-content-center">
                        <div className="d-flex align-items-center gap-3">
                            <div className="secondary-cart-icon d-flex align-items-center justify-content-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#ffffff" stroke-width="2" />
                                    <path d="M3 7l9 6 9-6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                            <div>
                                <h2 className="address-heading mb-1">Email</h2>
                                <p className="mb-0 address-color">info@velozfoods.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex justify-content-center">
                        <div className="d-flex align-items-center gap-3">
                            <div className="secondary-cart-icon d-flex align-items-center justify-content-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M22 16.92v2a2 2 0 0 1-2.18 2
       19.79 19.79 0 0 1-8.63-3.07
       19.5 19.5 0 0 1-6-6
       19.79 19.79 0 0 1-3.07-8.67
       A2 2 0 0 1 4.11 2h2
       a2 2 0 0 1 2 1.72
       c.12.81.3 1.6.54 2.35
       a2 2 0 0 1-.45 2.11L7.09 9.91
       a16 16 0 0 0 6 6l1.73-1.11
       a2 2 0 0 1 2.11-.45
       c.75.24 1.54.42 2.35.54
       a2 2 0 0 1 1.72 2z"
                                        stroke="#ffffff"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>


                            </div>
                            <div>
                                <h2 className="address-heading mb-1">Call</h2>
                                <p className="mb-0 address-color">+91 93432 - 53883</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex justify-content-center">
                        <div className="d-flex align-items-center gap-3">
                            <div className="secondary-cart-icon d-flex align-items-center justify-content-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#ffffff" stroke-width="2" />
                                    <path d="M3 7l9 6 9-6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                            <div>
                                <h2 className="address-heading mb-1">Visit Us</h2>
                                <p className="mb-0 address-color">1 Sai Shyam Colony,<br />
                                    Sanjay Nagar,<br />
                                    Indore, Rau - 452001</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactAddressDetail;