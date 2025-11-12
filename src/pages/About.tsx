import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Company stats
  const stats = [
    { number: "1000+", label: "Happy Clients", icon: "😊", delay: "0s" },
    { number: "1500+", label: "Projects Delivered", icon: "🚀", delay: "0.1s" },
    { number: "3+", label: "Years Experience", icon: "⏳", delay: "0.2s" },
    { number: "270%", label: "Avg. Client Growth", icon: "📈", delay: "0.3s" },
  ];

  // Core values
  const values = [
    {
      icon: "🦅",
      title: "Eagle-Eye Precision",
      description: "We target the most valuable backlinks with surgical precision, ensuring maximum impact on your search rankings.",
      delay: "0s"
    },
    {
      icon: "🛡️",
      title: "Google Safe",
      description: "100% white-hat techniques that comply with Google's guidelines, protecting your website from penalties.",
      delay: "0.1s"
    },
    {
      icon: "⚡",
      title: "Fast Results",
      description: "Quick indexing and rapid ranking improvements with our super-fast backlink delivery system.",
      delay: "0.2s"
    },
    {
      icon: "📊",
      title: "Transparent Reporting",
      description: "Comprehensive reports showing every backlink placed, with detailed analytics and performance tracking.",
      delay: "0.3s"
    },
  ];

  // Work process
  const process = [
    {
      step: "01",
      title: "Package Selection",
      description: "Choose the perfect backlink package that matches your website's needs and budget.",
      icon: "📦",
      delay: "0s"
    },
    {
      step: "02",
      title: "Secure Payment",
      description: "Safe & secure payment through our trusted Razorpay gateway with instant confirmation.",
      icon: "💳",
      delay: "0.2s"
    },
    {
      step: "03",
      title: "Details Submission",
      description: "Provide your website URLs and target keywords through our simple order form.",
      icon: "📝",
      delay: "0.4s"
    },
    {
      step: "04",
      title: "Backlink Delivery",
      description: "Receive comprehensive report with all placed backlinks and performance tracking.",
      icon: "📊",
      delay: "0.6s"
    }
  ];

  // Achievements
  const achievements = [
    { number: "50K+", label: "Backlinks Placed", icon: "🔗", delay: "0s" },
    { number: "1000+", label: "Websites Ranked", icon: "🏆", delay: "0.1s" },
    { number: "98%", label: "Client Satisfaction", icon: "⭐", delay: "0.2s" },
    { number: "4 Weeks", label: "Avg. Results Time", icon: "⚡", delay: "0.3s" }
  ];

  // Testimonials
  const testimonials = [
    {
      text: "360EagleWeb's demo package convinced me to go for their premium service. My website jumped from page 5 to page 1 in just 4 weeks! The backlink quality is exceptional.",
      author: "Rajesh Kumar",
      company: "E-commerce Store Owner",
      rating: 5,
      delay: "0s"
    },
    {
      text: "Professional service with transparent reporting. I can see every backlink they placed and my organic traffic increased by 200% in 6 weeks. Highly recommended!",
      author: "Priya Sharma", 
      company: "Blogger & Content Creator",
      rating: 5,
      delay: "0.1s"
    },
    {
      text: "The Eagle Pro package transformed my local business website. We now appear on Google's first page for all major local keywords. Great value for money!",
      author: "Amit Patel",
      company: "Local Business Owner",
      rating: 5,
      delay: "0.2s"
    }
  ];

  // Why choose us points
  const whyChooseUs = [
    {
      icon: "💰",
      title: "Most Affordable",
      description: "Premium backlink services starting from just ₹1 for demo. No hidden costs or recurring charges.",
      delay: "0s"
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      description: "Quick 3-10 days delivery with super fast indexing and ping back services.",
      delay: "0.1s"
    },
    {
      icon: "🎯",
      title: "Targeted Strategy",
      description: "Eagle-eye precision in targeting relevant and high-authority backlinks for your niche.",
      delay: "0.2s"
    },
    {
      icon: "📊",
      title: "Detailed Reports",
      description: "Comprehensive white-label reports showing all placed backlinks with analytics.",
      delay: "0.3s"
    },
    {
      icon: "🛡️",
      title: "100% Safe",
      description: "Google algorithm safe techniques that protect your website from penalties.",
      delay: "0.4s"
    },
    {
      icon: "🏆",
      title: "Proven Results",
      description: "1000+ satisfied clients and 1500+ successful backlink campaigns delivered.",
      delay: "0.5s"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About 360EagleWeb | Premium Backlink Services & SEO Agency</title>
        <meta
          name="description"
          content="Meet 360EagleWeb: India's trusted backlink service provider. With 1000+ clients and 1500+ projects, we deliver premium dofollow backlinks from ₹1. 3+ years of proven SEO experience."
        />
        <meta
          name="keywords"
          content="about 360EagleWeb, backlink services, SEO company, dofollow backlinks, premium backlinks, affordable SEO, link building agency, Google safe backlinks"
        />
        <link rel="canonical" href="https://360eagleweb.com/about" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "360EagleWeb",
            "url": "https://360eagleweb.com",
            "logo": "https://360eagleweb.com/logo.png",
            "description": "A leading backlink service provider specializing in premium dofollow backlinks and SEO services.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "India",
              "addressCountry": "IN"
            },
            "areaServed": "Worldwide",
            "founder": {
              "@type": "Person",
              "name": "Vivek Singh"
            },
            "sameAs": []
          })}
        </script>
      </Helmet>

      {/* === HERO SECTION === */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-600 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 bg-cyan-400 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-400 rounded-full blur-xl animate-ping"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-yellow-400 text-blue-900 px-6 py-3 rounded-full text-lg font-bold mb-8 animate-bounce">
            🦅 India's #1 Backlink Service Provider
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
            About <span className="text-yellow-400">360EagleWeb</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-blue-100 leading-relaxed animate-fade-in-up delay-300">
            We are a <strong className="text-yellow-400">premium backlink service agency</strong>, 
            helping <strong>1000+ websites</strong> achieve higher Google rankings through professional 
            <strong> dofollow backlinks, SEO optimization</strong> and 
            <strong> white-hat link building</strong> strategies at unbeatable prices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-500">
            <Link
              to="/services"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-2xl shadow-yellow-400/25"
            >
              <span>View Our Packages</span>
            </Link>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm transform transition-all duration-500 hover:scale-110"
                style={{animationDelay: stat.delay}}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-yellow-400">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === OUR STORY SECTION === */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded with a clear mission, <strong className="text-blue-600">360EagleWeb</strong> emerged to solve a critical 
                  problem in the SEO industry: <em className="text-blue-600">overpriced, low-quality backlink services</em> that 
                  often put websites at risk with Google penalties.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We built 360EagleWeb to provide <strong>transparent, results-driven backlink services</strong> 
                  at prices that make sense for businesses of all sizes.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we're proud to have served <strong className="text-blue-600">1000+ websites</strong> worldwide, 
                  delivering <strong className="text-blue-600">1500+ successful backlink campaigns</strong> that have 
                  helped businesses achieve <strong>page 1 Google rankings</strong> and significant organic growth.
                </p>
              </div>
              
              <div className="mt-8">
                <Link
                  to="/services"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-center inline-block"
                >
                  View Packages
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 animate-fade-in-up delay-300">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-lg group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === MISSION & VISION === */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving website rankings and organic growth through premium backlink strategies and proven SEO methodologies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To empower websites of all sizes with <strong className="text-blue-600">affordable, high-quality backlink services</strong>. 
                We believe every website deserves access to premium 
                <strong> dofollow backlinks and SEO strategies</strong> that deliver 
                measurable ranking improvements and sustainable organic growth.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up delay-200">
              <div className="text-5xl mb-6">🦅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To become the world's most trusted <strong className="text-blue-600">backlink service provider</strong>, 
                recognized for delivering exceptional <strong>link building and SEO services</strong> 
                that help websites dominate search rankings. We aim to be the first choice for 
                businesses seeking reliable ranking improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === CORE VALUES === */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The fundamental principles that guide every backlink campaign we deliver</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 text-center group animate-fade-in-up"
                style={{animationDelay: value.delay}}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === WHY CHOOSE US === */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose 360EagleWeb?</h2>
            <p className="text-xl text-gray-600">Discover what sets us apart from other backlink service providers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((point, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group animate-fade-in-up"
                style={{animationDelay: point.delay}}
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{point.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{point.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === OUR PROCESS === */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Work Process</h2>
            <p className="text-xl text-gray-600">A systematic approach that ensures success for every backlink campaign</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 text-center group animate-fade-in-up"
                style={{animationDelay: step.delay}}
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{step.icon}</div>
                <div className="text-2xl font-bold text-blue-600 mb-2">{step.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === ACHIEVEMENTS === */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl text-blue-100">Milestones that showcase our commitment to excellence</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="text-center transform transition-all duration-500 hover:scale-110 animate-fade-in-up"
                style={{animationDelay: achievement.delay}}
              >
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">{achievement.number}</div>
                <div className="text-blue-100 text-sm md:text-base">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real success stories from websites we've helped rank higher</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                style={{animationDelay: testimonial.delay}}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-blue-600 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Soar Your Rankings?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join <strong className="text-yellow-400">1000+ successful websites</strong> that trust 360EagleWeb for their 
            backlink needs. Let's boost your search rankings together!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 shadow-2xl"
            >
              <span>View Packages</span>
            </Link>
          </div>
          
          <p className="text-blue-200 mt-6 text-sm">
            ✅ Free Strategy Session ✅ 24/7 Support ✅ Money-Back Guarantee
          </p>
        </div>
      </section>

      {/* === MOBILE BOTTOM NAVIGATION BAR === */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="flex justify-around items-center py-3">
          {/* Home */}
          <Link
            to="/"
            className="flex flex-col items-center space-y-1 text-blue-600"
          >
            <span className="text-lg">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </Link>

          {/* Search */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600"
          >
            <span className="text-lg">🔍</span>
            <span className="text-xs font-medium">Search</span>
          </button>

          {/* Add to Cart - Blog Backlinks */}
          <Link
            to="/pricing"
            className="flex flex-col items-center space-y-1 text-green-600 hover:text-green-700 relative"
          >
            <span className="text-lg">🛒</span>
            <span className="text-xs font-medium">Add to Cart</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              ₹100
            </span>
          </Link>

          {/* Pricing */}
          <Link
            to="/pricing"
            className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600"
          >
            <span className="text-lg">💰</span>
            <span className="text-xs font-medium">Pricing</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default About;