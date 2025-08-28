import { useState } from "react";

import CategorySection from "@/components/sections/CategorySection";
import ProductList from "@/components/product/ProductList";
import AboutUs from "@/components/sections/AboutUs";
import ContactUs from "@/components/sections/ContactUs";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import UsefulLinks from "@/components/sections/UsefulLinks";
import '@/styles/globals.css';
import InquiryFormPage from "./inquiry-form";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <>
      {/* Add state handling for search/filter if needed */}
      <Hero />
      <div id="categories">
        <CategorySection categoryId={selectedCategory} title={"Shop by Category"} />
      </div>
      <div id="products">
        <ProductList
          category={selectedCategory || undefined}
          searchQuery={searchQuery || undefined}
          limit={!searchQuery && !selectedCategory ? 6 : undefined}
          title={searchQuery 
            ? `Results for "${searchQuery}"`
            : selectedCategory
            ? `Products by ${selectedCategory}`
            : "Featured Products"}
        />
      </div>
      <div id="about-us"><AboutUs /></div>
      <div id="gallery"><Gallery /></div>
      <div id="testimonials"><Testimonials /></div>
      <div id="contact-us"><ContactUs /></div>
      <div id="get-in-touch"><InquiryFormPage /></div>
      <div id="useful-links"><UsefulLinks /></div>
    </>
  );
}