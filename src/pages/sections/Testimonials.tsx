import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../../styles/theme.css';

type Testimonial = {
  id: number;
  name: string;
  rating: number;
  location: string;
  feedback: string;
  productImage: string;
  productName: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    location: "New York, USA",
    feedback: "Amazing service! The gift was perfect and arrived on time.",
    productImage: "/images/products/hamper1.jpeg",
    productName: "Personalized Mug"
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    location: "London, UK",
    feedback: "Great selection of gifts. I loved the personalized touch.",
    productImage: "/images/products/hamper1.jpeg",
    productName: "Custom T-Shirt"
  },
  {
    id: 3,
    name: "Raj Patel",
    rating: 5,
    location: "Mumbai, India",
    feedback: "Excellent quality and fast delivery. Highly recommend!",
    productImage: "/images/products/hamper1.jpeg",
    productName: "Gift Hamper"
  },
  {
    id: 4,
    name: "Emily Davis",
    rating: 5,
    location: "Sydney, Australia",
    feedback: "Amazing service! The gift was perfect and arrived on time.",
    productImage: "/images/products/hamper1.jpeg",
    productName: "Personalized Mug"
  },
  {
    id: 5,
    name: "Jane Smith",
    rating: 4,
    location: "London, UK",
    feedback: "Great selection of gifts. I loved the personalized touch.",
    productImage: "/images/products/hamper1.jpeg",
    productName: "Custom T-Shirt"
  },
  {
    id: 6,
    name: "Raj Patel",
    rating: 5,
    location: "Mumbai, India",
    feedback: "Excellent quality and fast delivery. Highly recommend!",
    productImage: "/images/products/hamper1.jpeg",
    productName: "Gift Hamper"
  }
];

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section" aria-label="Customers Review">
    <div className="section-container">
      <h2 className="beautiful-title">What Our Customers Say</h2>
      <div className="swiper-container">
        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2.3}
          loop={true}
          spaceBetween={30}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            depth: 800,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="swiper-wrapper"
          breakpoints={{
            0: { slidesPerView: 1 },
            501: { slidesPerView: 2 },
            725: { slidesPerView: 2.3 }
          }}
        >
          {testimonialsData.map((t) => (
            <SwiperSlide key={t.id} className="swiper-slide">
              <div className="testimonial-card">
              <div className="ImgHolder">
                <img src={t.productImage} alt={t.productName} />
              </div>
              <div className="ContentHolder">
                <h3 className="testimonial-product">{t.productName}</h3>
                <div className="testimonial-header">
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-rating"><Stars rating={t.rating} /></span>
                </div>
                <span className="testimonial-location">{t.location}</span>
                <p className="testimonial-feedback">{t.feedback}</p>
              </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      <div className="swiper-pagination"></div>
      </div>
  </div>
    </section>
);
}