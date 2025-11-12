import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppFloat = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!name || !business || !mobile || !email) {
      alert('Please fill all fields');
      return;
    }
    const url = `https://wa.me/9779705595919?text=Hello%20DiziGrow,%0AName:%20${encodeURIComponent(
      name
    )}%0ABusiness:%20${encodeURIComponent(
      business
    )}%0AMobile:%20${encodeURIComponent(
      mobile
    )}%0AEmail:%20${encodeURIComponent(email)}%0AI%20want%20to%20Join%20as%20B2B.`;
    window.open(url, '_blank');
    setOpen(false);
    setName('');
    setBusiness('');
    setMobile('');
    setEmail('');
  };

  return (
    <>
      {/* Floating WhatsApp Button - RIGHT SIDE MIDDLE POSITION */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 animate-pulse flex items-center gap-2"
        aria-label="Join as B2B"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="hidden md:inline font-medium text-sm">Join as B2B</span>
      </button>

      {/* Popup Form */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-xl relative">
            <button
              onClick={() => setOpen(false)}
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
              onClick={handleSubmit}
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

export default WhatsAppFloat;