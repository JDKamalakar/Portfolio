import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Download, ExternalLink, Camera, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { portfolioData } from '../data/portfolioData';

const Header = () => {
  const { personal } = portfolioData;
  const [isVisible, setIsVisible] = useState(false);
  const [likedButtons, setLikedButtons] = useState<Set<string>>(new Set());
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
        // --- 1. Create a temporary anchor element ---
        const link = document.createElement('a');

        // --- 2. Set the link URL (the correct path) ---
        link.href = personal.cvDownloadUrl;

        // --- 3. Use the 'download' attribute to tell the browser to download the file ---
        // This attribute ensures the browser treats it as a file, not a page.
        link.setAttribute('download', 'Jayraj-Kamalakar-CV.pdf'); 

        // --- 4. Append and click the link to trigger the download ---
        // This is a programmatic way to trigger a click that respects the 'download' attribute.
        // It should also bypass any single-page application router logic.
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
      alert('CV download link not configured. Please update the cvDownloadUrl in portfolioData.ts');
    }
  };

  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(personal.fullAddress);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  const handleSocialClick = (platform: string, url: string) => {
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
    } else {
      console.warn(`Social link for ${platform} is missing or invalid.`);
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
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 transition-colors duration-500"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-blue-600/30 dark:from-blue-400/20 dark:via-cyan-400/15 dark:to-blue-500/20 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-indigo-600/20 dark:from-cyan-400/15 dark:via-blue-400/10 dark:to-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-indigo-500/20 via-blue-500/15 to-cyan-600/20 dark:from-indigo-400/15 dark:via-blue-400/10 dark:to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-500 -z-10"></div>
      <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-cyan-400/25 to-blue-500/25 dark:from-cyan-300/15 dark:to-blue-400/15 rounded-full blur-2xl animate-bounce delay-700 -z-10"></div>
      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-400/25 to-indigo-500/25 dark:from-blue-300/15 dark:to-indigo-400/15 rounded-full blur-2xl animate-bounce delay-1200 -z-10"></div>
      <div className="absolute top-1/3 left-10 w-6 h-6 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-sm" style={{ animation: 'drift 10s ease-in-out infinite', animationDelay: '0s' }}></div>
      <div className="absolute bottom-1/3 right-10 w-8 h-8 bg-cyan-400/30 dark:bg-cyan-600/20 rounded-full blur-sm" style={{ animation: 'drift 12s ease-in-out infinite reverse', animationDelay: '2s' }}></div>
      <div className="absolute top-2/3 left-1/4 w-4 h-4 bg-indigo-400/30 dark:bg-indigo-600/20 rounded-full blur-sm" style={{ animation: 'float 8s ease-in-out infinite', animationDelay: '1s' }}></div>
      
      <div className={`relative z-10 text-center text-white px-6 max-w-4xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Profile Image */}
        <div className="mb-8 relative group">
          <div className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-r p-1 shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer relative hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] ${isDark ? 'from-blue-500 to-cyan-600' : 'from-yellow-400 to-amber-500'}`}>
            <div className="w-full h-full rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center text-6xl font-bold transition-colors duration-300 group-hover:bg-gray-700 dark:group-hover:bg-gray-600 overflow-hidden">
              {personal.profilePhoto ? (
                <img src={personal.profilePhoto} alt={personal.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                personal.initials
              )}
            </div>
            <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full bg-white/10 backdrop-blur-sm animate-ping opacity-20 -z-10"></div>
          </div>
        </div>

        {/* Name and Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent hover:from-blue-200 hover:to-cyan-200 transition-all duration-300 cursor-default">
          {personal.name}
        </h1>
        <p className="text-2xl md:text-3xl text-blue-200 dark:text-blue-300 mb-8 font-light hover:text-blue-100 dark:hover:text-blue-200 transition-colors duration-300 cursor-default">{personal.title}</p>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-lg">
          <a
            href={`tel:${personal.phone}`}
            className="flex items-center gap-2 hover:text-blue-300 dark:hover:text-blue-200 transition-colors duration-300 backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 group border border-white/20 transition-transform duration-300 transition-[box-shadow] duration-200 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
          >
            <Phone size={20} className="group-hover:animate-pulse group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            {personal.phone}
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-2 hover:text-blue-300 dark:hover:text-blue-200 transition-colors duration-300 backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 group border border-white/20 transition-transform duration-300 transition-[box-shadow] duration-200 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
          >
            <Mail size={20} className="group-hover:animate-pulse group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
            {personal.email}
          </a>
          <button
            onClick={openGoogleMaps}
            className="flex items-center gap-2 backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-300 hover:scale-105 group cursor-pointer hover:text-blue-300 dark:hover:text-blue-200 border border-white/20 transition-transform duration-300 transition-[box-shadow] duration-200 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
          >
            <MapPin size={20} className="group-hover:animate-pulse group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            {personal.location}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleDownloadCV}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-xl transition-all duration-300 hover:scale-105 group backdrop-blur-sm border border-white/20 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
          >
            <Download size={20} className="group-hover:animate-bounce group-hover:scale-110 transition-all duration-300" />
            Download CV
          </button>
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 px-6 py-3 border-2 border-white/30 hover:border-white/50 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 group backdrop-blur-sm hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
          >
            <ExternalLink size={20} className="group-hover:animate-pulse group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            Get In Touch
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleSocialClick('github', personal.socialLinks.github)}
            className={`relative p-3 backdrop-blur-md rounded-xl transition-all duration-300 hover:scale-110 group border border-white/20 overflow-hidden hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
              ${likedButtons.has('github') ? 'bg-red-500/30 scale-125' : 'bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10'}
            `}
            aria-label="GitHub Profile"
          >
            <Github size={24} className={`transition-transform duration-300 ${likedButtons.has('github') ? 'scale-125 rotate-12' : 'group-hover:animate-pulse group-hover:scale-125 group-hover:-rotate-12'}`} />
            {likedButtons.has('github') && (<> <Heart className="absolute -top-1 -right-1 w-3 h-3 text-red-400 animate-ping" /> <Heart className="absolute -top-0 -left-0 w-2 h-2 text-red-400 animate-ping delay-200" /> </>)}
          </button>
          <button
            onClick={() => handleSocialClick('linkedin', personal.socialLinks.linkedin)}
            className={`relative p-3 backdrop-blur-md rounded-xl transition-all duration-300 hover:scale-110 group border border-white/20 overflow-hidden hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
              ${likedButtons.has('linkedin') ? 'bg-red-500/30 scale-125' : 'bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10'}
            `}
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={24} className={`transition-transform duration-300 ${likedButtons.has('linkedin') ? 'scale-125 -rotate-12' : 'group-hover:animate-pulse group-hover:scale-125 group-hover:rotate-12'}`} />
            {likedButtons.has('linkedin') && (<> <Heart className="absolute -top-1 -right-1 w-3 h-3 text-red-400 animate-ping" /> <Heart className="absolute -top-0 -left-0 w-2 h-2 text-red-400 animate-ping delay-200" /> </>)}
          </button>
          <button
            onClick={() => handleSocialClick('twitter', personal.socialLinks.twitter)}
            className={`relative p-3 backdrop-blur-md rounded-xl transition-all duration-300 hover:scale-110 group border border-white/20 overflow-hidden hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
              ${likedButtons.has('twitter') ? 'bg-red-500/30 scale-125' : 'bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10'}
            `}
            aria-label="Twitter Profile"
          >
            <Twitter size={24} className={`transition-transform duration-300 ${likedButtons.has('twitter') ? 'scale-125 rotate-12' : 'group-hover:animate-pulse group-hover:scale-125 group-hover:-rotate-12'}`} />
            {likedButtons.has('twitter') && (<> <Heart className="absolute -top-1 -right-1 w-3 h-3 text-red-400 animate-ping" /> <Heart className="absolute -top-0 -left-0 w-2 h-2 text-red-400 animate-ping delay-200" /> </>)}
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes drift {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(50px) translateY(-30px); }
          50% { transform: translateX(20px) translateY(-60px); }
          75% { transform: translateX(-20px) translateY(-30px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.1); }
        }
      `}</style>
    </header>
  );
};

export default Header;
