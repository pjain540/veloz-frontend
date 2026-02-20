import Link from "next/link";
import ContactForm from "./ContactForm";

const ContactSection = () => {
    return (
        <section className="contact-section py-5">
            <div className="container">
                <nav className="product-breadcrumb pb-4">
                    <Link href="/">Home</Link>
                    <span className="separator">/</span>
                    <Link href="/contact" className="current">Contact Us</Link>
                </nav>
                <div className="row">
                    <div className="col-md-6 col-12 pe-lg-5">
                        <h1 className="product-title mb-3">Bulk Orders & B2B Partnerships</h1>

                        <p className="contact-section-subtitle">We partner with food businesses to deliver premium frozen food solutions at scale.
                        </p>
                        <p>
                            Whether you’re a distributor, retailer, café, or cloud kitchen, we ensure consistent quality, dependable supply, and cost-effective pricing so you can focus on growing your business with confidence.
                        </p>
                    </div>
                    <div className="col-md-6 col-12">
                        <h1 className="product-title mb-3">Get in touch with us</h1>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;