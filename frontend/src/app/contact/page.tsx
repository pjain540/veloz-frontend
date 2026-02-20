import React from 'react';
import SecondaryHeader from '@/partials/SecondaryHeader';
import Footer from '@/partials/Footer';
import Link from 'next/link';
import ContactSection from '@/components/ContactSection';
import ContactAddressDetail from '@/components/ContactAddressDetail';
import GoogleReview from '@/components/GoogleReview';

const ContactPage = () => {
    return (
        <main>
            <SecondaryHeader />
            <ContactSection />
            <ContactAddressDetail />
            <GoogleReview />
            <Footer />
        </main>
    );
};

export default ContactPage;