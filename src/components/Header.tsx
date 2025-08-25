import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../images/cr_logo1.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/${id}`;
    } else {
      const element = document.getElementById(id.substring(1));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-sm border-b border-slate-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 pl-4">
            <img src={logo} alt="Career Redefine Logo" className="h-9" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('#curriculum')} className="text-gray-300 hover:text-white transition-colors">Curriculum</button>
            <button onClick={() => scrollToSection('#about')} className="text-gray-300 hover:text-white transition-colors">About</button>
            <Link 
              to="/register"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold"
            >
              Book Interview
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4 items-center">
              <button onClick={() => scrollToSection('#curriculum')} className="text-gray-300 hover:text-white transition-colors">Curriculum</button>
              <button onClick={() => scrollToSection('#about')} className="text-gray-300 hover:text-white transition-colors">About</button>
              <Link 
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold text-center w-full mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Interview
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
