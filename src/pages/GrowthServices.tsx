// src/pages/GrowthServices.tsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { 
  Check, 
  Star, 
  Rocket, 
  Clock, 
  Users, 
  MessageCircle, 
  Phone, 
  X, 
  Send, 
  CreditCard, 
  Shield,
  Search,
  Globe,
  ShoppingCart,
  ThumbsUp,
  Eye,
  Target,
  Sparkles,
  Gift,
  Award,
  Heart,
  Quote,
  ChevronDown,
  MapPin,
  Mail,
  Zap,
  Instagram,
  Facebook,
  Linkedin,
  Globe as WebsiteIcon
} from "lucide-react";

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Service {
  id: string;
  name: string;
  price: number; // Price per 1000
  min: number;
  max: number;
  description: string;
  features: string[];
  icon: JSX.Element;
  category: string;
}

const GrowthServices: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isSuccessFormOpen, setIsSuccessFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [quantity, setQuantity] = useState(1000);
  const [timeLeft, setTimeLeft] = useState(180);
  const [flashSaleTime, setFlashSaleTime] = useState(30);
  const [isSpecialPrice, setIsSpecialPrice] = useState(true);
  const [isFlashSale, setIsFlashSale] = useState(true);
  const [hasFlashSaleOccurred, setHasFlashSaleOccurred] = useState(false);
  const [offerExpired, setOfferExpired] = useState(false);
  const [activeCategory, setActiveCategory] = useState("instagram");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  
  const [successFormData, setSuccessFormData] = useState({
    name: "",
    email: "",
    utr: "",
    service: "",
    amount: "",
    quantity: "",
    link: ""
  });

  const [paymentService, setPaymentService] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [originalAmount, setOriginalAmount] = useState(0);

  // ✅ Environment variables
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const WHATSAPP_NUMBER = "9341436937";

  // Instagram Services (Prices doubled as requested)
  const instagramServices: Service[] = [
    {
      id: "ig-views",
      name: "Instagram Reels Views",
      price: 10, // Doubled from 0.25
      min: 100,
      max: 1000000,
      description: "High-quality Instagram Reel views with fast delivery",
      features: ["Super Fast Speed", "Lifetime Non Drop", "Instant Start"],
      icon: <Eye className="h-6 w-6" />,
      category: "instagram"
    },
    {
      id: "ig-likes",
      name: "Instagram Likes",
      price: 200, // Doubled from 55.86
      min: 100,
      max: 50000,
      description: "Premium Instagram likes from real accounts",
      features: ["Real Accounts", "Fast Delivery", "Non Drop"],
      icon: <ThumbsUp className="h-6 w-6" />,
      category: "instagram"
    },
    {
      id: "ig-post-views",
      name: "Instagram Post Views",
      price: 10, // Doubled from 2.96
      min: 100,
      max: 100000,
      description: "Boost your post visibility with genuine views",
      features: ["Genuine Views", "Quick Start", "24/7 Support"],
      icon: <Eye className="h-6 w-6" />,
      category: "instagram"
    },
    {
      id: "ig-followers",
      name: "Instagram Followers",
      price: 879.06, // Doubled from 439.53
      min: 100,
      max: 10000,
      description: "Grow your Instagram with real followers",
      features: ["Real Followers", "Gradual Growth", "Safe & Secure"],
      icon: <Users className="h-6 w-6" />,
      category: "instagram"
    },
    {
      id: "ig-likes-indian",
      name: "Instagram Likes ~ Indian",
      price: 500, // Doubled from 207.07
      min: 100,
      max: 50000,
      description: "Indian targeted likes for better engagement",
      features: ["Indian Accounts", "Targeted Engagement", "High Quality"],
      icon: <ThumbsUp className="h-6 w-6" />,
      category: "instagram"
    },
    {
      id: "ig-story-views",
      name: "Instagram Story Views",
      price: 50, // Doubled from 13.36
      min: 100,
      max: 100000,
      description: "Increase your story reach with genuine views",
      features: ["Real Views", "Quick Delivery", "Non Drop"],
      icon: <Eye className="h-6 w-6" />,
      category: "instagram"
    },
    {
      id: "ig-shares",
      name: "Instagram Shares",
      price: 10, // Doubled from 2.97
      min: 100,
      max: 50000,
      description: "Boost your content sharing",
      features: ["Organic Shares", "Real Accounts", "Safe Service"],
      icon: <Send className="h-6 w-6" />,
      category: "instagram"
    },
    {
      id: "ig-reach",
      name: "Instagram Reach + Impression",
      price: 30, // Doubled from 6.65
      min: 100,
      max: 100000,
      description: "Increase your post reach and impressions",
      features: ["Increased Reach", "Better Engagement", "Real Results"],
      icon: <Target className="h-6 w-6" />,
      category: "instagram"
    },
    {
      id: "ig-comments",
      name: "Instagram Comments",
      price: 300, // Doubled from 121.06
      min: 10,
      max: 1000,
      description: "Genuine comments on your posts",
      features: ["Custom Comments", "Real Accounts", "Quality Engagement"],
      icon: <MessageCircle className="h-6 w-6" />,
      category: "instagram"
    },
    {
      id: "ig-reel-promotion",
      name: "Instagram Reel Promotion",
      price: 2601.00, // Doubled from 1300.50
      min: 100,
      max: 10000,
      description: "Professional reel promotion service",
      features: ["Professional Promotion", "Better Visibility", "Guaranteed Results"],
      icon: <Rocket className="h-6 w-6" />,
      category: "instagram"
    },
    {
      id: "ig-channel-members",
      name: "Instagram Channel Members",
      price: 199.18, // Doubled from 99.59
      min: 100,
      max: 5000,
      description: "Increase your channel membership",
      features: ["Real Members", "Active Community", "Sustainable Growth"],
      icon: <Users className="h-6 w-6" />,
      category: "instagram"
    },
    {
      id: "ig-live-stream",
      name: "Instagram Live Stream",
      price: 266.56, // Doubled from 133.28
      min: 100,
      max: 10000,
      description: "Boost your live stream viewers",
      features: ["Live Viewers", "Real Engagement", "Instant Start"],
      icon: <Eye className="h-6 w-6" />,
      category: "instagram"
    }
  ];

  // Facebook Services (Prices doubled)
  const facebookServices: Service[] = [
    {
      id: "fb-followers",
      name: "Facebook All Type Followers",
      price: 300, // Doubled from 106.04
      min: 100,
      max: 10000,
      description: "Genuine Facebook followers for all page types",
      features: ["Real Followers", "All Page Types", "Safe Delivery"],
      icon: <Users className="h-6 w-6" />,
      category: "facebook"
    },
    {
      id: "fb-likes",
      name: "Facebook Likes",
      price: 100, // Doubled from 35.04
      min: 100,
      max: 50000,
      description: "Increase your Facebook page likes",
      features: ["Real Likes", "Fast Delivery", "Non Drop"],
      icon: <ThumbsUp className="h-6 w-6" />,
      category: "facebook"
    },
    {
      id: "fb-post-reaction",
      name: "Facebook Post Reaction",
      price: 150, // Doubled from 42.61
      min: 100,
      max: 50000,
      description: "Get genuine reactions on your Facebook posts",
      features: ["Various Reactions", "Real Accounts", "Quick Start"],
      icon: <Heart className="h-6 w-6" />,
      category: "facebook"
    },
    {
      id: "fb-story-reaction",
      name: "Facebook Story Reaction",
      price: 200, // Doubled from 67.47
      min: 100,
      max: 100000,
      description: "Boost your Facebook story engagement",
      features: ["Story Reactions", "Real Engagement", "Instant Delivery"],
      icon: <Heart className="h-6 w-6" />,
      category: "facebook"
    },
    {
      id: "fb-page-likes",
      name: "Facebook Page Likes & Followers",
      price: 300, // Doubled from 63.92
      min: 100,
      max: 10000,
      description: "Grow your Facebook page audience",
      features: ["Page Likes", "Followers Growth", "Organic Growth"],
      icon: <Users className="h-6 w-6" />,
      category: "facebook"
    }
  ];

  // LinkedIn Services (Prices doubled)
  const linkedinServices: Service[] = [
    {
      id: "li-followers",
      name: "LinkedIn Company Page Followers",
      price: 5224.18, // Doubled from 2612.09
      min: 100,
      max: 5000,
      description: "Professional LinkedIn company page followers",
      features: ["Professional Accounts", "Company Page", "Worldwide"],
      icon: <Users className="h-6 w-6" />,
      category: "linkedin"
    }
  ];

  // Website Traffic Services (Prices doubled)
  const websiteServices: Service[] = [
    {
      id: "web-traffic",
      name: "Website Organic Traffic",
      price: 60, // Doubled from 20.24
      min: 100,
      max: 100000,
      description: "Organic website traffic from real sources",
      features: ["Organic Traffic", "Real Visitors", "Safe Referral"],
      icon: <Globe className="h-6 w-6" />,
      category: "website"
    }
  ];

  // All services combined
  const allServices = [
    ...instagramServices,
    ...facebookServices,
    ...linkedinServices,
    ...websiteServices
  ];

  // Category-wise services
  const categoryServices = {
    instagram: instagramServices,
    facebook: facebookServices,
    linkedin: linkedinServices,
    website: websiteServices
  };

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

  // Main Timer Effect - 3 minutes
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

  // Flash Sale Timer - 30 seconds with 20% discount
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

  const calculatePrice = (service: Service, qty: number) => {
    const pricePerUnit = service.price / 1000;
    let total = pricePerUnit * qty;
    
    // Apply flash sale discount
    if (isFlashSale && !offerExpired) {
      total = total * 0.8; // 20% off
    }
    
    return Math.round(total);
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSuccessFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSuccessFormData({
      ...successFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = `🎯 Growth Services Order - Premium Growth Services 🎯\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nMessage: ${formData.message}`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    setIsFormOpen(false);
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const handleSuccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = `✅ Growth Services Payment Success - Premium Growth Services 🎯\n\nPayment Details:\nName: ${successFormData.name}\nEmail: ${successFormData.email}\nUTR Number: ${successFormData.utr}\nService: ${successFormData.service}\nQuantity: ${successFormData.quantity}\nAmount Paid: ₹${successFormData.amount}\nLink: ${successFormData.link}\n\nPlease verify my payment and start the service!`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    setIsSuccessFormOpen(false);
    setSuccessFormData({ name: "", email: "", utr: "", service: "", amount: "", quantity: "", link: "" });
    alert("Thank you! We'll verify your payment and start your service within 24 hours. 🎉");
  };

  const openQuickForm = (serviceName: string) => {
    setFormData(prev => ({ ...prev, service: serviceName }));
    setIsFormOpen(true);
  };

  const openPaymentModal = (service: Service) => {
    setSelectedService(service);
    setQuantity(service.min);
    const calculatedAmount = calculatePrice(service, service.min);
    setPaymentAmount(calculatedAmount);
    setOriginalAmount(Math.round((service.price / 1000) * service.min));
    setPaymentService(service.name);
    setIsPaymentOpen(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (selectedService) {
      const clampedQuantity = Math.max(selectedService.min, Math.min(selectedService.max, newQuantity));
      setQuantity(clampedQuantity);
      const calculatedAmount = calculatePrice(selectedService, clampedQuantity);
      setPaymentAmount(calculatedAmount);
      setOriginalAmount(Math.round((selectedService.price / 1000) * clampedQuantity));
    }
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
        name: 'Premium Growth Services',
        description: `${selectedService?.name} - Quantity: ${quantity}`,
        image: '/logo.png',
        handler: function (response: any) {
          // Open success form after payment
          setIsSuccessFormOpen(true);
          setSuccessFormData(prev => ({
            ...prev,
            service: paymentService,
            amount: paymentAmount.toString(),
            quantity: quantity.toString()
          }));
          setIsPaymentOpen(false);
          
          // Mark flash sale as used
          if (isFlashSale) {
            setHasFlashSaleOccurred(true);
            localStorage.setItem('flashSaleOccurred', 'true');
          }
        },
        prefill: {
          name: formData.name || 'Customer',
          email: formData.email || 'customer@example.com',
          contact: formData.phone || ''
        },
        notes: {
          service: paymentService,
          quantity: quantity.toString(),
          type: 'Growth Service'
        },
        theme: {
          color: '#F59E0B'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again or contact us on WhatsApp.');
    }
  };

  // Sparkles Component
  const SparklesEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(10)].map((_, i) => (
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

  // Reset everything (for testing)
  const resetAll = () => {
    localStorage.removeItem('specialOfferTime');
    localStorage.removeItem('flashSaleOccurred');
    localStorage.removeItem('offerExpired');
    setTimeLeft(180);
    setFlashSaleTime(30);
    setIsSpecialPrice(true);
    setIsFlashSale(true);
    setHasFlashSaleOccurred(false);
    setOfferExpired(false);
    window.location.reload();
  };

  const categories = [
    { id: "instagram", name: "Instagram", icon: <Instagram className="h-5 w-5" />, color: "bg-gradient-to-r from-pink-500 to-purple-500" },
    { id: "facebook", name: "Facebook", icon: <Facebook className="h-5 w-5" />, color: "bg-gradient-to-r from-blue-500 to-blue-700" },
    { id: "linkedin", name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, color: "bg-gradient-to-r from-blue-600 to-blue-800" },
    { id: "website", name: "Website Traffic", icon: <WebsiteIcon className="h-5 w-5" />, color: "bg-gradient-to-r from-green-500 to-green-700" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50" style={{ fontFamily: "'Haboro Serif', serif" }}>
      <Helmet>
        <title>Growth Services - Instagram, Facebook, LinkedIn Services | Premium Growth Services</title>
        <meta name="description" content="Premium growth services: Instagram followers, likes, views | Facebook services | LinkedIn followers | Website traffic. Boost your social media growth!" />
        <link href="https://fonts.googleapis.com/css2?family=Haboro+Serif:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Developer Reset Button (Hidden in production) */}
      {process.env.NODE_ENV === 'development' && (
        <button 
          onClick={resetAll}
          className="fixed bottom-4 left-4 z-50 bg-red-500 text-white px-3 py-2 rounded-lg text-xs opacity-50 hover:opacity-100"
        >
          Reset All
        </button>
      )}

      {/* Flash Sale Banner */}
      {isFlashSale && !offerExpired && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 text-center animate-pulse">
          <div className="flex items-center justify-center gap-3 text-sm md:text-base">
            <Zap className="h-4 w-4 md:h-5 md:w-5 animate-bounce" />
            <span className="font-bold">FLASH SALE: 20% OFF - Ends in {flashSaleTime}s!</span>
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 text-white pt-16 pb-12 md:py-20 overflow-hidden">
        <SparklesEffect />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          {!offerExpired && (
            <div className={`mb-4 md:mb-6 p-3 md:p-4 rounded-2xl ${isSpecialPrice ? 'bg-green-500/20 border border-green-300' : 'bg-red-500/20 border border-red-300'} backdrop-blur-sm`}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 md:h-6 md:w-6 animate-pulse" />
                  <span className="text-sm md:text-lg font-bold">{isSpecialPrice ? '⏰ SPECIAL OFFER ENDS IN:' : '❌ OFFER EXPIRED'}</span>
                </div>
                <div className={`text-xl md:text-2xl font-bold ${isSpecialPrice ? 'text-yellow-300' : 'text-red-300'} font-mono`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          )}

          {isFlashSale && !offerExpired && (
            <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-xs md:text-sm font-bold inline-block mb-4 md:mb-6 animate-pulse border-2 border-yellow-300">
              ⚡ FLASH SALE: 20% OFF - {flashSaleTime}s LEFT!
            </div>
          )}
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            {offerExpired ? (
              <>
                Premium <span className="text-yellow-300">Growth</span><br />
                <span className="text-blue-300">Services</span>
              </>
            ) : (
              <>
                Premium <span className="text-yellow-300">Growth</span><br />
                <span className="text-blue-300">Services</span>
              </>
            )}
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-purple-100 max-w-4xl mx-auto font-medium">
            {offerExpired ? (
              "Get the best growth services for Instagram, Facebook, LinkedIn and more!"
            ) : (
              "Boost your social media presence with our premium growth services at unbeatable prices!"
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button onClick={scrollToServices} className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-bold transition-all hover:scale-105 hover:shadow-xl flex items-center gap-2 shadow-lg justify-center">
              <Rocket className="h-4 w-4 md:h-5 md:w-5" />
              View Growth Services
            </button>
            <button onClick={() => setIsFormOpen(true)} className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-bold transition-all hover:scale-105 hover:shadow-xl flex items-center gap-2 shadow-lg justify-center">
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
              Order Now
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-500">Growth Services</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Boost your social media presence with our premium growth services
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all ${
                  activeCategory === category.id
                    ? `${category.color} text-white shadow-lg transform scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categoryServices[activeCategory as keyof typeof categoryServices]?.map((service) => (
              <div key={service.id} className="bg-gradient-to-br from-white to-gray-50 border-2 border-blue-200 rounded-2xl p-6 relative overflow-hidden transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl">
                {!offerExpired && isFlashSale && (
                  <div className="absolute -top-2 -right-2 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold rotate-12 shadow-lg z-10 animate-pulse">
                    ⚡ 20% OFF
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    ₹{service.price.toFixed(2)} / 1000
                  </div>
                  {!offerExpired && isFlashSale && (
                    <div className="text-green-600 font-semibold text-sm">
                      Flash Sale: ₹{(service.price * 0.8).toFixed(2)} / 1000
                    </div>
                  )}
                </div>

                <ul className="space-y-2 mb-4 text-sm text-gray-700">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <button 
                    onClick={() => openPaymentModal(service)} 
                    className={`w-full py-3 rounded-xl font-bold transition-all hover:scale-105 text-center ${
                      offerExpired 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : isFlashSale
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                    }`}
                  >
                    {offerExpired 
                      ? 'Order Now' 
                      : isFlashSale 
                        ? '⚡ Grab 20% OFF Now!' 
                        : 'Order Now'
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-500 to-purple-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Boost Your Social Media Growth?
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Contact us now and get the best growth services!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button 
              onClick={() => window.open(`https://wa.me/91${WHATSAPP_NUMBER}`, '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-2 justify-center"
            >
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
              WhatsApp Now
            </button>
            <button 
              onClick={() => window.open(`tel:+91${WHATSAPP_NUMBER}`, '_blank')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 md:px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-2 justify-center"
            >
              <Phone className="h-4 w-4 md:h-5 md:w-5" />
              Call: +91 {WHATSAPP_NUMBER}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-blue-400">Premium Growth Services</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Your trusted partner for social media growth and online success.
              </p>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm md:text-base text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 {WHATSAPP_NUMBER}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@growthservices.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4">Connect With Us</h4>
              <div className="flex gap-3">
                <button 
                  onClick={() => window.open(`https://wa.me/91${WHATSAPP_NUMBER}`, '_blank')}
                  className="bg-green-500 hover:bg-green-600 p-2 rounded-lg transition-colors"
                >
                  <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                </button>
                <button 
                  onClick={() => window.open(`tel:+91${WHATSAPP_NUMBER}`, '_blank')}
                  className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg transition-colors"
                >
                  <Phone className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
            <p className="text-gray-400 text-sm md:text-base">
              © 2024 Premium Growth Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      {isPaymentOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border-2 border-purple-300">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-purple-500" />
                  Order {selectedService.name}
                </h3>
                <p className="text-purple-600 font-semibold text-sm mt-1">{selectedService.description}</p>
              </div>
              <button onClick={() => setIsPaymentOpen(false)} className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Quantity Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 100)}
                    disabled={quantity <= selectedService.min}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center disabled:opacity-50"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || selectedService.min)}
                    min={selectedService.min}
                    max={selectedService.max}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-center"
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 100)}
                    disabled={quantity >= selectedService.max}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-center">
                  Min: {selectedService.min} - Max: {selectedService.max.toLocaleString()}
                </div>
              </div>

              {/* Price Display */}
              <div className={`p-4 rounded-xl border-2 ${
                isFlashSale && !offerExpired ? 'bg-purple-50 border-purple-200' : 'bg-green-50 border-green-200'
              }`}>
                <div className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                    isFlashSale && !offerExpired ? 'text-purple-600' : 'text-green-600'
                  }`}>
                    ₹{paymentAmount.toLocaleString()}
                  </div>
                  <div className="font-semibold text-sm md:text-base">
                    {isFlashSale && !offerExpired ? 'Flash Sale 20% OFF!' : 'Total Amount'}
                  </div>
                  {isFlashSale && !offerExpired && (
                    <div className="text-gray-500 text-sm line-through mt-1">
                      Original: ₹{originalAmount.toLocaleString()}
                    </div>
                  )}
                  <div className="text-gray-600 text-sm mt-1">
                    {quantity.toLocaleString()} {selectedService.name}
                  </div>
                </div>
              </div>

              <button 
                onClick={initiateRazorpayPayment}
                className={`w-full py-3 md:py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg shadow-lg ${
                  isFlashSale && !offerExpired
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                }`}
              >
                <CreditCard className="h-4 w-4 md:h-5 md:w-5" />
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
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Check className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
                  Payment Successful! 🎉
                </h3>
                <p className="text-green-600 font-semibold text-sm mt-1">Complete your details to start service</p>
              </div>
              <button onClick={() => setIsSuccessFormOpen(false)} className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSuccessSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">UTR Number *</label>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile/Link *</label>
                <input 
                  type="text" 
                  name="link" 
                  required 
                  value={successFormData.link} 
                  onChange={handleSuccessFormChange} 
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Enter your Instagram/Facebook profile link" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <input 
                    type="text" 
                    name="service" 
                    required 
                    value={successFormData.service} 
                    onChange={handleSuccessFormChange} 
                    className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50" 
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input 
                    type="text" 
                    name="quantity" 
                    required 
                    value={successFormData.quantity} 
                    onChange={handleSuccessFormChange} 
                    className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50" 
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid</label>
                <input 
                  type="text" 
                  name="amount" 
                  required 
                  value={successFormData.amount} 
                  onChange={handleSuccessFormChange} 
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50" 
                  readOnly
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-3 md:py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-2 border-green-300"
              >
                <Send className="h-4 w-4 md:h-5 md:w-5" />
                Submit & Start Service
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border-2 border-purple-300">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  Place Your Order
                </h3>
                <p className="text-purple-600 font-semibold text-sm mt-1">Complete your order details and we'll start immediately</p>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                  placeholder="Enter your full name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                  placeholder="Enter your email" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                  placeholder="Enter your WhatsApp number" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                <select 
                  name="service" 
                  value={formData.service} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a growth service</option>
                  {allServices.map(service => (
                    <option key={service.id} value={service.name}>
                      {service.name} - ₹{service.price}/1000
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Requirements</label>
                <textarea 
                  name="message" 
                  rows={3} 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                  placeholder="Tell us about your growth requirements..." 
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-3 md:py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-2 border-purple-300"
              >
                <Send className="h-4 w-4 md:h-5 md:w-5" />
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowthServices;