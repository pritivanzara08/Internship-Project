import { useState } from "react";

import ProductList from "@/components/product/ProductList";
import AboutUs from "@/components/sections/AboutUs";
import Categories from "@/components/sections/Categories";
import ContactUs from "@/components/sections/ContactUs";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import UsefulLinks from "@/components/sections/UsefulLinks";
import '@/styles/globals.css';


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <>
      {/* Add state handling for search/filter if needed */}
      <Hero />
      <div id="categories"><Categories searchQuery={searchQuery} category={selectedCategory} /></div>
      <div id="products"><ProductList/></div>
      <div id="about-us"><AboutUs /></div>
      <div id="gallery"><Gallery /></div>
      <div id="testimonials"><Testimonials /></div>
      <div id="contact-us"><ContactUs /></div>
      <div id="useful-links"><UsefulLinks /></div>
    </>
  );
}