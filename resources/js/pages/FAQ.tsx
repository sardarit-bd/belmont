import React, { useState } from 'react';
import { HelpCircle, Plus, Minus, Phone, MessageSquare } from 'lucide-react';
import AppHeaderLayout from "@/layouts/app/app-header-layout";


export default function App() {
  const faqs = [
    {
      question: "What are your hours of operation?",
      answer: "We're open Monday-Friday 7AM-7PM and Saturday 7AM-5PM. We're closed on Sundays."
    },
    {
      question: "Do you offer pickup and delivery services?",
      answer: "Yes! We offer free pickup and delivery for orders over $35. Orders under $35 have a $10 service fee. Schedule your pickup through our website or call us at (508) 580-4610."
    },
    {
      question: "What is your minimum order for pickup/delivery?",
      answer: "We have a $35 minimum for pickup and delivery services to ensure efficient service for all our customers."
    },
    {
      question: "How long does dry cleaning take?",
      answer: "Standard dry cleaning typically takes 2-3 business days. We also offer same-day and next-day rush services for an additional fee. Contact us for specific timing needs."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, all major credit cards (Visa, Mastercard, American Express, Discover), and debit cards. Payment is due upon completion of services."
    },
    {
      question: "Are your prices guaranteed?",
      answer: "The prices on our website are estimates. Final pricing is confirmed after garment inspection and may vary based on fabric type, condition, and special treatments required."
    },
    {
      question: "What if I'm not satisfied with the cleaning?",
      answer: "Your satisfaction is our priority. If you're not completely satisfied, please contact us within 72 hours of pickup/delivery with the garment. We'll re-clean the item at no charge or work with you to resolve the issue."
    },
    {
      question: "Do you clean wedding dresses and formal wear?",
      answer: "Yes! We specialize in wedding dress cleaning and preservation, as well as all types of formal wear. We also offer our Luxury & Enterprise services for high-end garments."
    },
    {
      question: "Can you remove all stains?",
      answer: "While we use professional stain removal techniques and have great success, we cannot guarantee complete removal of all stains. Some stains may be permanent, especially if they've been heat-set or treated improperly before coming to us."
    },
    {
      question: "What happens to items I don't pick up?",
      answer: "Items not picked up within 30 days may incur storage fees. Items unclaimed after 90 days may be donated to charity in accordance with Massachusetts state law. We'll make every effort to contact you before this happens."
    },
    {
      question: "Do you offer alterations?",
      answer: "Yes, we provide professional alteration services including hemming, taking in/letting out, and general tailoring. Turnaround time varies based on the complexity of alterations."
    },
    {
      question: "What items can't you clean?",
      answer: "We cannot clean items with heavy contamination (oil, grease, paint), items with pre-existing severe damage, or items without proper care labels. We'll inspect all items and inform you if we cannot process them."
    },
    {
      question: "How should I prepare my items for pickup?",
      answer: "Please empty all pockets, remove belts (unless they're part of the garment), and make a list of any special stains or concerns. Have items ready at the scheduled pickup time."
    },
    {
      question: "Do you offer business/corporate accounts?",
      answer: "Yes! We offer Enterprise services for businesses needing regular garment care. Contact us to discuss volume pricing and customized service plans."
    },
    {
      question: "Are you environmentally friendly?",
      answer: "We use modern, eco-friendly cleaning processes and equipment that minimize environmental impact while maintaining the highest quality standards."
    },
    {
      question: "Can I get a quote before bringing in my items?",
      answer: "Yes! You can use our online quote request form or call us at (508) 580-4610. For the most accurate quote, we recommend bringing items in for inspection."
    },
    {
      question: "What if you damage my garment?",
      answer: "While we take every precaution, if damage occurs due to our error, our liability is limited to 10 times the cleaning charge or the current fair market value, whichever is less. Please see our Terms of Service for complete details."
    },
    {
      question: "Do you clean household items like curtains and comforters?",
      answer: "Yes! We clean curtains, drapes, comforters, bedspreads, and other household textiles. Pricing varies by size and material."
    },
    {
      question: "How can I contact you?",
      answer: "Call us at (508) 580-4610, text us at (508) 718-7711, or visit us at 92 Torrey St, Brockton, MA 02301. You can also use the contact form on our website."
    },
    {
      question: "What makes Belmont Dry Cleaners different?",
      answer: "We combine Peruvian textile heritage with modern technology, treating every garment with the care and craftsmanship passed down through generations. Our family-owned business prioritizes quality, community, and customer satisfaction."
    }
  ];

  // State to track which accordion item is open
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AppHeaderLayout>
      <div className="min-h-screen bg-purple-50/20 py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-4xl space-y-12">
          
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <HelpCircle className="w-8 h-8 text-[#361b6b]" />
            </div>
            <h1 className="mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 font-serif max-w-2xl mx-auto">
              Find answers to common questions about our services, pricing, and policies. Can't find what you're looking for? Contact us!
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-purple-50 transition-colors"
                >
                  <span className="text-left pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 text-purple-600">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100 pb-6 border-t border-gray-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 font-serif leading-relaxed pr-8 pt-2">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA Section */}
          <div className="w-full bg-[#F3E9FF] rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="mb-4">
                Still Have Questions?
              </h2>
              <p className=" font-serif max-w-2xl mx-auto">
                Our friendly team is here to help! Contact us by phone, text, or visit our location in Brockton.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-3 bg-white text-[#8b24e6] rounded-lg font-serif font-medium hover:bg-gray-100 transition-colors shadow-sm flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call (508) 580-4610
              </button>
              
              <button className="w-full sm:w-auto px-8 py-3 bg-[#a855f7] text-white rounded-lg font-serif font-medium hover:bg-[#9333ea] transition-colors shadow-sm flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Text (508) 718-7711
              </button>
            </div>
          </div>

        </div>
      </div>
    </AppHeaderLayout>
  );
}