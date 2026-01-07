import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Download, ExternalLink, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { portfolioData } from '../data/portfolioData';

const Header = () => {
  const { personal } = portfolioData;
  const [isVisible, setIsVisible] = useState(false);
  const [likedButtons, setLikedButtons] = useState(new Set());
  const { isDark } = useTheme();

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
    if (personal.cvDownloadUrl) {
      const link = document.createElement('a');
      link.href = personal.cvDownloadUrl;
      link.setAttribute('download', 'Jayraj-Kamalakar-CV.pdf'); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('CV download link not configured.');
    }
  };

  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(personal.fullAddress);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  const handleSocialClick = (platform, url) => {
    setLikedButtons(prev => new Set(prev).add(platform));
    setTimeout(() => {
      setLikedButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(platform);
        return newSet;
      });
    }, 2000);

    if (url) {
      window.open(url, '_blank');
    }
  };

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="header" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-cyan-900 to-indigo-900 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900 transition-colors duration-500">
      
      {/* Background Decor Elements */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 transition-colors duration-500"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-blue-600/30 dark:from-blue-400/20 dark:via-cyan-400/15 dark:to-blue-500/20 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-indigo-600/20 dark:from-cyan-400/15 dark:via-blue-400/10 dark:to-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000 -z-10"></div>
      
      <div className={`relative z-10 text-center text-white px-6 max-w-4xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Profile Image Section */}
        <div className="mb-12 relative group flex justify-center">
          <div className="w-48 h-48 relative transition-all duration-300 hover:scale-105">
            
            {/* 1. External Blurred Glow (The "Outer Border") */}
            <div className={`absolute -inset-4 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 ${
                isDark ? 'bg-blue-500/50' : 'bg-yellow-400/50'
            }`}></div>

            {/* 2. Main Photo/Initial Container */}
            <div className="absolute inset-0 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center text-6xl font-bold overflow-hidden z-10 shadow-2xl">
              {personal.profilePhoto ? (
                <img src={personal.profilePhoto} alt={personal.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white">{personal.initials}</span>
              )}
            </div>

            {/* 3. Tinted Inner Border (Overlay) */}
            <div className={`absolute inset-0 rounded-full border-[6px] transition-all duration-300 pointer-events-none z-20 ${
              isDark
                ? 'border-blue-400/30 group-hover:border-blue-400/60 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]'
                : 'border-yellow-400/40 group-hover:border-yellow-400/70 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]'
            }`}></div>

            {/* 4. Animated Ping Ring */}
            <div className={`absolute -inset-2 rounded-full animate-ping opacity-20 -z-10 ${
              isDark ? 'bg-blue-400' : 'bg-yellow-400'
            }`}></div>
          </div>
        </div>

        {/* Name and Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent cursor-default">
          {personal.name}
        </h1>
        <p className="text-2xl md:text-3xl text-blue-200 dark:text-blue-300 mb-8 font-light cursor-default">
          {personal.title}
        </p>

        {/* Quick Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-lg">
          <a href={`tel:${personal.phone}`} className="flex items-center gap-2 backdrop-blur-md bg-white/10 px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
            <Phone size={20} /> {personal.phone}
          </a>
          <a href={`mailto:${personal.email}`} className="flex items-center gap-2 backdrop-blur-md bg-white/10 px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
            <Mail size={20} /> {personal.email}
          </a>
          <button onClick={openGoogleMaps} className="flex items-center gap-2 backdrop-blur-md bg-white/10 px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
            <MapPin size={20} /> {personal.location}
          </button>
        </div>

        {/* Primary Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={handleDownloadCV} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl hover:scale-105 transition-all shadow-lg">
            <Download size={20} /> Download CV
          </button>
          <button onClick={scrollToContact} className="flex items-center gap-2 px-6 py-3 border-2 border-white/30 rounded-xl hover:bg-white/10 hover:scale-105 transition-all">
            <ExternalLink size={20} /> Get In Touch
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {[
            { id: 'github', icon: Github, url: personal.socialLinks.github },
            { id: 'linkedin', icon: Linkedin, url: personal.socialLinks.linkedin },
            { id: 'twitter', icon: Twitter, url: personal.socialLinks.twitter }
          ].map((social) => (
            <button
              key={social.id}
              onClick={() => handleSocialClick(social.id, social.url)}
              className={`relative p-3 backdrop-blur-md rounded-xl border border-white/20 transition-all hover:scale-110 ${
                likedButtons.has(social.id) ? 'bg-red-500/30' : 'bg-white/10'
              }`}
            >
              <social.icon size={24} />
              {likedButtons.has(social.id) && <Heart className="absolute -top-1 -right-1 w-3 h-3 text-red-400 animate-ping" />}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
      `}</style>
    </header>
  );
};

export default Header;