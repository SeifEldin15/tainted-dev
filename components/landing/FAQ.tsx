import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What payments method do you accept?",
    answer: "We accept major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment gateway."
  },
  {
    question: "Do you provide trials before purchasing any plans?",
    answer: "Yes, we offer a free trial period for all our plans. You can test our services risk-free before making a commitment."
  },
  {
    question: "There are any limitations on proxies?",
    answer: "Our proxy services come with fair usage policies. Specific limitations vary by plan - please check your plan details for exact specifications."
  },
  {
    question: "Do you offer proxies based on time or based on GBs?",
    answer: "We offer both time-based and bandwidth-based proxy plans. You can choose the option that best suits your needs."
  },
  {
    question: "Can I pay with Credit Card/Paypal?",
    answer: "Yes, we accept both Credit Card and PayPal payments. All transactions are secure and encrypted."
  },
  {
    question: "What's the refund policy?",
    answer: "We offer a money-back guarantee within the first 30 days of purchase if you're not satisfied with our service."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-[1330px] mx-auto p-12 p-4">
      <div className="text-center mb-12">
        <span className="text-[#00D4E1] text-sm font-medium">FAQs</span>
        <h2 className="text-3xl font-bold mt-2 text-gray-900">All your Questions, <span className="text-[#00D4E1]">Answered</span></h2>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div 
            key={index}
            className="border-b border-gray-200"
          >
            <button
              className="w-full py-5 text-left flex justify-between items-center hover:text-[#00D4E1] text-gray-900"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium">{faq.question}</span>
              <span className="transform transition-transform duration-200">
                {activeIndex === index ? '−' : '+'}
              </span>
            </button>
            {activeIndex === index && (
              <div className="pb-5 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="text-[#00D4E1] hover:text-blue-700 font-medium">
          Read all FAQs →
        </button>
      </div>
    </div>
  );
};

export default FAQ;
