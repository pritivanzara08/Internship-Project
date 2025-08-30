import { useState } from "react";

import CategoryCard from "@/components/shop/CategoryCard";
import ProductList from "@/components/product/ProductList";
import AboutUs from "@/components/sections/AboutUs";
import ContactUs from "@/components/sections/ContactUs";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import UsefulLinks from "@/components/sections/UsefulLinks";
import InquiryFormPage from "./inquiry-form";
import categories from "@/data/catalog";
import '@/styles/theme.css';


export default function Home() {
  const [searchQuery] = useState('');
  const [selectedCategory] = useState('');
  return (
    <>

      <Hero />

      <div id="categories">
        <h1 className="beautiful-title">Shop by Category</h1>
        <div className="category-grid">
          {categories.map((cat, index) => (
            <CategoryCard key={cat.id} category={cat} index={index} />
          ))}
        </div>
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