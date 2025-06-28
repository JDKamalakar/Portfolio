import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Header = () => {
  const { personal } = portfolioData;

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating blur elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        {/* Profile Image */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-6xl font-bold">
              {personal.initials}
            </div>
          </div>
          <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full bg-white/10 backdrop-blur-sm animate-ping"></div>
        </div>
        
        {/* Name and Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          {personal.name}
        </h1>
        <p className="text-2xl md:text-3xl text-blue-200 mb-8 font-light">{personal.title}</p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-lg">
          <a href={`tel:${personal.phone}`} className="flex items-center gap-2 hover:text-blue-300 transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
            <Phone size={20} />
            {personal.phone}
          </a>
          <a href={`mailto:${personal.email}`} className="flex items-center gap-2 hover:text-blue-300 transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
            <Mail size={20} />
            {personal.email}
          </a>
          <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
            <MapPin size={20} />
            {personal.location}
          </div>
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4">
          <a href={personal.socialLinks.github} className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all hover:scale-110">
            <Github size={24} />
          </a>
          <a href={personal.socialLinks.linkedin} className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all hover:scale-110">
            <Linkedin size={24} />
          </a>
          <a href={personal.socialLinks.twitter} className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all hover:scale-110">
            <Twitter size={24} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;