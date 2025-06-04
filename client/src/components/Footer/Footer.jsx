import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Subscribe Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Easy Stay Connected</h2>
            <p className="mb-4">Subscribe to our newsletter for the latest updates.</p>
            <button className="bg-blue-500 hover:bg-red-500 text-white px-4 py-2 rounded">
              Subscribe
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Living Rooms</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Packages & Discounts</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Photo Gallery</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Privacy & Policy</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Our Services</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Booking</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Cancel Booking</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Hotel Services</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Terms & Social Media */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Terms & Social</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
              <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
              <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
              <a href="#" className="hover:text-blue-700"><FaLinkedinIn /></a>
            </div>
          </div>

        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
