import { useState } from "react";

import ProductList from "@/components/product/ProductList";
import AboutUs from "@/pages/sections/AboutUs";
import Categories from "@/pages/sections/Categories";
import ContactUs from "@/pages/sections/ContactUs";
import Gallery from "@/pages/sections/Gallery";
import Hero from "@/pages/sections/Hero";
import Testimonials from "@/pages/sections/Testimonials";
import UsefulLinks from "@/pages/sections/UsefulLinks";
import '../styles/globals.css';


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <>
      {/* Add state handling for search/filter if needed */}
      <Hero />
      <Categories searchQuery={searchQuery} category={selectedCategory} />
      <ProductList/>
      <AboutUs />
      <Gallery />
      <Testimonials />
      <ContactUs />
      <UsefulLinks />
    </>
  );
}