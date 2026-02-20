import Header from "@/partials/Header";
import Hero from "@/components/Hero";
import ShopByCategory from "@/components/ShopByCategory";
import ExoticCombo from "@/components/ExoticCombo";
import Bestsellers from "@/components/Bestsellers";
import WhyVeloz from "@/components/WhyVeloz";
import CustomerFeedback from "@/components/CustomerFeedback";
import InstagramFeed from "@/components/InstagramFeed";
import GoogleReview from "@/components/GoogleReview";
import Footer from "@/partials/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ShopByCategory />
      <ExoticCombo />
      <Bestsellers />
      <WhyVeloz />
      <InstagramFeed />
      <CustomerFeedback />
      <GoogleReview />
      <Footer />
    </main>
  );
}
