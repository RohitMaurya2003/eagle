import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Instagram, Linkedin, Facebook, Check, Star, Zap, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hello 360EagleWeb! 

*New Contact Form Submission*

*Name:* ${formData.fullName}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service Interested:* ${formData.service}
*Message:* ${formData.message}

I would like to discuss backlink services for my website.`;

    const whatsappUrl = `https://wa.me/919310533973?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const services = [
    'EAGLE DEMO Package - 10 Premium Backlinks',
    'EAGLE START Package - 300 Premium Backlinks',
    'EAGLE PRO Package - 750 Premium Backlinks',
    'EAGLE BUSINESS Package - 1200 Premium Backlinks',
    'EAGLE ENTERPRISE Package - 2000+ Premium Backlinks',
    'EAGLE PREMIUM Package - 5000+ Premium Backlinks',
    'Google Safe Backlink Audit',
    'Content-Based Link Building',
    'Local SEO Backlinks',
    'Authority Building Service',
    'Technical SEO Audit',
    'Keyword Research & Strategy',
    'Monthly SEO Performance Tracking',
    'Custom Package',
    'Other Service'
  ];

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      content: '+91 93105 33973',
      link: 'tel:+919310533973'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      content: 'info@360eagleweb.com',
      link: 'mailto:info@360eagleweb.com'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Address',
      content: 'India',
      link: '#'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Working Hours',
      content: '24/7 Available',
      link: '#'
    }
  ];

  const serviceHighlights = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: '100% Google Safe',
      description: 'All strategies comply with Google guidelines'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Fast Results',
      description: '3-10 day delivery with quick indexing'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Premium Quality',
      description: 'High-quality backlinks from authoritative sources'
    },
    {
      icon: <Check className="h-8 w-8" />,
      title: 'Proven Results',
      description: 'Ranking improvements within 2-4 weeks'
    }
  ];

  return (
    <div>
      {/* ✅ SEO Component */}
      <Helmet>
        <title>Contact 360EagleWeb | Premium Backlink Services & SEO Solutions</title>
        <meta
          name="description"
          content="Contact 360EagleWeb for premium backlink services, SEO packages, and digital marketing solutions. Get 70% OFF on all backlink packages with 5% extra on advance payment."
        />
        <meta
          name="keywords"
          content="contact 360EagleWeb, backlink services, SEO packages, premium backlinks, digital marketing India, link building services, SEO company"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://360eagleweb.com/contact" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact 360EagleWeb – Premium Backlink Services & SEO Solutions" />
        <meta property="og:description" content="Get in touch with 360EagleWeb for premium backlink services, SEO packages, and guaranteed ranking improvements. 70% OFF + 5% Extra on Advance Payment." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://360eagleweb.com/contact" />
        <meta property="og:image" content="https://360eagleweb.com/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact 360EagleWeb | Premium Backlink Services" />
        <meta name="twitter:description" content="Reach 360EagleWeb for premium backlink services, SEO packages, and guaranteed ranking improvements. Get 70% OFF on all packages." />
        <meta name="twitter:image" content="https://360eagleweb.com/og-image.jpg" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "360EagleWeb",
            "url": "https://360eagleweb.com",
            "logo": "https://360eagleweb.com/logo.png",
            "description": "Premium Backlink Services & SEO Solutions",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91 93105 33973",
              "contactType": "customer support",
              "email": "info@360eagleweb.com",
              "areaServed": "IN",
              "availableLanguage": "English"
            },
            "sameAs": [
              "https://www.facebook.com/360EagleWeb",
              "https://www.instagram.com/360eagleweb/",
              "https://www.linkedin.com/company/360eagleweb/"
            ]
          })}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-yellow-400 text-blue-900 px-6 py-3 rounded-full text-lg font-bold mb-8 animate-bounce">
              🦅 Premium Backlink Services
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In <span className="text-yellow-400">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Ready to boost your website rankings? Let's discuss your backlink strategy and create amazing results together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/919310533973?text=Hello 360EagleWeb, I want to discuss backlink services for my website"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 flex items-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Quick WhatsApp Chat</span>
              </a>
              <a
                href="tel:+919310533973"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 flex items-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose 360EagleWeb?
            </h2>
            <p className="text-xl text-gray-600">
              Premium backlink services that actually work and drive real results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceHighlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Get Your Custom Backlink Strategy
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll create a personalized backlink strategy for your website. Get 70% OFF + 5% Extra on Advance Payment!
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Interested *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Website & Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your website, target keywords, current rankings, and specific goals..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Get Free SEO Consultation</span>
                </button>

                <p className="text-sm text-gray-500 text-center">
                  By clicking "Get Free SEO Consultation", you'll connect with our SEO experts via WhatsApp for immediate assistance.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-8">
                Reach out to us through any of these channels. We're always here to help you boost your website rankings!
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      {info.link !== '#' ? (
                        <a
                          href={info.link}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Offer Banner */}
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-xl mb-8">
                <h3 className="font-bold text-blue-900 text-lg mb-2">🎯 Special Limited Time Offer</h3>
                <p className="text-blue-900 text-sm">
                  <strong>70% OFF</strong> on all backlink packages + <strong>5% Extra OFF</strong> on advance payment!
                  <br />
                  ⚡ Demo package starts at just <strong>₹1</strong>
                </p>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://wa.me/919310533973"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/360eagleweb/"
                    className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-lg transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/360eagleweb/"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/360EagleWeb"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="mt-8 bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Quick Response Guarantee
                </h3>
                <p className="text-green-700 text-sm">
                  ⚡ WhatsApp messages: Instant response during business hours
                  <br />
                  📧 Email inquiries: Within 2-4 hours
                  <br />
                  📞 Phone calls: Available 24/7 for urgent queries
                  <br />
                  🎯 Free SEO consultation: 30 minutes detailed analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our backlink services
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">How quickly will I see results from your backlink services?</h3>
              <p className="text-gray-600">Most clients see ranking improvements within 2-4 weeks of service delivery. Our fast indexing process ensures quick visibility in search results.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Are your backlink strategies 100% Google safe?</h3>
              <p className="text-gray-600">Yes! All our backlink strategies strictly comply with Google's Webmaster Guidelines. We use white-hat techniques that build natural, sustainable link profiles.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept UPI, bank transfers, credit/debit cards, and digital wallets. Get 5% extra discount on advance payments!</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Do you provide detailed reports?</h3>
              <p className="text-gray-600">Absolutely! We provide comprehensive reports showing all backlinks built, indexing status, and ranking progress throughout the campaign.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Can I start with a small package to test your service?</h3>
              <p className="text-gray-600">Yes! Our EAGLE DEMO package starts at just ₹1 with 10 premium backlinks - perfect for testing our service quality risk-free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Boost Your Rankings?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't wait! Get premium backlink services at 70% OFF + 5% Extra on Advance Payment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919310533973?text=Hello 360EagleWeb, I'm ready to boost my website rankings with your backlink services!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Start with 70% OFF</span>
            </a>
            <a
              href="tel:+919310533973"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call: +91 93105 33973</span>
            </a>
          </div>
          <p className="text-blue-200 mt-8 text-lg">
            🚀 Limited Time Offer - Book Your Package Today!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;