// src/pages/Offer.tsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { 
  Check, 
  Star, 
  Rocket, 
  Clock, 
  Users, 
  Shield,
  Search,
  Target,
  Sparkles,
  Gift,
  Award,
  TrendingUp,
  Zap,
  ArrowRight,
  BarChart3,
  Globe,
  Link,
  FileText,
  ThumbsUp,
  Eye,
  Calendar,
  HeadphonesIcon,
  CreditCard,
  X
} from "lucide-react";

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

const Offer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [flashSaleTime, setFlashSaleTime] = useState(30);
  const [isSpecialPrice, setIsSpecialPrice] = useState(true);
  const [isFlashSale, setIsFlashSale] = useState(true);
  const [hasFlashSaleOccurred, setHasFlashSaleOccurred] = useState(false);
  const [offerExpired, setOfferExpired] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isSuccessFormOpen, setIsSuccessFormOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [originalAmount, setOriginalAmount] = useState(0);
  const [packageType, setPackageType] = useState("");
  const [quantity, setQuantity] = useState(0);

  // ✅ Environment variables
  const RAZORPAY_KEY_ID = "rzp_live_RTs0P1lgBNFTvK";
  const WHATSAPP_NUMBER = "9310533973";

  // Success form data
  const [successFormData, setSuccessFormData] = useState({
    name: "",
    email: "",
    website: "",
    keywords: "",
    phone: "",
    utr: ""
  });

  // Initialize timers from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem('specialOfferTime');
    const savedFlashSale = localStorage.getItem('flashSaleOccurred');
    const savedOfferExpired = localStorage.getItem('offerExpired');
    
    if (savedTime) {
      const remainingTime = parseInt(savedTime);
      setTimeLeft(remainingTime);
      if (remainingTime <= 0) {
        setOfferExpired(true);
        setIsSpecialPrice(false);
      }
    }
    
    if (savedFlashSale === 'true') {
      setHasFlashSaleOccurred(true);
      setIsFlashSale(false);
    }

    if (savedOfferExpired === 'true') {
      setOfferExpired(true);
      setIsSpecialPrice(false);
    }
  }, []);

  // Main Timer Effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setOfferExpired(true);
      setIsSpecialPrice(false);
      localStorage.setItem('offerExpired', 'true');
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        localStorage.setItem('specialOfferTime', newTime.toString());
        
        if (newTime <= 0) {
          setOfferExpired(true);
          setIsSpecialPrice(false);
          localStorage.setItem('offerExpired', 'true');
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Flash Sale Timer
  useEffect(() => {
    if (flashSaleTime <= 0 || hasFlashSaleOccurred) {
      setIsFlashSale(false);
      setHasFlashSaleOccurred(true);
      localStorage.setItem('flashSaleOccurred', 'true');
      return;
    }

    const flashTimerId = setInterval(() => {
      setFlashSaleTime(prev => {
        if (prev <= 1) {
          setIsFlashSale(false);
          setHasFlashSaleOccurred(true);
          localStorage.setItem('flashSaleOccurred', 'true');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(flashTimerId);
  }, [flashSaleTime, hasFlashSaleOccurred]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Backlink Packages Data
  const backlinkPackages = {
    blog: {
      name: "Blog 2.0 Backlinks",
      price: 2,
      minOrder: 50,
      description: "High-Quality Blog 2.0 Backlinks",
      features: [
        "Premium Blog 2.0 Properties",
        "100% Dofollow Links",
        "High DA/PA Sites",
        "Human Written Content",
        "Fast Indexing",
        "7 Days Delivery",
        "Google Safe",
        "Permanent Links"
      ],
      icon: "📝",
      gradient: "from-blue-500 to-cyan-500",
      popular: true
    },
    social: {
      name: "Social Bookmarking Backlinks",
      price: 1,
      minOrder: 100,
      description: "Powerful Social Bookmarking Links",
      features: [
        "High Authority Bookmarking Sites",
        "Instant Indexing",
        "Dofollow & Nofollow Mix",
        "Social Signals Boost",
        "Fast Submission",
        "5 Days Delivery",
        "Safe for SEO",
        "Permanent Placement"
      ],
      icon: "🔖",
      gradient: "from-purple-500 to-pink-500",
      popular: false
    },
    wiki: {
      name: "Wiki Backlinks",
      price: 2,
      minOrder: 100,
      description: "Authority Wiki Backlinks",
      features: [
        "Genuine Wiki Sites",
        "High Trust Flow",
        "Editorial Links",
        "Natural Profile",
        "10 Days Delivery",
        "White Hat SEO",
        "Authority Boost",
        "Long-term Value"
      ],
      icon: "🌐",
      gradient: "from-green-500 to-emerald-500",
      popular: false
    }
  };

  // Bulk Packages
  const bulkPackages = [
    {
      name: "Starter Pack",
      price: 299,
      original: 999,
      description: "Perfect for New Websites",
      backlinks: "150 Blog 2.0 + 100 Social + 50 Wiki",
      delivery: "7-10 Days",
      bestFor: "New Websites & Startups",
      type: "bulk"
    },
    {
      name: "Growth Pack",
      price: 599,
      original: 1999,
      description: "Ideal for Growing Businesses",
      backlinks: "300 Blog 2.0 + 200 Social + 100 Wiki",
      delivery: "10-12 Days",
      bestFor: "Growing Businesses",
      type: "bulk"
    },
    {
      name: "Pro Pack",
      price: 999,
      original: 3999,
      description: "For Serious SEO Results",
      backlinks: "500 Blog 2.0 + 300 Social + 200 Wiki",
      delivery: "12-15 Days",
      bestFor: "Established Websites",
      type: "bulk"
    },
    {
      name: "Enterprise Pack",
      price: 1999,
      original: 7999,
      description: "Maximum Authority Boost",
      backlinks: "1000 Blog 2.0 + 500 Social + 500 Wiki",
      delivery: "15-20 Days",
      bestFor: "Large Enterprises",
      type: "bulk"
    }
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Payment Functions
  const openPaymentModal = (pkg: any, type: string, qty?: number) => {
    let amount = pkg.price;
    let originalPrice = pkg.price;
    
    if (type === 'individual') {
      amount = qty ? pkg.price * qty : pkg.price * pkg.minOrder;
      originalPrice = amount;
      
      // Apply discounts for individual packages
      if (!offerExpired) {
        if (isFlashSale) {
          amount = Math.floor(amount * 0.8); // 20% off during flash sale
        } else if (isSpecialPrice) {
          amount = Math.floor(amount * 0.9); // 10% off for special price
        }
      }
    } else {
      // For bulk packages, use the package price directly
      amount = pkg.price;
      originalPrice = pkg.original;
    }
    
    setPaymentAmount(amount);
    setOriginalAmount(originalPrice);
    setSelectedPackage(pkg.name);
    setPackageType(type);
    setQuantity(qty || pkg.minOrder);
    setIsPaymentOpen(true);
  };

  const initiateRazorpayPayment = async () => {
    try {
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: paymentAmount * 100,
        currency: 'INR',
        name: 'EagleWeb - Premium Backlink Packages',
        description: `${selectedPackage} - Premium Backlinks Package`,
        image: '/logo.png',
        handler: function (response: any) {
          // Open success form after payment
          setIsSuccessFormOpen(true);
          setIsPaymentOpen(false);
          
          // Mark flash sale as used
          if (isFlashSale) {
            setHasFlashSaleOccurred(true);
            localStorage.setItem('flashSaleOccurred', 'true');
          }
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: ''
        },
        notes: {
          package: selectedPackage,
          type: packageType,
          quantity: quantity.toString()
        },
        theme: {
          color: '#3B82F6'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again or contact us on WhatsApp.');
    }
  };

  const handleSuccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = `✅ EagleWeb Payment Success 🦅\n\nPayment Details:\nName: ${successFormData.name}\nEmail: ${successFormData.email}\nPhone: ${successFormData.phone}\nWebsite: ${successFormData.website}\nKeywords: ${successFormData.keywords}\nUTR Number: ${successFormData.utr}\nPackage: ${selectedPackage}\nAmount Paid: ₹${paymentAmount}\nQuantity: ${quantity}\n\nPlease verify my payment and start the service!`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    setIsSuccessFormOpen(false);
    setSuccessFormData({ name: "", email: "", website: "", keywords: "", phone: "", utr: "" });
    alert("Thank you! We'll verify your payment and start your service within 24 hours. 🎉");
  };

  const handleSuccessFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSuccessFormData({
      ...successFormData,
      [e.target.name]: e.target.value
    });
  };

  const SparklesEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-ping text-yellow-300"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" style={{ fontFamily: "'Haboro Serif', serif" }}>
      <Helmet>
        <title>Premium Backlinks Sale - Blog 2.0, Social Bookmarking & Wiki Links | EagleWeb</title>
        <meta name="description" content="Get premium backlinks at unbeatable prices: Blog 2.0 (₹2), Social Bookmarking (₹1), Wiki Links (₹2). Limited time offer with bulk discounts!" />
        <link href="https://fonts.googleapis.com/css2?family=Haboro+Serif:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Flash Sale Banner */}
      {isFlashSale && !offerExpired && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 text-center animate-pulse border-b-2 border-yellow-300">
          <div className="flex items-center justify-center gap-3 text-sm md:text-base">
            <Zap className="h-4 w-4 md:h-5 md:w-5 animate-bounce" />
            <span className="font-bold">FLASH SALE: 20% EXTRA OFF - Ends in {flashSaleTime}s!</span>
            <Zap className="h-4 w-4 md:h-5 md:w-5 animate-bounce" />
          </div>
        </div>
      )}

      {/* Floating Timer */}
      <div className="fixed top-4 right-4 z-40">
        <div className={`bg-gradient-to-r ${offerExpired ? 'from-gray-500 to-gray-700' : isSpecialPrice ? 'from-green-500 to-emerald-500' : 'from-red-500 to-orange-500'} text-white px-4 py-2 rounded-full shadow-2xl animate-pulse border-2 border-yellow-300`}>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 animate-spin" />
            <div className="text-center">
              <div className="text-xs font-semibold">
                {offerExpired ? '❌ OFFER EXPIRED' : isSpecialPrice ? '⏰ ENDS IN' : '⏰ ENDED'}
              </div>
              <div className={`text-sm font-bold ${offerExpired && 'line-through'}`}>
                {offerExpired ? '00:00' : formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white pt-20 pb-16 md:py-24 overflow-hidden">
        <SparklesEffect />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          {!offerExpired && (
            <div className="mb-6 md:mb-8 p-4 rounded-2xl bg-green-500/20 border border-green-300 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 animate-pulse" />
                  <span className="text-lg md:text-xl font-bold">⏰ SPECIAL OFFER ENDS IN:</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-yellow-300 font-mono">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          )}

          {isFlashSale && !offerExpired && (
            <div className="bg-purple-500 text-white px-6 py-3 rounded-full text-lg font-bold inline-block mb-6 animate-pulse border-2 border-yellow-300">
              ⚡ FLASH SALE: 20% EXTRA OFF - {flashSaleTime}s LEFT!
            </div>
          )}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {offerExpired ? (
              <>
                Premium <span className="text-yellow-300">Backlinks</span>
                <br />
                <span className="text-2xl md:text-4xl">Contact for Pricing</span>
              </>
            ) : (
              <>
                Premium <span className="text-yellow-300">Backlinks</span>
                <br />
                <span className="text-2xl md:text-4xl">At Unbeatable Prices!</span>
              </>
            )}
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto font-medium">
            {offerExpired 
              ? "Professional backlink services for higher rankings" 
              : "Get quality backlinks starting at just ₹1 per link with bulk discounts!"
            }
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 max-w-5xl mx-auto">
            {Object.entries(backlinkPackages).map(([key, pkg]) => (
              <div key={key} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
                <div className="text-2xl mb-2">{pkg.icon}</div>
                <div className="text-lg font-bold mb-1">{pkg.name}</div>
                <div className="text-2xl font-bold text-yellow-300">₹{pkg.price}</div>
                <div className="text-sm opacity-90">Min. {pkg.minOrder} links</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('packages')}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 hover:shadow-xl flex items-center gap-3 shadow-lg"
            >
              <TrendingUp className="h-5 w-5" />
              View All Packages
            </button>
            <button 
              onClick={() => scrollToSection('bulk')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 hover:shadow-xl flex items-center gap-3 shadow-lg border-2 border-green-300"
            >
              <Gift className="h-5 w-5" />
              Bulk Offers
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Special Offer Banner */}
      {!offerExpired && (
        <section className="py-6 bg-gradient-to-r from-green-600 to-blue-600 text-white relative overflow-hidden">
          <SparklesEffect />
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Gift className="h-8 w-8 text-yellow-300 animate-pulse" />
                <div>
                  <div className="text-xl md:text-2xl font-bold">Premium Backlinks at Factory Prices!</div>
                  <div className="text-yellow-200">{isFlashSale ? '+ 20% FLASH SALE EXTRA OFF!' : '+ 10% Extra on Bulk Orders'}</div>
                </div>
              </div>
              <button 
                onClick={() => scrollToSection('packages')}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-bold transition-all hover:scale-105 flex items-center gap-2"
              >
                Order Now <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Backlink Packages */}
      <section id="packages" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Premium <span className="text-blue-500">Backlink Packages</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully curated backlink packages designed to boost your SEO rankings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(backlinkPackages).map(([key, pkg]) => (
              <div key={key} className={`bg-gradient-to-br ${pkg.gradient} text-white rounded-2xl p-6 relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl`}>
                {pkg.popular && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-bold rotate-12 shadow-lg">
                    ⭐ POPULAR
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{pkg.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold mb-2">₹{pkg.price}</div>
                  <p className="text-blue-100 mb-4">{pkg.description}</p>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="font-bold">Minimum Order: {pkg.minOrder} links</div>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-300 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <button 
                    onClick={() => openPaymentModal(pkg, 'individual', pkg.minOrder)}
                    className="w-full bg-white text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-bold transition-all hover:scale-105 text-center flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Order {pkg.minOrder} Links - ₹{pkg.minOrder * pkg.price}</span>
                  </button>
                  <button 
                    onClick={() => openPaymentModal(pkg, 'individual', pkg.minOrder * 2)}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-3 rounded-xl font-bold transition-all hover:scale-105 text-center flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Order {pkg.minOrder * 2} Links - ₹{(pkg.minOrder * 2 * pkg.price)}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Bulk Packages */}
      <section id="bulk" className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Bulk <span className="text-blue-500">Package Deals</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Save more with our carefully crafted bulk packages for maximum SEO impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bulkPackages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="text-2xl mb-2">🦅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">₹{pkg.price}</div>
                  <div className="text-gray-500 line-through text-sm">₹{pkg.original}</div>
                  <div className="text-green-600 font-bold text-sm">Save ₹{pkg.original - pkg.price}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="text-center">
                    <div className="font-bold text-gray-800 mb-2">{pkg.backlinks}</div>
                    <div className="text-sm text-gray-600">Delivery: {pkg.delivery}</div>
                    <div className="text-xs text-blue-600 mt-1">Best for: {pkg.bestFor}</div>
                  </div>
                </div>

                <button 
                  onClick={() => openPaymentModal(pkg, 'bulk')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-bold transition-all hover:scale-105 text-center flex items-center justify-center gap-2 shadow-lg"
                >
                  <CreditCard className="h-4 w-4" />
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Features & Benefits */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-500">Our Backlinks</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="h-8 w-8" />, title: "100% Safe SEO", desc: "White hat techniques only" },
              { icon: <Zap className="h-8 w-8" />, title: "Fast Delivery", desc: "Quick turnaround time" },
              { icon: <TrendingUp className="h-8 w-8" />, title: "Proven Results", desc: "Real ranking improvements" },
              { icon: <HeadphonesIcon className="h-8 w-8" />, title: "24/7 Support", desc: "Always available to help" },
              { icon: <Globe className="h-8 w-8" />, title: "High DA Sites", desc: "Quality domain authority" },
              { icon: <Link className="h-8 w-8" />, title: "Dofollow Links", desc: "Maximum link juice" },
              { icon: <FileText className="h-8 w-8" />, title: "Quality Content", desc: "Human written articles" },
              { icon: <BarChart3 className="h-8 w-8" />, title: "Detailed Reports", desc: "Complete analytics" }
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-blue-200">
                <div className="text-blue-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: How It Works */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It <span className="text-purple-500">Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Choose Package", desc: "Select your preferred backlink package", icon: "📦" },
              { step: "02", title: "Make Payment", desc: "Secure payment via Razorpay", icon: "💳" },
              { step: "03", title: "Submit Details", desc: "Provide your website and keywords", icon: "📝" },
              { step: "04", title: "Get Results", desc: "Receive backlinks and ranking boost", icon: "🚀" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-purple-200">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Client <span className="text-blue-500">Success Stories</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Rajesh Kumar", biz: "E-commerce Store", result: "Rankings improved from page 3 to page 1 in 45 days", avatar: "👨‍💼" },
              { name: "Priya Sharma", biz: "Blog Website", result: "Organic traffic increased by 300% after 2 months", avatar: "👩‍💻" },
              { name: "Amit Patel", biz: "Local Business", result: "First page rankings for 5 main keywords", avatar: "👨‍🎓" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.biz}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.result}"</p>
                <div className="flex gap-1 mt-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Boost Your Rankings?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Start your SEO journey today with our premium backlink packages
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('packages')}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 flex items-center gap-3 shadow-lg"
            >
              <TrendingUp className="h-5 w-5" />
              View Packages
            </button>
            <button 
              onClick={() => window.open('https://wa.me/919310533973', '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 flex items-center gap-3 shadow-lg border-2 border-green-300"
            >
              <span>💬 WhatsApp Now</span>
            </button>
          </div>

          {!offerExpired && (
            <div className="mt-8 p-4 bg-white/20 rounded-xl backdrop-blur-sm">
              <div className="flex items-center justify-center gap-4">
                <Clock className="h-6 w-6 animate-pulse" />
                <div>
                  <div className="font-bold">Offer Ends in: {formatTime(timeLeft)}</div>
                  <div className="text-yellow-200 text-sm">{isFlashSale ? '⚡ Flash Sale Active!' : 'Special Pricing Active'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-4">
            <div className="text-2xl font-bold text-blue-400 mb-2">EagleWeb</div>
            <p className="text-gray-400">Premium Backlink Services</p>
          </div>
          <div className="text-gray-400 text-sm">
            © 2024 EagleWeb. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      {isPaymentOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border-2 border-blue-300">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-blue-500" />
                  {offerExpired ? 'Order Package' : isFlashSale ? 'Flash Sale 20% OFF' : 'Special Offer'}
                </h3>
                <p className="text-blue-600 font-semibold text-sm mt-1">{selectedPackage}</p>
                {packageType === 'individual' && (
                  <p className="text-gray-600 text-sm">Quantity: {quantity} links</p>
                )}
              </div>
              <button onClick={() => setIsPaymentOpen(false)} className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className={`p-4 rounded-xl border-2 ${
                offerExpired 
                  ? 'bg-blue-50 border-blue-200' 
                  : isFlashSale
                    ? 'bg-purple-50 border-purple-200'
                    : 'bg-green-50 border-green-200'
              }`}>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    offerExpired 
                      ? 'text-blue-600' 
                      : isFlashSale 
                        ? 'text-purple-600' 
                        : 'text-green-600'
                  }`}>
                    ₹{paymentAmount.toLocaleString()}
                  </div>
                  <div className={`font-semibold text-lg ${
                    offerExpired 
                      ? 'text-blue-700' 
                      : isFlashSale 
                        ? 'text-purple-700' 
                        : 'text-green-700'
                  }`}>
                    {offerExpired 
                      ? 'Package Price' 
                      : isFlashSale 
                        ? 'Flash Sale 20% OFF!' 
                        : 'Special Discounted Price'
                    }
                  </div>
                  {!offerExpired && originalAmount > paymentAmount && (
                    <div className="text-gray-500 text-sm line-through mt-1">
                      Original: ₹{originalAmount.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={initiateRazorpayPayment}
                className={`w-full py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-3 text-lg shadow-lg ${
                  offerExpired 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-300' 
                    : isFlashSale
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-2 border-purple-300'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-2 border-green-300'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                Pay ₹{paymentAmount.toLocaleString()} Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Form Modal - Opens after payment */}
      {isSuccessFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border-2 border-green-300">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="text-green-500">✅</span>
                  Payment Successful! 🎉
                </h3>
                <p className="text-green-600 font-semibold text-sm mt-1">Complete your details to start service</p>
              </div>
              <button onClick={() => setIsSuccessFormOpen(false)} className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSuccessSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={successFormData.name} 
                  onChange={handleSuccessFormChange} 
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Enter your full name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={successFormData.email} 
                  onChange={handleSuccessFormChange} 
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Enter your email" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  value={successFormData.phone} 
                  onChange={handleSuccessFormChange} 
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Enter your phone number" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website URL *</label>
                <input 
                  type="url" 
                  name="website" 
                  required 
                  value={successFormData.website} 
                  onChange={handleSuccessFormChange} 
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Enter your website URL" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Keywords *</label>
                <textarea 
                  name="keywords" 
                  required 
                  value={successFormData.keywords} 
                  onChange={handleSuccessFormChange} 
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Enter your target keywords (comma separated)"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">UTR Number *</label>
                <input 
                  type="text" 
                  name="utr" 
                  required 
                  value={successFormData.utr} 
                  onChange={handleSuccessFormChange} 
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Enter UTR number from payment" 
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-sm text-gray-600">
                  <div><strong>Package:</strong> {selectedPackage}</div>
                  <div><strong>Amount Paid:</strong> ₹{paymentAmount}</div>
                  {packageType === 'individual' && <div><strong>Quantity:</strong> {quantity} links</div>}
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-3 text-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-2 border-green-300"
              >
                <span>📤 Submit & Start Service</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;