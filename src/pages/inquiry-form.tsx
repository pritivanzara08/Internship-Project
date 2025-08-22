import React from "react";
import "@/styles/theme.css";

export default function InquiryFormPage() {
  return (
    <div id="inquiry-form" className="inquiry-form-container">
      <form className="inquiry-form">
      <h2 className="beautiful-title">Get in Touch</h2>
        {/* Row of first three inputs */}
        <div className="row-inputs">
          <div className="form-group">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Full name"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="Mobile Number"
                />
              </div>
            </div>

            {/* Message textarea spanning full width */}
            <div className="form-group full-width">
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Message"
              ></textarea>
            </div>

            {/* Submit button centered */}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
  );
}