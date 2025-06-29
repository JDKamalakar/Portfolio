import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Download, ExternalLink, Camera } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Header = () => {
  const { personal } = portfolioData;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const headerElement = document.getElementById('header');
    if (headerElement) {
      observer.observe(headerElement);
    }

    return () => observer.disconnect();
  }, []);

  const handleDownloadCV = () => {
    // Simulate CV download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual CV URL
    link.download = `${personal.name.replace(' ', '_')}_CV.pdf`;
    link.click();
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload this to your server
      // For now, we'll just show an alert
      alert('Photo upload functionality would be implemented here. Update the profilePhoto URL in portfolioData.ts');
    }
  };

  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(personal.fullAddress);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <header id="header" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 transition-colors duration-500"></div>
      
      {/* Floating blur elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 dark:bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 dark:bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 dark:bg-indigo-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      <div className={`relative z-10 text-center text-white px-6 max-w-4xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Profile Image */}
        <div className="mb-8 relative group">
          <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 cursor-pointer relative">
            {/* Profile Photo Container */}
            <div className="w-full h-full rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center text-6xl font-bold transition-colors duration-300 group-hover:bg-gray-700 dark:group-hover:bg-gray-600 overflow-hidden">
              {personal.profilePhoto ? (
                <img 
                  src={personal.profilePhoto} 
                  alt={personal.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                personal.initials
              )}
            </div>
            
            {/* Hidden Photo Upload Input */}
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
          
          <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full bg-white/10 backdrop-blur-sm animate-ping opacity-20"></div>
        </div>
        
        {/* Name and Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent hover:from-blue-200 hover:to-purple-200 transition-all duration-300 cursor-default">
          {personal.name}
        </h1>
        <p className="text-2xl md:text-3xl text-blue-200 dark:text-blue-300 mb-8 font-light hover:text-blue-100 dark:hover:text-blue-200 transition-colors duration-300 cursor-default">{personal.title}</p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-lg">
          <a 
            href={`tel:${personal.phone}`} 
            className="flex items-center gap-2 hover:text-blue-300 dark:hover:text-blue-200 transition-all duration-300 backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 group border border-white/20"
          >
            <Phone size={20} className="group-hover:animate-pulse" />
            {personal.phone}
          </a>
          <a 
            href={`mailto:${personal.email}`} 
            className="flex items-center gap-2 hover:text-blue-300 dark:hover:text-blue-200 transition-all duration-300 backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 group border border-white/20"
          >
            <Mail size={20} className="group-hover:animate-pulse" />
            {personal.email}
          </a>
          <button
            onClick={openGoogleMaps}
            className="flex items-center gap-2 backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer hover:text-blue-300 dark:hover:text-blue-200 border border-white/20"
          >
            <MapPin size={20} className="group-hover:animate-pulse" />
            {personal.location}
          </button>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleDownloadCV}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group backdrop-blur-sm border border-white/20"
          >
            <Download size={20} className="group-hover:animate-bounce" />
            Download CV
          </button>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 border-2 border-white/30 hover:border-white/50 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/10 group backdrop-blur-sm"
          >
            <ExternalLink size={20} className="group-hover:animate-pulse" />
            Get In Touch
          </a>
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4">
          <a 
            href={personal.socialLinks.github} 
            className="p-3 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:rotate-12 group border border-white/20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={24} className="group-hover:animate-pulse" />
          </a>
          <a 
            href={personal.socialLinks.linkedin} 
            className="p-3 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:rotate-12 group border border-white/20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} className="group-hover:animate-pulse" />
          </a>
          <a 
            href={personal.socialLinks.twitter} 
            className="p-3 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:rotate-12 group border border-white/20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={24} className="group-hover:animate-pulse" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;