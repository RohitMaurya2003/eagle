import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { 
  Link2, 
  TrendingUp, 
  Globe, 
  Users,
  FileText,
  MapPin,
  Zap,
  Star,
  Shield,
  CheckCircle,
  Rocket,
  Target,
  Award,
  BarChart3,
  ShoppingCart,
  X
} from 'lucide-react';

type ServiceItem = {
  name: string;
  price: number;
  [key: string]: any;
};

const Services = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [showBacklinkForm, setShowBacklinkForm] = useState(false);
  const [showDAForm, setShowDAForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    websiteUrl: '',
    keywords: '',
    additionalUrls: ''
  });

  // Direct payment via Razorpay (no pre-form) using env key
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(true));
        existing.addEventListener('error', () => resolve(false));
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const formatAmount = (amount: number): number => Math.round(amount * 100);

  const payDirect = async (serviceName: string, price: number, description?: string) => {
    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert('Payment gateway failed to load. Please check your internet and try again.');
        return;
      }
      if (!RAZORPAY_KEY_ID) {
        alert('Payment is not configured. Missing Razorpay key.');
        return;
      }

      const options: any = {
        key: RAZORPAY_KEY_ID,
        amount: formatAmount(price),
        currency: 'INR',
        name: '360EagleWeb',
        description: description || serviceName,
        handler: function (response: any) {
          navigate('/payment/success', {
            state: {
              paymentId: response?.razorpay_payment_id,
              service: serviceName,
              amount: price
            }
          });
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        notes: { service: serviceName },
        theme: { color: '#4F46E5' },
        modal: {
          ondismiss: function () {
            navigate('/payment/failed', { state: { reason: 'Payment dismissed by user' } });
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        navigate('/payment/failed', { state: { reason: resp?.error?.description || 'Payment failed' } });
      });
      rzp.open();
    } catch (err) {
      console.error('Razorpay error:', err);
      navigate('/payment/failed', { state: { reason: 'Unexpected error while starting payment' } });
    }
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    });
  };

  // Direct Payment Order Function with Razorpay Live Keys
  const processPayment = async (serviceName, price, serviceType = 'service') => {
    if (!orderForm.name || !orderForm.email || !orderForm.websiteUrl) {
      alert('Please fill in all required fields: Name, Email, and Website URL');
      return;
    }

    const options = {
      key: "rzp_live_RTs0P1lgBNFTvK",
      amount: price * 100, // Amount in paise
      currency: "INR",
      name: "360EagleWeb",
      description: `${serviceName} - ${serviceType}`,
      image: "/logo.svg",
      handler: function(response) {
        const successMessage = `✅ Payment Successful!\n\nService: ${serviceName}\nAmount: ₹${price}\nPayment ID: ${response.razorpay_payment_id}\n\nThank you for your order! We will start working on your project within 24 hours.`;
        alert(successMessage);
        
        // Send confirmation to WhatsApp with customer details
        const customerDetails = `Customer Details:\nName: ${orderForm.name}\nEmail: ${orderForm.email}\nWebsite: ${orderForm.websiteUrl}`;
        const serviceDetails = `Service: ${serviceName}\nAmount: ₹${price}\nPayment ID: ${response.razorpay_payment_id}`;
        const additionalInfo = orderForm.keywords ? `\nKeywords: ${orderForm.keywords}` : '';
        const additionalUrls = orderForm.additionalUrls ? `\nAdditional URLs: ${orderForm.additionalUrls}` : '';
        
        const whatsappMessage = `✅ Payment Confirmed - 360EagleWeb\n\n${serviceDetails}\n${customerDetails}${additionalInfo}${additionalUrls}\n\nWe have received your order and will begin work shortly. Please keep this information for reference.`;
        const whatsappUrl = `https://wa.me/919310533973?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        // Reset forms
        setShowBacklinkForm(false);
        setShowDAForm(false);
        setOrderForm({
          name: '',
          email: '',
          websiteUrl: '',
          keywords: '',
          additionalUrls: ''
        });
      },
      prefill: {
        name: orderForm.name,
        email: orderForm.email,
        contact: "9999999999"
      },
      notes: {
        service: serviceName,
        serviceType: serviceType,
        customerName: orderForm.name,
        customerEmail: orderForm.email,
        website: orderForm.websiteUrl,
        keywords: orderForm.keywords,
        additionalUrls: orderForm.additionalUrls
      },
      theme: {
        color: "#3399cc"
      },
      modal: {
        ondismiss: function() {
          alert('Payment cancelled. If you face any issues, please contact us on WhatsApp.');
        }
      }
    };

    try {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      alert('Payment gateway error. Please refresh the page and try again.');
    }
  };

  // Service data
  const serviceCategories = [
    {
      title: '🔗 PREMIUM BACKLINKS',
      icon: <Link2 className="h-12 w-12" />,
      description: 'Buy Quality Backlinks - Affordable backlink packages with quantity options',
      services: [
        {
          icon: <FileText className="h-8 w-8" />,
          name: 'Blog 2.0 Backlinks',
          description: 'High-quality blog comment backlinks with minimum 50 links order',
          features: [
            'DoFollow Blog Comments',
            'High DA/PA Sites',
            'Relevant Niche Blogs',
            'Natural Anchor Text',
            'Manual Submission',
            '7 Days Delivery'
          ],
          startingPrice: '₹100',
          price: 100,
          priceNote: '50 links - ₹2 per link',
          type: 'backlink'
        },
        {
          icon: <Users className="h-8 w-8" />,
          name: 'Social Bookmarking',
          description: 'Social bookmarking backlinks with minimum 100 links order',
          features: [
            'Social Bookmark Sites',
            'High Authority Platforms',
            'Instant Indexing',
            'Dofollow Links',
            'Bulk Submission',
            '3 Days Delivery'
          ],
          startingPrice: '₹100',
          price: 100,
          priceNote: '100 links - ₹1 per link',
          type: 'backlink'
        },
        {
          icon: <Globe className="h-8 w-8" />,
          name: 'Wiki Backlinks',
          description: 'Wikipedia-style backlinks with minimum 100 links order',
          features: [
            'Wiki Site Backlinks',
            'High Trust Flow',
            'Editorial Links',
            'Natural Context',
            'Manual Placement',
            '5 Days Delivery'
          ],
          startingPrice: '₹200',
          price: 200,
          priceNote: '100 links - ₹2 per link',
          type: 'backlink'
        }
      ]
    },
    {
      title: '🔥 MOZ DOMAIN AUTHORITY',
      icon: <TrendingUp className="h-12 w-12" />,
      description: 'Increase Moz DA - Boost your website\'s Domain Authority with premium link building',
      services: [
        {
          icon: <Zap className="h-8 w-8" />,
          name: 'Moz DA 25+',
          description: 'Increase your Domain Authority to 25+ with high-quality backlinks',
          features: [
            'DA Boost to 25+',
            'High Quality Backlinks',
            'Authority Site Links',
            'Natural Link Profile',
            '30 Days Completion',
            'Detailed Report'
          ],
          startingPrice: '₹699',
          price: 699,
          priceNote: 'Original: ₹1,499 - Save 53%',
          type: 'da-service',
          popular: false
        },
        {
          icon: <Target className="h-8 w-8" />,
          name: 'Moz DA 35+',
          description: 'Boost Domain Authority to 35+ with premium quality links',
          features: [
            'DA Boost to 35+',
            'Premium Quality Links',
            'Authority .edu/.gov Links',
            'Natural Growth Pattern',
            '45 Days Completion',
            'White-hat Techniques'
          ],
          startingPrice: '₹799',
          price: 799,
          priceNote: 'Original: ₹1,999 - Save 60%',
          type: 'da-service',
          popular: true
        },
        {
          icon: <Award className="h-8 w-8" />,
          name: 'Moz DA 40+',
          description: 'Achieve 40+ Domain Authority with ultra premium links',
          features: [
            'DA Boost to 40+',
            'Ultra Premium Links',
            'High Authority Networks',
            'Natural Anchor Text',
            '60 Days Completion',
            'Priority Support'
          ],
          startingPrice: '₹899',
          price: 899,
          priceNote: 'Original: ₹2,499 - Save 64%',
          type: 'da-service',
          popular: false
        }
      ]
    },
    {
      title: '📈 AHREFS DOMAIN RATING',
      icon: <BarChart3 className="h-12 w-12" />,
      description: 'Increase Ahrefs DR - Improve your Domain Rating with high-quality campaigns',
      services: [
        {
          icon: <Rocket className="h-8 w-8" />,
          name: 'Ahrefs DR 25+',
          description: 'Increase Domain Rating to 25+ with quality referring domains',
          features: [
            'DR Boost to 25+',
            'Quality Referring Domains',
            'Natural Link Velocity',
            'Dofollow Links',
            '30 Days Completion',
            'Detailed Analytics'
          ],
          startingPrice: '₹999',
          price: 999,
          priceNote: 'Original: ₹2,499 - Save 60%',
          type: 'da-service',
          popular: false
        },
        {
          icon: <Shield className="h-8 w-8" />,
          name: 'Ahrefs DR 35+',
          description: 'Boost Domain Rating to 35+ with premium referring domains',
          features: [
            'DR Boost to 35+',
            'Premium Referring Domains',
            'Authority Site Links',
            'Natural Growth',
            '45 Days Completion',
            'White-hat Strategy'
          ],
          startingPrice: '₹1,499',
          price: 1499,
          priceNote: 'Original: ₹3,999 - Save 63%',
          type: 'da-service',
          popular: true
        },
        {
          icon: <CheckCircle className="h-8 w-8" />,
          name: 'Ahrefs DR 40+',
          description: 'Achieve 40+ Domain Rating with ultra premium domains',
          features: [
            'DR Boost to 40+',
            'Ultra Premium Domains',
            'High DR Network Links',
            'Natural Pattern',
            '60 Days Completion',
            'Priority Implementation'
          ],
          startingPrice: '₹1,999',
          price: 1999,
          priceNote: 'Original: ₹4,999 - Save 60%',
          type: 'da-service',
          popular: false
        }
      ]
    }
  ];

  // Backlink Packages for Pricing Page
  const backlinkPackages = [
    {
      id: '1200Backlinks',
      name: "1200 Premium Backlinks",
      description: "3 Keywords • 2 URLs",
      price: 299,
      originalPrice: 699,
      features: [
        "1200 High Quality Backlinks",
        "3 Target Keywords",
        "2 Website URLs",
        "Mixed Dofollow Links",
        "Google Safe Techniques",
        "7-10 Days Delivery",
        "40 Days Ping Service"
      ],
      popular: true,
      type: 'backlink-package'
    },
    {
      id: '10kBacklinks',
      name: "10,000 Premium Backlinks",
      description: "10 Keywords • 10 URLs",
      price: 1499,
      originalPrice: 4499,
      features: [
        "10,000 High Quality Backlinks",
        "10 Target Keywords",
        "10 Website URLs",
        "Mixed Dofollow Links",
        "Google Safe Techniques",
        "10-15 Days Delivery",
        "40 Days Ping Service",
        "Priority Support"
      ],
      popular: false,
      type: 'backlink-package'
    },
    {
      id: '5000Backlinks',
      name: "5,000 Premium Backlinks",
      description: "10 Keywords • 5 URLs",
      price: 999,
      originalPrice: 2999,
      features: [
        "5,000 High Quality Backlinks",
        "10 Target Keywords",
        "5 Website URLs",
        "Mixed Dofollow Links",
        "Google Safe Techniques",
        "10-12 Days Delivery",
        "40 Days Ping Service"
      ],
      popular: false,
      type: 'backlink-package'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Helmet>
        <title>Premium SEO Services | Backlinks, Moz DA, Ahrefs DR - 360EagleWeb</title>
        <meta
          name="description"
          content="Professional SEO services: Premium backlinks, Moz DA increase, Ahrefs DR boost, GMB setup. Affordable packages starting from ₹100."
        />
        <meta
          name="keywords"
          content="backlink services, Moz DA increase, Ahrefs DR boost, GMB setup, website development, SEO services India"
        />
        <link rel="canonical" href="https://360eagleweb.com/services" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-white py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-yellow-400 text-blue-900 px-6 py-3 rounded-full text-lg font-bold mb-8 animate-bounce">
            🦅 Premium SEO Services
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-yellow-400">SEO Services</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Premium backlinks, Moz DA boost, Ahrefs DR increase, and complete digital solutions
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
              <Star className="h-4 w-4 mr-1" /> 1500+ Clients Served
            </span>
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
              <Star className="h-4 w-4 mr-1" /> Google Safe Techniques
            </span>
            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
              <Star className="h-4 w-4 mr-1" /> Affordable Pricing
            </span>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      {serviceCategories.map((category, categoryIndex) => (
        <section 
          key={categoryIndex} 
          className={categoryIndex % 2 === 0 ? 'py-16 bg-white' : 'py-16 bg-gray-50'}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-blue-600 mb-4 flex justify-center">
                {category.icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {category.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.services.map((service, serviceIndex) => (
                <div 
                  key={serviceIndex} 
                  className={`relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                    service.popular ? 'border-yellow-400 transform hover:scale-105' : 'border-gray-200'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span>POPULAR</span>
                      </span>
                    </div>
                  )}

                  <div className="text-blue-600 mb-4">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {service.description}
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 border border-blue-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {service.startingPrice}
                      </div>
                      <div className="text-sm text-blue-700 font-medium">
                        {service.priceNote}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg flex items-center">
                      <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                      Service Includes:
                    </h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-gray-700 flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Order Now Button - Opens Appropriate Form */}
                  <button
                    onClick={() => {
                      // Directly open Razorpay payment on Order Now
                      payDirect(service.name, service.price, `${service.name} - ${service.startingPrice}`);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 text-center text-lg shadow-lg"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Order Now</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Backlink Packages Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
              🎯 PREMIUM BACKLINK PACKAGES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Backlink Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready-to-use backlink packages for instant SEO boost
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {backlinkPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`relative bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl border-2 ${
                  pkg.popular ? 'border-yellow-400 transform hover:scale-105' : 'border-purple-200'
                } transition-all duration-300 hover:shadow-2xl`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span>MOST POPULAR</span>
                    </span>
                  </div>
                )}
                
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{pkg.name}</h3>
                  <p className="text-gray-600 text-center mb-6">{pkg.description}</p>
                  
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-4xl font-bold text-purple-600">
                        ₹{pkg.price}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ₹{pkg.originalPrice}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        SAVE {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}%
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 text-center">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center justify-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-center">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => payDirect(pkg.name, pkg.price, pkg.description)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white'
                    }`}
                  >
                    🛒 Order Now - ₹{pkg.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Backlink Order Form Modal */}
      {showBacklinkForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Order {selectedService?.name}
                </h3>
                <button
                  onClick={() => setShowBacklinkForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={orderForm.name}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={orderForm.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URLs (one per line) *
                  </label>
                  <textarea
                    name="additionalUrls"
                    value={orderForm.additionalUrls}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="https://example.com/page1&#10;https://example.com/page2"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter one URL per line
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Keywords (comma separated) *
                  </label>
                  <textarea
                    name="keywords"
                    value={orderForm.keywords}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="seo services, digital marketing, web development"
                    required
                  />
                </div>

                {/* Single Payment Button */}
                <button
                  onClick={() => processPayment(selectedService.name, selectedService.price, 'backlink')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 text-lg"
                >
                  <span>💳 Pay Now - ₹{selectedService?.price}</span>
                </button>

                <p className="text-sm text-gray-600 text-center mt-4">
                  After payment, you'll be redirected to WhatsApp for order confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DA/PA Order Form Modal */}
      {showDAForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Order {selectedService?.name}
                </h3>
                <button
                  onClick={() => setShowDAForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={orderForm.name}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={orderForm.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    name="websiteUrl"
                    value={orderForm.websiteUrl}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="https://example.com"
                    required
                  />
                </div>

                {/* Single Payment Button */}
                <button
                  onClick={() => processPayment(selectedService.name, selectedService.price, 'da-service')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 text-lg"
                >
                  <span>💳 Pay Now - ₹{selectedService?.price}</span>
                </button>

                <p className="text-sm text-gray-600 text-center mt-4">
                  After payment, you'll be redirected to WhatsApp for order confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Boost Your Rankings?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Choose from our premium services and start growing today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919310533973"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>💬 Chat on WhatsApp</span>
            </a>
            <a
              href="tel:+919310533973"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>📞 Call +91 93105 33973</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;