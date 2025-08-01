import Header from "../../components/Header/Header";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Testimonials from "../../components/Testimonials/Testimonials";
import Offer from "../../components/Offer/Offer";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import FeaturedCategories from "../../components/FeaturedCategories/FeaturedCategories";
import AboutUs from "../../components/AboutUs/AboutUs";
import { Helmet } from "react-helmet-async";


export default function Home() {

  return (
    <>
    <Helmet>
      <title>Home Page | Shop Cart</title>
      <meta name="description" content="Welcome to our website" />
    </Helmet>
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto py-12">
        <AboutUs/>

        <FeaturedProducts/>

        <FeaturedCategories/>
        
        <Offer/>

        <Testimonials />

        <HowItWorks />
      </main>
    </div>
    </>
  );
}