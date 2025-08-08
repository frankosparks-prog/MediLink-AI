// src/components/Footer.jsx
const Footer = () => (
  <footer className="bg-blue-50 text-center text-sm py-4 text-gray-600 flex gap-2 items-center justify-center">
    &copy; {new Date().getFullYear()} MediLink AI. All rights reserved.
    <img
      src="/MediLink-Logo.png"
      alt="MediLink AI Logo"
      className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
      draggable={false}
    />
  </footer>
);

export default Footer;
