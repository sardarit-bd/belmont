import React from 'react';
import { 
  FileText, 
  DollarSign, 
  UserCheck, 
  AlertCircle, 
  Truck, 
  HelpCircle, 
  Clock, 
  Scale, 
  MapPin 
} from 'lucide-react';
import AppHeaderLayout from "@/layouts/app/app-header-layout";

export default function App() {
  return (
    <AppHeaderLayout>
      <div className="min-h-screen bg-purple-50/20 py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-4xl space-y-8">
          
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              {/* Using FileText to match the document icon in Screenshot_20 */}
              <FileText className="w-8 h-8 text-[#361b6b]" />
            </div>
            <h1 className="mb-4 text-2xl md:text-3xl font-serif text-gray-900 font-medium">
              Terms of Service
            </h1>
            <p className="text-gray-600 font-serif">
              Last Updated: November 13, 2025
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">
            
            {/* Agreement to Terms */}
            <section className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed font-serif">
                By using the services of Belmont Dry Cleaners, you agree to be bound by these Terms of Service. 
                Please read these terms carefully before using our services.
              </p>
            </section>

            {/* Services Provided */}
            <section className="space-y-4">
              <h3 className="text-xl font-serif text-gray-900">Services Provided</h3>
              <p className="text-gray-600 leading-relaxed font-serif">
                Belmont Dry Cleaners provides professional dry cleaning, laundry, pressing, alterations, and related 
                garment care services. We offer both in-store and pickup/delivery options subject to availability 
                and service area.
              </p>
            </section>

            {/* Pricing and Payment */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">

                <h3 className="">Pricing and Payment</h3>
              </div>
              <ul className="space-y-3 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                <li className="pl-1">
                  <span className="font-semibold text-gray-900">Pricing:</span> All prices shown on our website are estimates and may vary based on garment condition, fabric type, and specific care requirements. Final pricing will be confirmed after inspection.
                </li>
                <li className="pl-1">
                  <span className="font-semibold text-gray-900">Payment:</span> Payment is due upon completion of services. We accept cash, credit cards, and other approved payment methods.
                </li>
                <li className="pl-1">
                  <span className="font-semibold text-gray-900">Pickup/Delivery Fees:</span> Pickup and delivery services are free for orders over $35. Orders under $35 may incur a $10 service fee.
                </li>
                <li className="pl-1">
                  <span className="font-semibold text-gray-900">Minimum Orders:</span> A $35 minimum may apply for pickup and delivery services.
                </li>
              </ul>
            </section>

            {/* Customer Responsibilities */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="">Customer Responsibilities</h3>
              </div>
              <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                <li className="pl-1">Inform us of any stains, damage, or special care requirements when dropping off items</li>
                <li className="pl-1">Empty all pockets before submitting garments (we are not responsible for items left in pockets)</li>
                <li className="pl-1">Notify us immediately if you have concerns about your order</li>
                <li className="pl-1">Pick up completed orders within 30 days (unclaimed items may be donated after 90 days)</li>
                <li className="pl-1">Provide accurate contact and address information for pickup/delivery services</li>
              </ul>
            </section>

            {/* Liability and Limitations */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                
                <h3 className="">Liability and Limitations</h3>
              </div>
              <div className=" flex items-center gap-3 bg-[#fefce8] p-4 rounded-lg border border-yellow-200">
                <AlertCircle className="w-5 h-5 text-yellow-800" />
                <p className="text-purple-900 font-serif font-medium">
                  <span className='text-semibold'>Important:</span> Please read our liability terms carefully.
                </p>
              </div>
              <ul className="space-y-3 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                <li className="pl-1">
                  <span className="font-semibold text-gray-900">Garment Inspection:</span> We inspect all garments before processing. Pre-existing damage, wear, or weak fabrics may not withstand the cleaning process.
                </li>
                <li className="pl-1">
                  <span className="font-semibold text-gray-900">Stain Removal:</span> While we use professional techniques, we cannot guarantee complete stain removal. Some stains may be permanent.
                </li>
                <li className="pl-1">
                  <span className="font-semibold text-gray-900">Fabric Damage:</span> We are not liable for damage to garments with pre-existing wear, delicate fabrics, or improperly labeled care instructions.
                </li>
                <li className="pl-1">
                  <span className="font-semibold text-gray-900">Maximum Liability:</span> Our liability is limited to 10 times the cleaning charge or the current fair market value of the garment, whichever is less.
                </li>
                <li className="pl-1">
                  <span className="font-semibold text-gray-900">Lost Items:</span> We take great care with your items, but we are not responsible for items lost due to circumstances beyond our control.
                </li>
                <li className="pl-1">
                  <span className="font-semibold text-gray-900">Buttons and Trims:</span> We are not responsible for damage to buttons, beads, sequins, or other decorative trims that may not withstand professional cleaning.
                </li>
              </ul>
            </section>

            {/* Claims and Complaints */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="">Claims and Complaints</h3>
              </div>
              <p className="text-gray-600 font-serif mb-2">To file a claim or complaint:</p>
              <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                <li className="pl-1">Claims must be made within 72 hours of pickup or delivery</li>
                <li className="pl-1">The garment in question must be presented in the same condition as received</li>
                <li className="pl-1">Contact us immediately at (508) 580-4610 or text (508) 718-7711</li>
                <li className="pl-1">We will investigate all claims promptly and work to resolve issues fairly</li>
              </ul>
            </section>

            {/* Pickup and Delivery Services */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="">Pickup and Delivery Services</h3>
              </div>
              <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                <li className="pl-1">Service area is limited to designated zones around our Brockton location</li>
                <li className="pl-1">Scheduled pickup times are approximate; delays may occur due to traffic or weather</li>
                <li className="pl-1">Items must be ready for pickup at the scheduled time</li>
                <li className="pl-1">Signature may be required for delivery</li>
                <li className="pl-1">We are not responsible for items left in unsecured locations per customer request</li>
              </ul>
            </section>

            {/* Unclaimed Items */}
            <section className="space-y-3">
              <h3 className="text-2xl font-serif text-gray-900">Unclaimed Items</h3>
              <p className="text-gray-600 leading-relaxed font-serif">
                Items not picked up within 30 days will incur storage fees. Items unclaimed after 90 days may be 
                donated to charity or disposed of in accordance with Massachusetts state law.
              </p>
            </section>

            {/* Cancellations and Refunds */}
            <section className="space-y-3">
              <h3 className="">Cancellations and Refunds</h3>
              <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                <li className="pl-1">Pickup appointments can be cancelled or rescheduled with at least 2 hours notice</li>
                <li className="pl-1">Refunds are provided at our discretion based on the nature of the issue</li>
                <li className="pl-1">We reserve the right to refuse service if terms are not met</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="space-y-3">
              <h3 className="text-2xl font-serif text-gray-900">Intellectual Property</h3>
              <p className="text-gray-600 leading-relaxed font-serif">
                All content on our website, including text, graphics, logos, and images, is the property of 
                Belmont Dry Cleaners and protected by copyright laws.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">

                <h3 className="text-2xl font-serif text-gray-900">Changes to Terms</h3>
              </div>
              <p className="text-gray-600 leading-relaxed font-serif">
                We reserve the right to modify these Terms of Service at any time. Updated terms will be posted on 
                our website with a revised "Last Updated" date.
              </p>
            </section>

            {/* Governing Law */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">

                <h3 className="text-2xl font-serif text-gray-900">Governing Law</h3>
              </div>
              <p className="text-gray-600 leading-relaxed font-serif">
                These Terms of Service are governed by the laws of the Commonwealth of Massachusetts. Any disputes 
                shall be resolved in the courts of Massachusetts.
              </p>
            </section>

            {/* Contact Us */}
            <section className="space-y-4 pt-6 border-t border-gray-100">
              <h3 className="text-2xl font-serif text-gray-900">Contact Information</h3>
              <p className="text-gray-600 font-serif">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="text-gray-800 font-serif pl-4 bg-[#f3e9ff] p-4 rounded-xl">
                <p className="text-gray-700 font-semibold">Belmont Dry Cleaners</p>
                <div className="flex items-start gap-2 mt-2">
              
                  <p>92 Torrey St, Brockton, MA 02301</p>
                </div>
                <p className="">Phone: <span className="text-purple-700">(508) 580-4610</span></p>
                <p>Text: <span className="text-purple-700">(508) 718-7711</span></p>
                <p className="mt-2 text-md text-gray-600">Hours: Monday-Friday 7AM-7PM, Saturday 7AM-5PM, Closed Sunday</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </AppHeaderLayout>
  );
}