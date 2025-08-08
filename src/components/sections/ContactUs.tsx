import React from "react";
import "@/styles/ContactUs.css";
import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt
} from "react-icons/fa";
// const contactRef = useRef(null);
const ContactUs = () => {
  return (
    <section className="contact-us-section">
      {/* <h2>Contact Us</h2> */}
      <div className="contactUsSection">
        <h2 className="beautiful-title">Contact Us</h2>
        <div className="contactUsGrid">
          {/* Office Address */}
          <div className="contactUsItem">
            <div
              className="contactIconCircle"
              style={{ background: "#b388ff" }}
            >
              <FaMapMarkerAlt size={28} color="#fff" />
            </div>
            <h3>Our Office Address</h3>
            <p>
              123 Main Street,
              <br />
              City Name, State, 123456
              <br />
              India
            </p>
          </div>
          {/* General Enquiries */}
          <div className="contactUsItem">
            <div
              className="contactIconCircle"
              style={{ background: "#ff8a65" }}
            >
              <FaEnvelope size={28} color="#fff" />
            </div>
            <h3>General Enquiries</h3>
            <p>
              Email: <a href="mailto:info@example.com">info@example.com</a>
            </p>
          </div>
          {/* Call Us */}
          <div className="contactUsItem">
            <div
              className="contactIconCircle"
              style={{ background: "#4dd0e1" }}
            >
              <FaPhoneAlt size={28} color="#fff" />
            </div>
            <h3>Call Us</h3>
            <p>
              +91 98765 43210
              <br />
              +91 91234 56789
            </p>
          </div>
          {/* Our Timing */}
          <div className="contactUsItem">
            <div
              className="contactIconCircle"
              style={{ background: "#aed581" }}
            >
              <FaClock size={28} color="#fff" />
            </div>
            <h3>Our Timing</h3>
            <p>
              Mon - Sat: 10:00 AM - 8:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="inquiry-form-container">
          <form className="inquiry-form" >
            {/* Row of first three inputs */}
            <div className="row-inputs">
              <div className="form-group">
                {/* <label htmlFor="fullName">Full Name</label> */}
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Full name"
                  // value={formData.fullName}
                  // onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="email">Email ID</label> */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  // value={formData.email}
                  // onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="mobile">Mobile Number</label> */}
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="Mobile Number"
                  // value={formData.mobile}
                  // onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Message textarea spanning full width */}
            <div className="form-group full-width">
              {/* <label htmlFor="message">Message</label> */}
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Message"
                // value={formData.message}
                // onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Submit button centered */}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ maxWidth: "1200px", width: "100%", padding: "0 20px" }}>
            <iframe
              title="Our Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7334.832259809936!2d72.62934854395691!3d23.19150072813008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2a39c9afec9d%3A0xc7a70a342c2395fb!2sInfocity%2C%20Gandhinagar%2C%20Gujarat%20382421!5e0!3m2!1sen!2sin!4v1753961419312!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              // allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      
     
    </section>
  );
};

export default ContactUs;
