// src/pages/sections/AboutUs.tsx
import React from "react";
import Image from "next/image";
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
              At our shop, we specialize in creating unique and customized gifts
              designed to make every special occasion truly memorable. From
              birthdays and anniversaries to personal milestones, our
              handcrafted items bring a touch of warmth and personalisation that
              your loved ones will cherish.
            </p>
            <p className="paragraph">
              Every product is carefully made in-house with a focus on quality,
              creativity, and attention to detail. Since most of our items are
              homemade and crafted, the production and dispatch process
              takes a time typically "10–12 days". For this reason, we
              request that orders be placed at least 15 days in advance to
              ensure a seamless experience.
            </p>
            <p className="paragraph">
              With all-India delivery and a commitment to customer satisfaction,
              we proudly offer:
              <br />– Customized gifts prepared with care and personalisation
              <br />– Reliable delivery across India
              <br />– Handmade quality through our own manufacturing process
              <br />– Transparent lead times to ensure your gift is perfect for
              every occasion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
