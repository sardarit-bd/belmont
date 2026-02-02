import React from 'react';
import { 
  DollarSign, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  RefreshCcw, 
  Truck, 
  Scissors, 
  ShieldAlert, 
  HelpCircle,
  MapPin 
} from 'lucide-react';
import AppHeaderLayout from "@/layouts/app/app-header-layout";

export default function App() {
  return (
    <AppHeaderLayout>
      <div className="min-h-screen bg-gradient-to-br from-white via-white to-[#F4E9FF] py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-4xl space-y-8">
          
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <DollarSign className="w-8 h-8 text-[#361b6b]" />
            </div>
            <h1 className="mb-4">
              Refund Policy
            </h1>
            <p className="text-gray-600 font-serif">
              Last Updated: November 13, 2025
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">
            
            {/* Our Commitment */}
            <section className="space-y-4">
              <h2 className="text-4xl font-serif text-gray-900 leading-tight">
                Our Commitment to Customer Satisfaction
              </h2>
              <p className="text-gray-600 leading-relaxed font-serif">
                At Belmont Dry Cleaners, we stand behind the quality of our work. If you're not completely satisfied 
                with our services, we will work with you to make it right. This refund policy outlines our procedures 
                for addressing concerns and processing refunds.
              </p>
            </section>

            {/* Satisfaction Guarantee */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-purple-700" />
                <h3 className="text-xl font-serif text-gray-900 font-medium">Satisfaction Guarantee</h3>
              </div>
              <p className="text-gray-600 font-serif mb-2 pl-9">
                We guarantee the quality of our cleaning services. If you are not satisfied with the results, we will:
              </p>
              <ul className="space-y-2 list-disc pl-14 text-gray-600 font-serif marker:text-gray-400">
                <li className="pl-1">Re-clean the item at no additional charge</li>
                <li className="pl-1">Apply additional treatments if necessary</li>
                <li className="pl-1">Work with you to resolve the issue to your satisfaction</li>
              </ul>
            </section>

            {/* Refund Eligibility */}
            <section className="space-y-4">
              <h3 className="font-serif text-gray-900">Refund Eligibility</h3>
              <p className="text-gray-600 font-serif">Refunds may be issued under the following circumstances:</p>
              
              <div className="bg-purple-50/50 rounded-xl p-6 space-y-4 border border-purple-100">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-700 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 font-serif"><span className="font-semibold text-gray-900">Service Not Completed:</span> If we are unable to complete the requested service</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-700 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 font-serif"><span className="font-semibold text-gray-900">Damage Due to Our Error:</span> If garment damage occurs due to our negligence (subject to liability limits)</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-700 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 font-serif"><span className="font-semibold text-gray-900">Service Error:</span> If incorrect services were performed on your garment</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-700 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 font-serif"><span className="font-semibold text-gray-900">Cancelled Before Processing:</span> If you cancel your order before we begin processing</p>
                </div>
              </div>
            </section>

            {/* Non-Refundable Situations */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-serif text-gray-900 font-medium">Non-Refundable Situations</h3>
              </div>
              <p className="text-gray-600 font-serif mb-2 pl-9">
                Refunds will NOT be issued in the following circumstances:
              </p>
              <ul className="space-y-3 list-disc pl-14 text-gray-600 font-serif marker:text-gray-400">
                <li className="pl-1">Pre-existing damage, wear, or weak fabrics that failed during cleaning</li>
                <li className="pl-1">Garments with incorrect or missing care labels</li>
                <li className="pl-1">Stains that cannot be removed (we will inform you before processing if a stain is likely permanent)</li>
                <li className="pl-1">Damage to buttons, beads, sequins, or other decorative elements that cannot withstand professional cleaning</li>
                <li className="pl-1">Color bleeding or fading due to garment defects or improper manufacturing</li>
                <li className="pl-1">Services already completed to satisfaction</li>
                <li className="pl-1">Customer change of mind after services are completed</li>
                <li className="pl-1">Items not picked up within the designated timeframe</li>
              </ul>
            </section>

            {/* How to Request a Refund */}
            <section className="space-y-4">
              <h3 className="text-xl font-serif text-gray-900">How to Request a Refund</h3>
              <ol className="space-y-4 list-decimal pl-5 text-gray-600 font-serif marker:font-semibold marker:text-gray-900">
                <li className="pl-2">
                  <span className="font-semibold text-gray-900">Contact Us Promptly:</span> All refund requests must be made within 72 hours of pickup or delivery. Contact us at (508) 580-4610 or text (508) 718-7711.
                </li>
                <li className="pl-2">
                  <span className="font-semibold text-gray-900">Provide Details:</span> Explain the issue clearly and provide your order information.
                </li>
                <li className="pl-2">
                  <span className="font-semibold text-gray-900">Return the Item:</span> The garment must be returned in the condition received (unworn and in our packaging) for inspection.
                </li>
                <li className="pl-2">
                  <span className="font-semibold text-gray-900">Inspection:</span> We will inspect the item and review your concern.
                </li>
                <li className="pl-2">
                  <span className="font-semibold text-gray-900">Resolution:</span> We will either re-clean the item, issue a refund, or provide store credit based on the situation.
                </li>
              </ol>
            </section>

            {/* Refund Processing Time */}
            <section className="space-y-4">
              <h3 className="font-serif text-gray-900">Refund Processing Time</h3>
              <p className="text-gray-600 font-serif mb-2">Once a refund is approved:</p>
              <ul className="space-y-3 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                <li className="pl-1"><span className="font-semibold text-gray-900">Cash Payments:</span> Refunds issued immediately upon approval</li>
                <li className="pl-1"><span className="font-semibold text-gray-900">Credit/Debit Card Payments:</span> Refunds processed within 3-5 business days and may take an additional 5-10 business days to appear on your statement</li>
                <li className="pl-1"><span className="font-semibold text-gray-900">Store Credit:</span> Issued immediately and valid for one year from issue date</li>
              </ul>
            </section>

            {/* Partial Refunds */}
            <section className="space-y-3">
              <h3 className="text-2xl font-serif text-gray-900">Partial Refunds</h3>
              <p className="text-gray-600 leading-relaxed font-serif">
                In some cases, we may issue partial refunds if only a portion of your order is affected by an issue, or if 
                the issue can be partially resolved. Partial refunds will be calculated based on the specific circumstances.
              </p>
            </section>

            {/* Pickup/Delivery Fees */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-gray-900">Pickup/Delivery Fees</h3>
              </div>
              <p className="text-gray-600 font-serif mb-2">Pickup and delivery fees are generally non-refundable unless:</p>
              <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                <li className="pl-1">We fail to arrive at the scheduled pickup time</li>
                <li className="pl-1">The entire order is cancelled before pickup occurs</li>
                <li className="pl-1">There is an error on our part in scheduling or routing</li>
              </ul>
            </section>

            {/* Alteration Services */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-serif text-gray-900">Alteration Services</h3>
              </div>
              <p className="text-gray-600 leading-relaxed font-serif">
                Alterations are custom services and are generally non-refundable once completed. If you are not 
                satisfied with an alteration, we will make reasonable adjustments at no charge. Please try on altered 
                items before leaving our location when possible.
              </p>
            </section>

            {/* Damage Liability */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-serif text-gray-900">Damage Liability</h3>
              </div>
              <p className="text-gray-600 leading-relaxed font-serif">
                As stated in our Terms of Service, our maximum liability for damaged items is limited to 10 times the 
                cleaning charge or the current fair market value of the garment, whichever is less. This limitation 
                applies to all refund and compensation situations.
              </p>
            </section>

             {/* Disputes */}
             <section className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-serif text-gray-900">Disputes</h3>
              </div>
              <p className="text-gray-600 leading-relaxed font-serif">
                If you disagree with our refund decision, you may request a review by our management team. We will 
                make every effort to resolve disputes fairly and maintain our reputation for excellent customer service.
              </p>
            </section>

            {/* Contact Us */}
            <section className="space-y-4 pt-6 border-t border-gray-100">
              <h3 className="text-2xl font-serif text-gray-900">Contact Us</h3>
              <p className="text-gray-600 font-serif">
                For refund requests or questions about this policy:
              </p>
              <div className="text-gray-800 font-serif pl-4 bg-[#FAF5FF] p-6 rounded-xl border border-purple-50">
                <p className="text-gray-900 font-bold mb-2">Belmont Dry Cleaners</p>
                <div className="flex items-start gap-2 text-gray-700">
                  <p>92 Torrey St, Brockton, MA 02301</p>
                </div>
                <p className="text-gray-700">Phone: <span className="text-purple-700">(508) 580-4610</span></p>
                <p className="text-gray-700">Text: <span className="text-purple-700">(508) 718-7711</span></p>
                <p className="mt-2 text-md text-gray-600">Hours: Monday-Friday 7AM-7PM, Saturday 7AM-5PM, Closed Sunday</p>
              </div>
            </section>

          </div>
          
          {/* Bottom Note */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <p className="text-gray-700 font-serif text-sm md:text-base">
              <span className="font-bold text-gray-900">Note:</span> This refund policy is part of our Terms of Service. By using our services, you agree to these refund terms and conditions.
            </p>
          </div>

        </div>
      </div>
    </AppHeaderLayout>
  );
}