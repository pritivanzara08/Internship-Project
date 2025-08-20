import React, { use, useCallback, useEffect, useState } from 'react';
import "../../styles/theme.css";

type Slide = {
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: "/images/giftbackground.jpg",
    title: "Find Your Perfect Gift Options Here",
    description: "Explore a wide range of personalized gifts for every occasion."
  },
  {
    image: "/images/hamper.jpg",
    title: "Customized Hampers for Every Occasion",
    description: "Delight your loved ones with our bespoke gift hampers."
  },
  {
    image: "/images/giftbackground.jpg",
    title: "Searching for the Perfect Gift?",
    description: "Give us your requirements and we'll find the perfect gift for you!"
  },
  {
    image: "/images/hamper.jpg",
    title: "For Which Occasion?",
    description: "Let us help you choose the perfect hamper for your special event."
  }
  //add more slides as needed
];

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  //auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, []);

  //keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goPrev();
      } else if (event.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goPrev, goNext]);

  return (
    <section className="hero" aria-label="Hero Carousel">
      <div className="hero-slider" role="region" aria-roledescription="slide">
        {slides.map((s,i) => (
          <div key={i} className={i === index ? `slide active` : `slide`}
            style={{backgroundImage: `url(${s.image})`}}>
            <div className="slide-content">
              <h2 className="hero-title">{s.title}</h2>
              {s.description && <p className="subtitle">{s.description}</p>}
            </div>
          </div>
        ))}

        <button aria-label="Previous Slide" className="arrow-prev" onClick={goPrev}>
          &lt;
        </button>
        <button aria-label="Next Slide" className="arrow-next" onClick={goNext}>
          &gt;
        </button>

        <div className='slider-dots' aria-label='Slide indicators'>
          {slides.map((_, idx) => (
            <button key={idx} className={idx === index ? 'dot activeDot' : 'dot'} onClick={() => setIndex(idx)}
             aria-label={`Go to Slide ${idx + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
