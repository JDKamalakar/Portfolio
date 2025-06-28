import React from 'react';
import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 px-6 relative transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
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
              className="p-3 bg-gray-800 dark:bg-gray-900 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:rotate-12 group"
            >
              <Github size={20} className="group-hover:animate-pulse" />
            </a>
            <a 
              href={personal.socialLinks.linkedin} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 dark:bg-gray-900 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:rotate-12 group"
            >
              <Linkedin size={20} className="group-hover:animate-pulse" />
            </a>
            <a 
              href={personal.socialLinks.twitter} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 dark:bg-gray-900 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:rotate-12 group"
            >
              <Twitter size={20} className="group-hover:animate-pulse" />
            </a>
          </div>
          
          <div className="border-t border-gray-800 dark:border-gray-700 pt-8 transition-colors duration-500">
            <p className="text-gray-400 dark:text-gray-500 flex items-center justify-center gap-2 mb-2 hover:text-gray-300 dark:hover:text-gray-400 transition-colors duration-300 cursor-default">
              Made with <Heart size={16} className="text-red-500 animate-pulse" /> by {personal.name.split(' ')[0]} {personal.name.split(' ')[1]}
            </p>
            <p className="text-gray-500 dark:text-gray-600 text-sm hover:text-gray-400 dark:hover:text-gray-500 transition-colors duration-300 cursor-default">
              © 2024 All rights reserved
            </p>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="group-hover:animate-bounce" />
      </button>
    </footer>
  );
};

export default Footer;