
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Update Bill', path: '/update-bill' }
  ];

  const RoseIcon = () => (
    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22v-6.5m0 0C12 10.5 15.5 8 18 8c-2.5 0-6 2.5-6 7.5zm0 0C12 10.5 8.5 8 6 8c2.5 0 6 2.5 6 7.5zM12 10c0-3.5 1.5-6 3.5-6C13.5 4 12 6.5 12 10zm0 0c0-3.5-1.5-6-3.5-6C10.5 4 12 6.5 12 10z" />
    </svg>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-600/95 backdrop-blur-md border-b border-emerald-500/30 shadow-lg shadow-emerald-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <RoseIcon />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Bhatora Golap Sangha</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-emerald-50 hover:text-white text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-emerald-50 hover:text-white text-sm font-medium transition-colors">
              Contact Us
            </button>
            <Link 
              to="/dashboard" 
              className="bg-white text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-white hover:bg-emerald-500/50 p-2 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-emerald-700/95 border-t border-emerald-500/20 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-3 py-3 rounded-md text-base font-medium text-emerald-50 hover:text-white hover:bg-emerald-600 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full text-center py-3 text-emerald-50 hover:text-white text-base font-medium border border-emerald-500/30 rounded-xl transition-colors">
              Contact Us
            </button>
            <Link 
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-white text-emerald-600 text-center py-3 rounded-xl text-base font-bold shadow-md active:scale-[0.98] transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
