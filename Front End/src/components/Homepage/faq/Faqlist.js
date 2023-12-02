import React from "react";
import Faq from "./Faq";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Open Traffiino website on any web browser, then create an account with your email address and mobile phone number. A payment method is also needed before you can request a ride.",
  },
  {
    question: "Is Traffiino available in my city?",
    answer:
      "You can find Traffiino in more than 10,000 cities around the world.",
  },
  {
    question: "How do I request a ride?",
    answer:
      "When you’re ready to go, open the app and enter your destination. Then choose the ride option that best suits your needs. Confirm your pickup by tapping Confirm Pickup.",
  },
  {
    question: "Can I use Traffiino without a smartphone?",
    answer:
      "Yes, in certain markets you can request a ride by signing in to traffiino.com.",
  },
];

const FaqList = () => {
  return (
    <div
      style={{
        padding: "90px 0",
        borderTop: "1px solid gainsboro",
        margin: "90px 0",
      }}
    >
      <h1 style={{ fontWeight: "bold", padding: "0px 45px" }}>
        Frequently asked questions
      </h1>
      <div style={{ padding: "10px 75px" }}>
        {faqs.map((c) => (
          <Faq question={c.question} answer={c.answer} />
        ))}
      </div>
    </div>
  );
};

export default FaqList;
