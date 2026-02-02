import React from 'react';
import { Shield, FileText, Lock, Eye } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';

export default function App() {
  return (
    <AppHeaderLayout>

        <div className="min-h-screen bg-purple-50/20 py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="w-full max-w-4xl space-y-8">
                
                {/* Header Section */}
                <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <Shield className="w-8 h-8 text-[#361b6b]" />
                </div>
                <h1 className="mb-4">
                    Privacy Policy
                </h1>
                <p className="text-gray-600">
                    Last Updated: November 13, 2025
                </p>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">
                
                {/* Introduction */}
                <section className="space-y-4">
                    <h2 className="text-5xl">Introduction</h2>
                    <p className="text-gray-600 leading-relaxed font-serif">
                    At Belmont Dry Cleaners, we respect your privacy and are committed to protecting your personal
                    information. This Privacy Policy explains how we collect, use, and safeguard your information when
                    you use our services.
                    </p>
                </section>

                {/* Information We Collect */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 ">
                    <FileText className="w-5 h-5 text-purple-700" />
                    <h3 className="">Information We Collect</h3>
                    </div>
                    <p className="text-gray-600 font-serif mb-3">We collect the following types of information:</p>
                    <ul className="space-y-3 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                    <li className="pl-1"><span className="font-semibold text-gray-900">Contact Information:</span> Name, phone number, email address, and pickup/delivery address</li>
                    <li className="pl-1"><span className="font-semibold text-gray-900">Order Information:</span> Details about garments, services requested, and special instructions</li>
                    <li className="pl-1"><span className="font-semibold text-gray-900">Payment Information:</span> Billing information and payment method details (processed securely)</li>
                    <li className="pl-1"><span className="font-semibold text-gray-900">Service History:</span> Records of past orders and preferences</li>
                    </ul>
                </section>

                {/* How We Use Your Information */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-purple-700" />
                    <h3 className="">How We Use Your Information</h3>
                    </div>
                    <p className="text-gray-600 font-serif mb-3">We use your information to:</p>
                    <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                    <li className="pl-1">Process and fulfill your dry cleaning orders</li>
                    <li className="pl-1">Schedule pickup and delivery services</li>
                    <li className="pl-1">Communicate with you about your orders and services</li>
                    <li className="pl-1">Send order confirmations, updates, and receipts</li>
                    <li className="pl-1">Improve our services and customer experience</li>
                    <li className="pl-1">Process payments securely</li>
                    <li className="pl-1">Comply with legal obligations</li>
                    </ul>
                </section>

                {/* Information Sharing */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-purple-700" />
                    <h3 className="">Information Sharing</h3>
                    </div>
                    <p className="text-gray-600 font-serif mb-3">
                    We do not sell, trade, or rent your personal information to third parties. We may share your
                    information only in the following circumstances:
                    </p>
                    <ul className="space-y-3 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                    <li className="pl-1"><span className="font-semibold text-gray-900">Service Providers:</span> Third-party vendors who assist us in operating our business (e.g., payment processors)</li>
                    <li className="pl-1"><span className="font-semibold text-gray-900">Legal Requirements:</span> When required by law or to protect our rights and safety</li>
                    <li className="pl-1"><span className="font-semibold text-gray-900">Business Transfers:</span> In the event of a merger, sale, or transfer of business assets</li>
                    </ul>
                </section>

                {/* Data Security */}
                <section className="space-y-3">
                    <h3 className="text-xl font-serif text-gray-900">Data Security</h3>
                    <p className="text-gray-600 leading-relaxed font-serif">
                    We implement appropriate technical and organizational security measures to protect your personal
                    information against unauthorized access, alteration, disclosure, or destruction. However, no method of
                    transmission over the internet or electronic storage is 100% secure.
                    </p>
                </section>

                {/* Your Rights */}
                <section className="space-y-3">
                    <h3 className="">Your Rights</h3>
                    <p className="text-gray-600 font-serif mb-3">You have the right to:</p>
                    <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                    <li className="pl-1">Access and review your personal information</li>
                    <li className="pl-1">Request corrections to inaccurate information</li>
                    <li className="pl-1">Request deletion of your information (subject to legal requirements)</li>
                    <li className="pl-1">Opt-out of marketing communications</li>
                    <li className="pl-1">Withdraw consent for data processing where applicable</li>
                    </ul>
                </section>

                {/* Cookies and Tracking */}
                <section className="space-y-3">
                    <h3 className="text-2xl font-serif text-gray-900">Cookies and Tracking</h3>
                    <p className="text-gray-600 leading-relaxed font-serif">
                    Our website may use cookies and similar tracking technologies to enhance your browsing experience.
                    You can control cookie settings through your browser preferences.
                    </p>
                </section>
                
                {/* Children's Privacy */}
                <section className="space-y-3">
                    <h3 className="text-2xl font-serif text-gray-900">Children's Privacy</h3>
                    <p className="text-gray-600 leading-relaxed font-serif">
                    Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.
                    </p>
                </section>

                {/* Changes to This Policy */}
                <section className="space-y-3">
                    <h3 className="text-2xl font-serif text-gray-900">Changes to This Policy</h3>
                    <p className="text-gray-600 leading-relaxed font-serif">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated "Last Updated" date.
                    </p>
                </section>

                {/* Contact Us */}
                <section className="space-y-4 pt-6 border-t border-gray-100">
                    <h3 className="text-2xl font-serif text-gray-900">Contact Us</h3>
                    <p className="text-gray-600 font-serif">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                    </p>
                    <div className="text-gray-800 font-serif pl-4 bg-[#f3e9ff] p-4 rounded-xl">
                    <p className="text-gray-700 font-semibold">Belmont Dry Cleaners</p>
                    <p>92 Torrey St, Brockton, MA 02301</p>
                    <p className="">Phone: <span className="text-purple-700">(508) 580-4610</span></p>
                    <p>Text: <span className="text-purple-700">(508) 718-7711</span></p>
                    </div>
                </section>

                </div>
            </div>
        </div>

    </AppHeaderLayout>
  );
}