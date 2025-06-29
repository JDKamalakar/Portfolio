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
    <div className="bg-gray-900 dark:bg-black py-8 px-6 relative">
      {/* Floating Footer Container */}
      <footer className="max-w-5xl mx-auto relative">
        {/* Main floating card */}
        <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8 relative overflow-hidden hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 group">
          {/* Floating background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 dark:from-blue-400/5 dark:via-purple-400/5 dark:to-indigo-400/5 rounded-3xl"></div>
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-400/20 dark:bg-blue-300/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-400/20 dark:bg-purple-300/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center text-white">
            <h3 className="text-2xl font-bold mb-4 hover:text-blue-400 transition-colors duration-300 cursor-default">
              {personal.name}
            </h3>
            <p className="text-gray-300 dark:text-gray-400 mb-6 hover:text-gray-200 dark:hover:text-gray-300 transition-colors duration-300 cursor-default">
              {personal.title} | Software Developer
            </p>
            
            {/* Social Links with enhanced floating effect */}
            <div className="flex justify-center gap-4 mb-8">
              <a 
                href={personal.socialLinks.github} 
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-blue-500/30 dark:hover:bg-blue-600/30 transition-all duration-300 hover:scale-110 hover:-translate-y-2 group/social shadow-lg hover:shadow-blue-500/25 border border-white/10"
              >
                <Github size={24} className="group-hover/social:animate-pulse text-white" />
              </a>
              <a 
                href={personal.socialLinks.linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-blue-500/30 dark:hover:bg-blue-600/30 transition-all duration-300 hover:scale-110 hover:-translate-y-2 group/social shadow-lg hover:shadow-blue-500/25 border border-white/10"
              >
                <Linkedin size={24} className="group-hover/social:animate-pulse text-white" />
              </a>
              <a 
                href={personal.socialLinks.twitter} 
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-blue-500/30 dark:hover:bg-blue-600/30 transition-all duration-300 hover:scale-110 hover:-translate-y-2 group/social shadow-lg hover:shadow-blue-500/25 border border-white/10"
              >
                <Twitter size={24} className="group-hover/social:animate-pulse text-white" />
              </a>
            </div>
            
            {/* Divider with floating effect */}
            <div className="relative mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent blur-sm"></div>
            </div>
            
            {/* Copyright section */}
            <div className="space-y-2">
              <p className="text-gray-300 dark:text-gray-400 flex items-center justify-center gap-2 mb-2 hover:text-gray-200 dark:hover:text-gray-300 transition-colors duration-300 cursor-default">
                Made with <Heart size={16} className="text-red-400 animate-pulse" /> by {personal.name.split(' ')[0]} {personal.name.split(' ')[1]}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm hover:text-gray-300 dark:hover:text-gray-400 transition-colors duration-300 cursor-default">
                © 2024 All rights reserved
              </p>
            </div>
          </div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        </div>
        
        {/* Enhanced floating shadow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl blur-2xl transform translate-y-4 opacity-50"></div>
      </footer>
      
      {/* Enhanced Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 ease-out group z-50 backdrop-blur-sm border border-white/20 hover:-translate-y-2 ${
          showScrollTop 
            ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
            : 'opacity-0 scale-75 translate-y-8 rotate-45'
        }`}
        style={{
          transform: showScrollTop 
            ? 'translateY(0) scale(1) rotate(0deg)' 
            : 'translateY(32px) scale(0.75) rotate(45deg)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp 
          size={24} 
          className="group-hover:animate-bounce transition-transform duration-300 group-hover:scale-110" 
        />
        
        {/* Enhanced ripple effect */}
        <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700 ease-out opacity-0 group-hover:opacity-100"></div>
        
        {/* Enhanced glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10 scale-150"></div>
      </button>
    </div>
  );
};

export default Footer;