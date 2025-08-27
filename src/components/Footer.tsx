import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../images/cr_logo1.png';

const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.substring(2));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${id}`;
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Career Redefine Logo" className="h-10" />
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Redefining careers with premium quality Data Science and AI education, made affordable for every ambitious professional.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>info@careerredefine.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+91 9535713363</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('/#about')} className="text-gray-400 hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => scrollToSection('/#curriculum')} className="text-gray-400 hover:text-white transition-colors">Curriculum</button></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Apply Now</Link></li>
              <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            © 2025 Career Redefine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
