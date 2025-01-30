import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importing social media icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900 p-8 text-white">
      <div className="container mx-auto text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Address */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">123 Blog Street, Blog City, Country</p>
            <p className="mb-2">Phone: +123 456 7890</p>
            <p>Email: <a href="mailto:info@myblog.com" className="text-yellow-300">info@myblog.com</a></p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-yellow-300">Home</a></li>
              <li><a href="/about" className="hover:text-yellow-300">About</a></li>
              <li><a href="/contact" className="hover:text-yellow-300">Contact</a></li>
              <li><a href="/subscribe" className="hover:text-yellow-300">Subscribe</a></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-3xl hover:text-yellow-300 transition duration-300" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-3xl hover:text-yellow-300 transition duration-300" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-3xl hover:text-yellow-300 transition duration-300" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-3xl hover:text-yellow-300 transition duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-8 border-t-2 border-yellow-300 pt-4">
          <p>&copy; 2024 My Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
