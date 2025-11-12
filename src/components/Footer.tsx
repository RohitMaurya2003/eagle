import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Linkedin,
  Facebook,
  X
} from "lucide-react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, mobile, address, email, message } = formData;

    if (!name || !mobile || !address || !email) {
      alert("Please fill all required fields!");
      return;
    }

    const whatsappNumber = "919310533973";
    const text = `📩 *New B2B Lead Inquiry*

*Name:* ${name}
*Mobile:* ${mobile}
*Email:* ${email}
*Address:* ${address}
*Message:* ${message || "No additional message"}

Let's grow business together 🚀`;

    const encodedText = encodeURIComponent(text);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
    window.open(whatsappLink, "_blank");
    setShowModal(false);
  };

  return (
    <>
      {/* FOOTER SECTION */}
      <footer className="bg-gray-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand + Contact Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 bg-white p-3 rounded-full"> {/* White bg for logo */}
                  <img
                    src="/logo.svg"
                    alt="360EagleWeb Logo"
                    className="h-16 w-16 object-contain"
                  />
                </div>
              </div>

              <p className="text-gray-300 mb-6 max-w-md text-lg leading-relaxed">
                Creative Digital Solutions That Deliver Growth 🚀
                <br />
                We provide branding, digital marketing, and web development solutions that help you succeed online.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-purple-400" />
                  <a href="tel:+919310533973" className="hover:text-purple-300 text-lg">
                    +91 93105 33973
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-purple-400" />
                  <a
                    href="mailto:info@360eagleweb.com"
                    className="hover:text-purple-300 text-lg"
                  >
                    info@360eagleweb.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  <span className="text-lg">
                   Greater Noida, Uttar Pradesh 201306
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "Services", path: "/services" },
                  { name: "Pricing", path: "/pricing" },
                  { name: "Contact", path: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-purple-400 text-lg block py-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal + Social */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Legal</h3>
              <ul className="space-y-3 mb-8">
                {[
                  { name: "Onboarding Agreement", path: "/onboarding-agreement" },
                  { name: "Terms of Service", path: "/terms" },
                  { name: "Privacy Policy", path: "/privacy" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-purple-400 text-lg block py-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Follow Us</h3>
              <div className="flex space-x-4 mb-6">
                {[
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    color: "text-green-400 hover:text-green-300",
                  },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/360eagleweb/",
                    color: "text-gray-300 hover:text-pink-400",
                    label: "Instagram",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/company/360eagleweb/",
                    color: "text-gray-300 hover:text-blue-400",
                    label: "LinkedIn",
                  },
                  {
                    icon: Facebook,
                    href: "https://www.facebook.com/360eagleweb/",
                    color: "text-gray-300 hover:text-blue-500",
                    label: "Facebook",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href || "#"}
                    onClick={
                      social.label === "WhatsApp"
                        ? (e) => {
                            e.preventDefault();
                            setShowModal(true);
                          }
                        : undefined
                    }
                    target={social.href ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`${social.color} transition-colors duration-200 hover:scale-110 transform`}
                  >
                    <social.icon className="h-7 w-7" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-300 text-lg mb-2">
              © {year} 360EagleWeb. All rights reserved.
            </p>
            <p className="text-gray-400 text-md">
              Made with ❤️ in India | Empowering Businesses Digitally
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Website designed & developed by <strong>Vivek Singh</strong>
            </p>
          </div>
        </div>
      </footer>

      {/* ✅ WhatsApp Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Join as B2B
            </h2>
            <form onSubmit={handleWhatsAppSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <textarea
                name="message"
                placeholder="Message (optional)"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Start Conversation
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;