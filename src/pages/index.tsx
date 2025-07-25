import React, { useState } from "react";
import ProductList from "../components/product/ProductList";
import '../styles/globals.css';
import Link from "next/dist/client/link";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Welcome to the Gift-Article Store</h1>
        <p className="hero-subtitle">Find the best customized gifts and products for your special ones!</p>
        <div className="hero-buttons">
          <button className="shop-now-btn">Shop Now</button>
          <button className="learn-more-btn">Learn More</button>
        </div>
      </section>
      {/* 2. Category / Catalogue */}
      <section id="categories" className="category-section">
        <h2>Product Categories</h2>
        {/* Add category filters or links here */}
        <Link href="#products">View Product Catalog</Link>
      </section>

      {/* 3. Products */}
      <section id="products" className="product-list-section">
        <h2>Our Products</h2>
        <ProductList searchQuery={searchQuery} category={selectedCategory} />
      </section>

      {/* 4. About Us */}
      <section id="about-us" className="about-section">
        <AboutUs />
      </section>

      {/* 5. Gallery */}
      {/* <section id="gallery" className="gallery-section">
        <Gallery />
      </section> */}

      {/* 6. Testimonials */}
      {/* <section id="testimonials" className="testimonials-section">
        <Testimonials />
      </section> */}

      {/* 7. Contact Us */}
      {/* <section id="contact" className="contact-section">
        <ContactUs />
      </section> */}

      {/* 8. Inquiry Form */}
      {/* <section id="inquiry" className="inquiry-section">
        <InquiryForm />
      </section> */}

      {/* 9. Location Map */}
      {/* <section id="location" className="location-section">
        <LocationMap />
      </section> */}

      {/* 10. Useful Links / Footer Links */}
      {/* <section id="useful-links" className="useful-links-section">
        <UsefulLinks />
      </section> */}

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}