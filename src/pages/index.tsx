import { useState } from "react";

import ProductList from "@/components/product/ProductList";
import AboutUs from "@/components/sections/AboutUs";
import Categories from "@/components/sections/Categories";
import ContactUs from "@/components/sections/ContactUs";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import UsefulLinks from "@/components/sections/UsefulLinks";
import '../styles/globals.css';


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <>
      {/* Add state handling for search/filter if needed */}
      <Hero />
      <Categories />
      <ProductList searchQuery={searchQuery} category={selectedCategory} />
      <AboutUs />
      <Gallery />
      <Testimonials />
      <ContactUs />
      <UsefulLinks />
    </>
  );
}