import SecondaryHeader from "@/partials/SecondaryHeader";
import AboutHero from "@/components/AboutHero";
import OurStory from "@/components/OurStory";
import KitchenToYours from "@/components/KitchenToYours";
import WhyLoveFood from "@/components/WhyLoveFood";
import Footer from "@/partials/Footer";

export default function AboutPage() {
    return (
        <main>
            <SecondaryHeader />
            <AboutHero />
            <OurStory />
            <KitchenToYours />
            <WhyLoveFood />
            <Footer />
        </main>
    );
}
