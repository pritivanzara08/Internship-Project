// src/pages/sections/AboutUs.tsx
import React from 'react';
import Image from 'next/image';
import "../../styles/theme.css";

export default function AboutUs() {
  return (
    <section className="aboutSection">
      <div className="section-container">
      <div className="contentWrapper">
        <div className="imagePanel">
          <Image
            src="/images/hamper.jpg" // replace with your actual image path
            alt="Gift box with chocolates"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="textPanel">
          <h2 className="beautiful-title">About Us</h2>
          <p className="paragraph">
            My shop provides all types of customised items which customers can use to gift someone for their special occasions. We provide all-India delivery and we mostly offer homemade items with our own manufacturing, which means production and dispatch times can be longer. That’s why orders take at least 10–12 days to make or dispatch. This also means we accept orders only when planning at least 15 days ahead for customers who want:
          </p>
          <p className="paragraph">
            - Customised gifts prepared with care and personalisation. - Timely delivery across India. - Handmade quality with our own manufacturing process. - Transparent lead times to ensure every gift is perfect for the occasion.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}