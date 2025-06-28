import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  const { personal } = portfolioData;

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">{personal.name}</h3>
          <p className="text-gray-400 mb-6">{personal.title} | Software Developer</p>
          
          <div className="flex justify-center gap-4 mb-8">
            <a href={personal.socialLinks.github} className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors">
              <Github size={20} />
            </a>
            <a href={personal.socialLinks.linkedin} className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href={personal.socialLinks.twitter} className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 flex items-center justify-center gap-2">
              Made with <Heart size={16} className="text-red-500" /> by {personal.name.split(' ')[0]} {personal.name.split(' ')[1]}
            </p>
            <p className="text-gray-500 text-sm mt-2">© 2024 All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;