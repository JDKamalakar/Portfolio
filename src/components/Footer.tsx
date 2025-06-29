import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  const { personal } = portfolioData;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll to top button when user has scrolled down more than 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    // Smooth scroll to top with easing similar to regular scroll
    const scrollDuration = 800; // Duration in milliseconds
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 px-6 relative transition-all duration-700 ease-in-out rounded-t-3xl shadow-2xl border-t border-gray-700/50 dark:border-gray-600/30">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent dark:from-black/50 rounded-t-3xl pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 hover:text-blue-400 transition-colors duration-300 cursor-default">
            {personal.name}
          </h3>
          <p className="text-gray-400 dark:text-gray-500 mb-6 hover:text-gray-300 dark:hover:text-gray-400 transition-colors duration-300 cursor-default">
            {personal.title} | Software Developer
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <a 
              href={personal.socialLinks.github} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 dark:bg-gray-900 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:rotate-12 group shadow-lg hover:shadow-blue-500/25"
            >
              <Github size={20} className="group-hover:animate-pulse" />
            </a>
            <a 
              href={personal.socialLinks.linkedin} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 dark:bg-gray-900 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:rotate-12 group shadow-lg hover:shadow-blue-500/25"
            >
              <Linkedin size={20} className="group-hover:animate-pulse" />
            </a>
            <a 
              href={personal.socialLinks.twitter} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 dark:bg-gray-900 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:rotate-12 group shadow-lg hover:shadow-blue-500/25"
            >
              <Twitter size={20} className="group-hover:animate-pulse" />
            </a>
          </div>
          
          <div className="border-t border-gray-800 dark:border-gray-700 pt-8 transition-colors duration-500 rounded-t-lg">
            <p className="text-gray-400 dark:text-gray-500 flex items-center justify-center gap-2 mb-2 hover:text-gray-300 dark:hover:text-gray-400 transition-colors duration-300 cursor-default">
              Made with <Heart size={16} className="text-red-500 animate-pulse" /> by {personal.name.split(' ')[0]} {personal.name.split(' ')[1]}
            </p>
            <p className="text-gray-500 dark:text-gray-600 text-sm hover:text-gray-400 dark:hover:text-gray-500 transition-colors duration-300 cursor-default">
              © 2024 All rights reserved
            </p>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button - Enhanced with smooth animations */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-500 ease-out group z-40 backdrop-blur-sm border border-white/10 ${
          showScrollTop 
            ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
            : 'opacity-0 scale-75 translate-y-4 rotate-45'
        }`}
        style={{
          transform: showScrollTop 
            ? 'translateY(0) scale(1) rotate(0deg)' 
            : 'translateY(16px) scale(0.75) rotate(45deg)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp 
          size={24} 
          className="group-hover:animate-bounce transition-transform duration-300 group-hover:scale-110" 
        />
        
        {/* Ripple effect on hover */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10 scale-150"></div>
      </button>
    </footer>
  );
};

export default Footer;