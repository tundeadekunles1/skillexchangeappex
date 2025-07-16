import React, { useState } from "react";
import "../styles/faq.css";

const faqs = [
  {
    question: "What does Skill Bridge offer?",
    answer:
      "Our platform connects users with resources to learn and grow, providing tools and information to enhance their skills.",
  },
  {
    question: "What if i dont have any skills to share ?",
    answer:
      "Everyone has what he / she loves to do, you can publish it as a skill. No knowledge is a waste. Share what you love to do and learn the skill you have been longing for..",
  },
  {
    question: "Can i exchange my skill with more than one member?",
    answer: "Yes you can exchange your skill with more than one member.",
  },
  {
    question: "Can I access the platform on mobile?",
    answer:
      "Yes, our platform is fully responsive and accessible on mobile devices through any modern browser.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot Password' on the login page, enter your email, and follow the instructions to reset your password.",
  },
  {
    question: "Am i limited to just one member to exchange my skills with?",
    answer:
      "Click on Teaching requests on your dashboard, and the information pops out.",
  },
  {
    question: "Can I share my account with others?",
    answer:
      "Account sharing is not permitted as per our terms of service to ensure security and personalized experiences.",
  },
  {
    question: "How can i get the overview of the skills i delivered?",
    answer:
      "Click on Teaching requests on your dashboard, and the information pops out.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-grid">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleAccordion(index)}
            >
              {faq.question}
              <span className="faq-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </button>
            <div
              className={`faq-answer ${activeIndex === index ? "open" : ""}`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
