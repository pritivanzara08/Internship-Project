import React, { useState } from "react";

import '../styles/globals.css';
import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import ProductList from "@/components/product/ProductList";
import AboutUs from "@/components/sections/AboutUs";
import Gallery from "@/components/sections/Gallery"
import Testimonials from "@/components/sections/Testimonials";
import ContactUs from "@/components/sections/ContactUs";
import InquiryForm from "@/components/sections/InquiryForm";
import LocationMap from "@/components/sections/LocationMap";
import UsefulLinks from "@/components/sections/UsefulLinks";


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
      <InquiryForm />
      <LocationMap />
      <UsefulLinks />
    </>
  );
}