import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, MessageCircle, ArrowUp } from "lucide-react";

type NavItem = { name: string; href: string };
const primaryNav: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

const legalNav: NavItem[] = [
  { name: "Onboarding Agreement", href: "/onboarding-agreement" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [legalOpen, setLegalOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // WhatsApp B2B form state
  const [waOpen, setWaOpen] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".legal-dropdown")) {
        setLegalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${linkBase} bg-purple-600 text-white shadow-md`
      : `${linkBase} text-gray-700 hover:bg-purple-50 hover:text-purple-600`;

  // Handle WhatsApp B2B submit
  const handleWASubmit = () => {
    if (!name || !business || !mobile || !email) {
      alert("Please fill all fields");
      return;
    }
    const url = `https://wa.me/9779705595919?text=Hello%20DiziGrow,%0AName:%20${encodeURIComponent(
      name
    )}%0ABusiness:%20${encodeURIComponent(
      business
    )}%0AMobile:%20${encodeURIComponent(
      mobile
    )}%0AEmail:%20${encodeURIComponent(email)}%0AI%20want%20to%20Join%20as%20B2B.`;
    window.open(url, "_blank");
    setWaOpen(false);
    setName("");
    setBusiness("");
    setMobile("");
    setEmail("");
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center space-x-4 hover:scale-105 transition-transform duration-200"
                aria-label="1"
              >
                <div className="flex-shrink-0">
                  <img
                    src="/logo.svg"
                    alt="360EagleWeb Logo"
                    className="h-16 w-16 object-contain" // proper size
                    style={{ filter: "invert(0)" }} // black logo
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span
                    className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
                    style={{
                      fontFamily: '"Haboro Serif", serif',
                      fontWeight: 700,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {/* 360EagleWeb */}
                  </span>
                  <span
                    className="text-xs text-gray-500 -mt-1"
                    style={{ fontFamily: '"Haboro Serif", serif' }}
                  >
                    {/* Digital Growth Partners */}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {primaryNav.map((item) => (
                <NavLink key={item.name} to={item.href} className={navClass} end={item.href === "/"}>
                  {item.name}
                </NavLink>
              ))}

              {/* Legal dropdown */}
              <div className="relative legal-dropdown">
                <button
                  className={`${linkBase} text-gray-700 hover:bg-purple-50 hover:text-purple-600 flex items-center gap-1 transition-all duration-200 ${
                    legalOpen ? "bg-purple-50 text-purple-600" : ""
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={legalOpen}
                  onClick={() => setLegalOpen((v) => !v)}
                >
                  Legal
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      legalOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {legalOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl p-2 animate-in fade-in-0 zoom-in-95"
                    onMouseLeave={() => setLegalOpen(false)}
                  >
                    {legalNav.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                            isActive ? "bg-purple-600 text-white shadow-md" : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                          }`
                        }
                        role="menuitem"
                        onClick={() => setLegalOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => setWaOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Join as B2B</span>
              </button>
              <NavLink
                to="/services"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 px-4 py-2 rounded-lg font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                <span>🦅</span>
                <span>Order Now - ₹99</span>
              </NavLink>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen((v) => !v)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden animate-in fade-in-50 slide-in-from-top-5 duration-200">
              <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white border-t border-gray-100 shadow-xl">
                {primaryNav.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `block px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                        isActive ? "bg-purple-600 text-white shadow-md" : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}

                {/* Legal mobile */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="px-3 py-2 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Legal Documents
                  </div>
                  {legalNav.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `block px-3 py-3 rounded-lg text-base transition-colors duration-200 ${
                          isActive ? "bg-purple-600 text-white shadow-md" : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>

                {/* Mobile CTAs */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => { setWaOpen(true); setIsOpen(false); }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-center flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Join as B2B
                  </button>
                  <NavLink
                    to="/services"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 px-4 py-3 rounded-lg font-bold transition-all duration-200 text-center flex items-center justify-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>🦅</span>
                    Order Now - ₹99
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}

      {/* WhatsApp B2B Popup */}
      {waOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-xl relative">
            <button
              onClick={() => setWaOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-center">Join as B2B</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Business Name"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleWASubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-all"
            >
              Continue to WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;