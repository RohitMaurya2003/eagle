import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Terms from './pages/Terms'; 
import OnboardingAgreement from './pages/OnboardingAgreement'; 
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import Offer from './pages/Offer';
import GrowthServices from './pages/GrowthServices';
function App() {
  return (
    <Router>
      {/* Global SEO + GA4 */}
      <Helmet>
        {/* GA4 Tracking */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M92TJDJ055"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M92TJDJ055');
          `}
        </script>
        
        {/* ✅ Razorpay Script for Payment Functionality */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/onboarding-agreement" element={<OnboardingAgreement />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/growth-services" element={<GrowthServices />} />
            
            <Route path="/Offer" element={<Offer />} />
            
            {/* ✅ PAYMENT SUCCESS PAGE */}
            <Route path="/payment/success" element={
              <div className="min-h-screen flex items-center justify-center bg-green-50 py-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-4">
                  <div className="text-green-500 text-6xl mb-4">✅</div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
                  <p className="text-gray-600 mb-6">
                    Thank you for your payment. We've received your order and will contact you within 24 hours.
                  </p>
                  <div className="space-y-3">
                    <a 
                      href="/" 
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors block"
                    >
                      Return to Home
                    </a>
                    <a 
                      href="https://wa.me/919521281509" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors block"
                    >
                      💬 WhatsApp Support
                    </a>
                  </div>
                </div>
              </div>
            } />
            
            {/* ✅ PAYMENT FAILED PAGE */}
            <Route path="/payment/failed" element={
              <div className="min-h-screen flex items-center justify-center bg-red-50 py-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-4">
                  <div className="text-red-500 text-6xl mb-4">❌</div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
                  <p className="text-gray-600 mb-6">
                    Your payment could not be processed. Please try again or contact our support team.
                  </p>
                  <div className="space-y-3">
                    <a 
                      href="/pricing" 
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors block"
                    >
                      Try Again
                    </a>
                    <a 
                      href="https://wa.me/919521281509" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors block"
                    >
                      💬 WhatsApp Support
                    </a>
                    <a 
                      href="tel:+919521281509"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors block"
                    >
                      📞 Call Support
                    </a>
                  </div>
                </div>
              </div>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;