import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Brand/Logo section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Cal Fynn Construction</h3>
            <p className="text-slate-400 text-sm">
              Quality custom construction in Palo Alto
            </p>
          </div>

          {/* Links section */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link 
              href="/terms-of-service" 
              className="text-slate-300 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link 
              href="/privacy-policy" 
              className="text-slate-300 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-slate-700 mt-6 pt-6 text-center">
          <p className="text-slate-400 text-sm">
            © 2025 Cal Fynn Construction. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;