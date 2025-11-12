import React from "react";
import { Helmet } from "react-helmet";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Terms of Service | 360EagleWeb - Premium Backlink Services</title>
        <meta
          name="description"
          content="Read 360EagleWeb's Terms of Service for premium backlink services, SEO packages, and digital marketing solutions. Understand our policies, guarantees, and client agreements."
        />
        <meta
          name="keywords"
          content="backlink terms, SEO service agreement, link building terms, digital marketing policy, refund policy backlinks"
        />
        <link rel="canonical" href="https://360eagleweb.com/terms" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-2">
            Premium Backlink Services & SEO Solutions
          </p>
          <p className="text-lg text-blue-200">Clear terms for our eagle-eye precision backlink strategies</p>
          <div className="mt-6 text-sm text-blue-300">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-ul:text-gray-700 prose-li:text-gray-700">
            
            <div className="mb-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-lg text-gray-700 mb-0">
                <strong>Important Notice:</strong> By purchasing our backlink services, you agree to these Terms of Service. 
                Please read them carefully as they outline our policies, guarantees, and client responsibilities.
              </p>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Service Agreement
                </h2>
                <p>
                  By purchasing any backlink package from 360EagleWeb ("we", "us", "our"), you ("Client") 
                  acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                  These terms govern all our backlink and SEO services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Backlink Services Overview
                </h2>
                <p className="mb-4">
                  We provide premium backlink services including:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>High DA/PA Do-Follow Backlinks (70-90 Domain Authority)</li>
                  <li>Wiki Backlinks, Article Directories, Social Bookmarks</li>
                  <li>Press Releases, Web 2.0 Links, Authority Profile Links</li>
                  <li>Google Algorithm Safe Link Building</li>
                  <li>40 Days Ping Back Service & Search Engine Submission</li>
                </ul>
                <p className="mb-2"><strong>Service Details:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Each package includes specific number of backlinks as advertised</li>
                  <li>Delivery timelines: Demo (3 days), Standard (7 days), Enterprise (10 days)</li>
                  <li>Backlinks are built on quality, relevant websites</li>
                  <li>We use white-hat techniques only - no black-hat SEO</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Client Responsibilities
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate website URLs and target keywords</li>
                  <li>Ensure website complies with Google Webmaster Guidelines</li>
                  <li>Provide necessary access if required for analysis</li>
                  <li>Respond to communication within reasonable timeframes</li>
                  <li>Ensure website is live and accessible during service period</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                  Payment Terms
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full payment required before service commencement</li>
                  <li>All prices in Indian Rupees (₹)</li>
                  <li>Accepted payment methods: Razorpay, UPI, Bank Transfer</li>
                  <li>Demo package priced at ₹1 for testing service quality</li>
                  <li>Regular packages offered at 70% discount as advertised</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">5</span>
                  Refund & Cancellation Policy
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>7-Day Money Back Guarantee:</strong> Full refund if unsatisfied within 7 days of purchase</li>
                  <li>No refunds after backlink building process has started</li>
                  <li>Demo package (₹1) is non-refundable</li>
                  <li>Service cancellations must be requested before work begins</li>
                  <li>Chargebacks will result in permanent service termination</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">6</span>
                  Delivery & Reporting
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Delivery timelines are estimates and may vary slightly</li>
                  <li>Comprehensive white-label reports delivered via email</li>
                  <li>Reports include all backlink details and placement URLs</li>
                  <li>40-day ping back service included for faster indexing</li>
                  <li>Submission to 1020+ search engines for maximum visibility</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">7</span>
                  Performance Guarantees
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We guarantee backlink quality and placement as described</li>
                  <li>We do not guarantee specific ranking positions or timeframes</li>
                  <li>SEO results depend on multiple factors beyond our control</li>
                  <li>Typical ranking improvements seen within 2-4 weeks</li>
                  <li>We use industry best practices for optimal results</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">8</span>
                  Google Compliance
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>100% Google Algorithm Safe techniques</li>
                  <li>White-hat SEO practices only</li>
                  <li>Natural link profile building</li>
                  <li>Relevant and quality website placements</li>
                  <li>No link farms, PBNs, or spammy techniques</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">9</span>
                  Client Website Requirements
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Website must be live and accessible</li>
                  <li>No adult, gambling, or illegal content websites</li>
                  <li>No websites with existing Google penalties</li>
                  <li>Reasonable website loading speed</li>
                  <li>Mobile-friendly design preferred</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">10</span>
                  Intellectual Property
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Client retains all rights to their website content</li>
                  <li>We retain rights to our methodologies and processes</li>
                  <li>Backlink reports are provided for client use only</li>
                  <li>Client may not resell or redistribute our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">11</span>
                  Confidentiality
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Client information kept strictly confidential</li>
                  <li>Secure handling of website credentials if provided</li>
                  <li>No sharing of client data with third parties</li>
                  <li>Professional discretion maintained at all times</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">12</span>
                  Limitation of Liability
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maximum liability limited to service amount paid</li>
                  <li>Not liable for indirect or consequential damages</li>
                  <li>Not responsible for Google algorithm changes</li>
                  <li>Not liable for client website issues or downtime</li>
                  <li>Services provided "as-is" with best effort basis</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">13</span>
                  Service Modifications
                </h2>
                <p>
                  We reserve the right to modify service offerings, prices, and packages at any time. 
                  Existing clients will be honored at their purchased package terms. Significant changes 
                  will be communicated in advance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">14</span>
                  Governing Law & Disputes
                </h2>
                <p>
                  These Terms are governed by Indian laws. Any disputes shall be resolved amicably 
                  through discussion. If unresolved, the competent courts in 
                  <strong> Godda, Jharkhand</strong> shall have jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">15</span>
                  Terms Modification
                </h2>
                <p>
                  We may update these Terms periodically. Continued use of our services after changes 
                  constitutes acceptance. Major changes will be notified to existing clients.
                </p>
              </section>

              <section className="border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact & Support</h2>
                <p className="mb-2">
                  For questions about these Terms or our services:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:info@360eagleweb.com" className="text-blue-600 hover:text-blue-700 underline">
                      info@360eagleweb.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone/WhatsApp:</strong>{' '}
                    <a href="tel:+919310533973" className="text-blue-600 hover:text-blue-700 underline">
                      +91 93105 33973
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong> 120/130 Ward No 18 Fasiya Dangal Road, Godda 814133, Jharkhand, India
                  </p>
                </div>
              </section>

              <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Note:</strong> This document outlines our service terms and does not constitute legal advice. 
                  We recommend consulting with legal professionals for specific contractual needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;