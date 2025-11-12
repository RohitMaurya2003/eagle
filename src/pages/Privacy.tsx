import React, { useState } from "react";

const Privacy: React.FC = () => {
  const lastUpdated = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-yellow-400 text-blue-900 px-6 py-3 rounded-full text-lg font-bold mb-8 animate-bounce">
            🦅 Premium Backlink Services
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy & Policy</h1>
          <p className="text-blue-100 text-lg md:text-xl">
            How 360EagleWeb collects, uses, protects, and shares your information.
          </p>
          <p className="text-sm text-blue-200 mt-2">Last updated: {lastUpdated}</p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setActiveTab("privacy")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "privacy" 
                ? "bg-white text-blue-600 shadow-lg" 
                : "bg-blue-700 text-white hover:bg-blue-600"
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab("refund")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "refund" 
                ? "bg-white text-blue-600 shadow-lg" 
                : "bg-blue-700 text-white hover:bg-blue-600"
              }`}
            >
              Return & Refund Policy
            </button>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      {activeTab === "privacy" && (
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 space-y-10">
            {/* Intro */}
            <div>
              <p>
                This Privacy Policy explains how <strong>360EagleWeb</strong> ("we", "us", "our") collects,
                uses, discloses, and safeguards personal information when you visit our website, engage
                with our SEO campaigns, or use our backlink services. By using our website/services,
                you agree to this Policy. If you do not agree, please discontinue use.
              </p>
              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-900">
                <strong>Regulatory note:</strong> We strive to comply with applicable laws, including
                India's Digital Personal Data Protection (DPDP) Act and, where relevant, GDPR. References
                below to "lawful basis" and "data principal rights" reflect these standards.
              </div>
            </div>

            {/* What we collect */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1) Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Identity & Contact:</strong> name, email, phone, company, role.</li>
                <li><strong>Website Information:</strong> URLs, target keywords, competitor analysis data.</li>
                <li><strong>Technical:</strong> IP address, device/browser info, pages viewed, referrer URLs, session data.</li>
                <li><strong>Usage & Analytics:</strong> interactions with pages, forms, CTAs; events/pixels (GA4, etc.).</li>
                <li><strong>Marketing:</strong> preferences, consent, campaign engagement (opens, clicks, conversions).</li>
                <li><strong>Payment/Commercial:</strong> invoices, transaction metadata (processed via third-party gateways; we do not store card data).</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                Sensitive personal data is not intentionally collected. Please avoid sharing it.
              </p>
            </div>

            {/* Sources */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2) Sources of Data</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Direct:</strong> forms, emails, WhatsApp, calls, meetings.</li>
                <li><strong>Automated:</strong> cookies, tags, analytics, pixels.</li>
                <li><strong>Third-Party:</strong> ad platforms, CRM or lead gen tools you connect/provide.</li>
              </ul>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3) Cookies & Similar Technologies</h2>
              <p className="mb-2">
                We use cookies, pixels, and tags to enable site functionality, remember preferences,
                analyze performance, and measure/optimize campaigns.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Essential:</strong> required for core functionality.</li>
                <li><strong>Analytics:</strong> GA4/GTM events, traffic sources, on-site behavior.</li>
                <li><strong>Marketing:</strong> remarketing/conversion pixels (e.g., Google Ads).</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                You can manage cookies via your browser settings. Some features may not work without certain cookies.
              </p>
            </div>

            {/* How we use */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4) How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide, operate, and improve our website and backlink services.</li>
                <li>Respond to inquiries, proposals, and support requests.</li>
                <li>Plan, execute, and optimize SEO campaigns; measure performance/ROI.</li>
                <li>Personalize experiences and recommend relevant services.</li>
                <li>Security, fraud prevention, troubleshooting, and diagnostics.</li>
                <li>Legal compliance and enforcement of our Terms/Agreement.</li>
              </ul>
            </div>

            {/* Lawful basis */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5) Legal Bases / Consent</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Consent:</strong> marketing communications, non-essential cookies.</li>
                <li><strong>Contract:</strong> to deliver backlink services requested/paid for.</li>
                <li><strong>Legitimate Interest:</strong> analytics, security, product improvement.</li>
                <li><strong>Legal Obligation:</strong> taxation, accounting, compliance.</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                You may withdraw consent at any time (see "Your Rights" below).
              </p>
            </div>

            {/* Sharing */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6) How We Share Information</h2>
              <p className="mb-2">
                We do not sell personal data. We may share limited information with:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Processors/Vendors:</strong> hosting, CDN, analytics (GA4/GTM), payment gateways, project tools.</li>
                <li><strong>Partners/Sub-contractors:</strong> only as needed for agreed backlink work, under confidentiality and DP terms.</li>
                <li><strong>Legal/Compliance:</strong> when required by law or to protect rights/safety.</li>
              </ul>
            </div>

            {/* International transfer */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7) International Transfers</h2>
              <p>
                Vendors may process data in other countries. We take reasonable steps to ensure appropriate
                safeguards (e.g., contractual protections) consistent with applicable law.
              </p>
            </div>

            {/* Retention */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8) Data Retention</h2>
              <p>
                We retain data only for as long as necessary for the purposes above or as required by law.
                Typical retention: marketing contacts up to 24 months of last interaction; project records
                aligned with statutory/accounting obligations.
              </p>
            </div>

            {/* Security */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9) Security</h2>
              <p>
                We use reasonable technical and organizational measures to protect data (access controls,
                encryption in transit, least-privilege practices). No system is 100% secure; please share
                credentials via secure methods (password managers).
              </p>
            </div>

            {/* Children */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">10) Children's Privacy</h2>
              <p>
                Our services are intended for business users. We do not knowingly collect data from
                children under applicable age thresholds.
              </p>
            </div>

            {/* Your rights */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">11) Your Rights</h2>
              <p className="mb-2">
                Subject to law, you may have the right to: access, correct, update, delete, restrict or
                object to processing, withdraw consent, and request data portability.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Access/Correction:</strong> get a copy of your data or ask us to fix inaccuracies.</li>
                <li><strong>Deletion ("Right to be Forgotten"):</strong> request erasure where legally permitted.</li>
                <li><strong>Consent Management:</strong> opt-out of marketing or withdraw cookie consent.</li>
                <li><strong>Objection/Restriction:</strong> where we rely on legitimate interests.</li>
                <li><strong>Portability:</strong> receive data in a commonly used format where feasible.</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                We may verify your identity before actioning requests and may retain limited data as required by law.
              </p>
            </div>

            {/* How to exercise */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">12) How to Contact / Exercise Rights</h2>
              <p>
                Email <a className="text-blue-700 underline" href="mailto:info@360eagleweb.com">info@360eagleweb.com</a> or call{" "}
                <a className="text-blue-700 underline" href="tel:+919310533973">+91 93105 33973</a>. We aim to respond within 7 business days.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Address: 360EagleWeb, India
              </p>
            </div>

            {/* Marketing choices */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">13) Marketing Preferences</h2>
              <p>
                You can unsubscribe from emails using the footer link or by contacting us. For ads
                preferences, adjust settings in Google or your device's ad settings.
              </p>
            </div>

            {/* Third-party links */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">14) Third-Party Websites</h2>
              <p>
                Our site may link to external sites we do not control. Their privacy practices apply to
                their content and services.
              </p>
            </div>

            {/* Changes */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">15) Changes to This Policy</h2>
              <p>
                We may update this Policy from time to time. Material changes will be posted here with an
                updated "Last updated" date. Continued use signifies acceptance.
              </p>
            </div>

            {/* Summary card */}
            <div className="border rounded-xl p-5 bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Summary</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>We collect contact, usage/analytics, and project data to deliver & improve backlink services.</li>
                <li>We use cookies/pixels (GA4, Google) with consent and provide opt-outs.</li>
                <li>We don't sell personal data; we share with vetted processors/vendors as needed.</li>
                <li>You have rights to access, correct, delete, object/restrict, and withdraw consent.</li>
              </ul>
            </div>

            <p className="text-xs text-gray-500">
              Disclaimer: This template is for general guidance and not legal advice. Please review with legal counsel.
            </p>
          </div>
        </section>
      )}

      {/* Return & Refund Policy Tab */}
      {activeTab === "refund" && (
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 space-y-10">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Return & Refund Policy</h2>
              <p className="text-lg text-gray-600">
                Please read this policy carefully before purchasing our services
              </p>
            </div>

            {/* No Refund Policy */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-red-800 mb-4">🚫 Strict No Refund Policy</h3>
              <p className="text-red-700 mb-4">
                Due to the digital nature of our services and the immediate allocation of resources upon purchase, 
                <strong> we do not offer returns or refunds</strong> once a service has been purchased and work has commenced.
              </p>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-2">Why No Refunds?</h4>
                <ul className="list-disc pl-6 space-y-1 text-red-700">
                  <li>Immediate allocation of technical resources and manpower</li>
                  <li>Digital services cannot be "returned" like physical products</li>
                  <li>Backlink placement involves irreversible third-party costs</li>
                  <li>Service delivery begins immediately after payment confirmation</li>
                </ul>
              </div>
            </div>

            {/* Service Commitment */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Service Commitment</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <h4 className="font-bold text-green-800 mb-2">✅ What We Guarantee</h4>
                  <ul className="list-disc pl-6 space-y-1 text-green-700">
                    <li>Delivery of promised number of backlinks</li>
                    <li>Adherence to agreed timeline</li>
                    <li>Quality standards as described</li>
                    <li>Professional service delivery</li>
                    <li>Ongoing support and communication</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <h4 className="font-bold text-blue-800 mb-2">📞 Resolution Process</h4>
                  <ul className="list-disc pl-6 space-y-1 text-blue-700">
                    <li>Issues addressed within 24-48 hours</li>
                    <li>Service adjustments where possible</li>
                    <li>Additional support provided</li>
                    <li>Open communication channel</li>
                    <li>Dedicated account manager</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Exceptions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-yellow-800 mb-4">Limited Exceptions</h3>
              <p className="text-yellow-700 mb-4">
                In very rare circumstances, we may consider service credit or adjustments (not refunds) if:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-yellow-700">
                <li>
                  <strong>Service Not Delivered:</strong> If we completely fail to deliver any service within 
                  the promised timeframe (excluding delays beyond our control)
                </li>
                <li>
                  <strong>Technical Failure:</strong> Major technical issues that prevent service delivery 
                  (assessed case by case)
                </li>
                <li>
                  <strong>Duplicate Payment:</strong> Accidental duplicate payments for the same service
                </li>
              </ul>
              <p className="text-sm text-yellow-600 mt-4">
                * All exceptions are evaluated on a case-by-case basis and are at the sole discretion of 360EagleWeb management.
              </p>
            </div>

            {/* Before Purchase */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Before You Purchase</h3>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                <h4 className="font-bold text-purple-800 mb-2">We Recommend:</h4>
                <ul className="list-disc pl-6 space-y-2 text-purple-700">
                  <li>Start with our <strong>₹1 Demo Package</strong> to test our service quality</li>
                  <li>Clearly communicate your requirements and expectations</li>
                  <li>Ask questions before purchasing any service package</li>
                  <li>Review our service descriptions and delivery timelines</li>
                  <li>Ensure you understand the digital nature of our services</li>
                </ul>
              </div>
            </div>

            {/* Contact for Issues */}
            <div className="text-center bg-gray-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Have Concerns?</h3>
              <p className="text-gray-600 mb-4">
                We're committed to your satisfaction. If you have any issues with our service:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/919310533973" 
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  WhatsApp Support
                </a>
                <a 
                  href="mailto:info@360eagleweb.com" 
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Email Support
                </a>
                <a 
                  href="tel:+919310533973" 
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
                >
                  Call Support
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                We typically respond within 2-4 hours during business days
              </p>
            </div>

            {/* Policy Acknowledgement */}
            <div className="border-t pt-6">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-gray-600">
                  <strong>By purchasing our services, you acknowledge that you have read, understood, 
                  and agree to this No Refund Policy.</strong>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Last updated: {lastUpdated}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Privacy;