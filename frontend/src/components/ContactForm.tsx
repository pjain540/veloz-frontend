"use client"
import { createContact } from "@/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })
    const [error, setError] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })
    const [isFormValid, setIsFormValid] = useState(false)
    useEffect(() => {
        const isValidName = formData.name.length >= 3;
        const isValidPhone = /^\d{10}$/.test(formData.phone);
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        setError({
            name: formData.name && !isValidName ? "Name must be at least 3 characters long" : "",
            email: formData.email && !isValidEmail ? "Email is invalid" : "",
            phone: formData.phone && !isValidPhone ? "Phone number must be 10 digits long" : "",
            message: formData.message && formData.message.length < 10 ? "Message must be at least 10 characters long" : ""
        })
        setIsFormValid(isValidName && isValidPhone && isValidEmail);
    }, [formData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            if (value != '') {
                const regex = /^[0-9]*$/;
                if (!regex.test(value)) {
                    return;
                }
            }
        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid) {
            toast.error("Please fill all the fields correctly");
            return;
        }
        try {
            const data = await createContact(formData);
            if (data.success) {
                toast.success(data.message);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Failed to create contact:", error);
            toast.error("Failed to create contact");
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input type="text" className="form-control" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                {error.name && <div className="text-danger">{error.name}</div>}
            </div>
            <div className="mb-3">
                <input type="email" className="form-control" id="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                {error.email && <div className="text-danger">{error.email}</div>}
            </div>
            <div className="mb-3">
                <input type="tel" className="form-control" id="phone" name="phone" maxLength={10} placeholder="Mobile Number" value={formData.phone} onChange={handleChange} />
                {error.phone && <div className="text-danger">{error.phone}</div>}
            </div>
            <div className="mb-3">
                <textarea className="form-control" id="message" name="message" rows={1} placeholder="Message" value={formData.message} onChange={handleChange}></textarea>
                {error.message && <div className="text-danger">{error.message}</div>}
            </div>
            <button className="btn contact-btn d-flex align-items-center gap-3" disabled={!isFormValid}>
                Send
                <span className="arrow-icon-wrapper">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </span>
            </button>
        </form>
    );
};

export default ContactForm;