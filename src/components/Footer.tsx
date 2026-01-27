import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  const { personal } = portfolioData;
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [likedButtons, setLikedButtons] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    const footerElement = document.querySelector('footer');
    let observer: IntersectionObserver;

    if (footerElement) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(footerElement);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

  return (
    <div className="bg-gray-900 dark:bg-black py-12 px-6 relative">
      <footer className={`max-w-8xl mx-auto relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        {/* MODIFIED: Added custom easing for scale and changed dark mode background color */}
        <div className={`backdrop-blur-xl bg-white/10 dark:bg-gray-900/25 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-12 relative overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transition-[box-shadow] duration-200 group hover:scale-[1.02] theme-glow`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-indigo-500/10 dark:from-blue-400/5 dark:via-cyan-400/5 dark:to-indigo-400/5 rounded-3xl"></div>
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:bg-gradient-to-br dark:from-blue-300/10 dark:to-cyan-300/10 rounded-full blur-2xl animate-pulse -z-10"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 dark:bg-gradient-to-br dark:from-cyan-300/10 dark:to-indigo-300/10 rounded-full blur-2xl animate-pulse delay-1000 -z-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 dark:bg-gradient-to-br dark:from-indigo-300/10 dark:to-blue-300/10 rounded-full blur-xl animate-bounce delay-500 -z-10"></div>

          <div className="relative z-10 text-center text-white">
            <h3 className="text-3xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300 cursor-default">
              {personal.name}
            </h3>
            <p className="text-gray-300 dark:text-gray-400 mb-8 text-lg hover:text-gray-200 dark:hover:text-gray-300 transition-colors duration-300 cursor-default">
              {personal.title} | Software Developer
            </p>

            <div className="flex justify-center gap-6 mb-10">
              <button
                onClick={() => handleSocialClick('github', personal.socialLinks.github)}
                className={`relative p-5 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 group/social shadow-lg border border-white/10 overflow-hidden theme-glow
                  ${likedButtons.has('github') ? 'animate-pulse bg-red-500/30 scale-125' : ''}
                `}
                aria-label="GitHub Profile"
              >
                <Github size={28} className="group-hover/social:animate-pulse text-white transition-transform duration-300 group-hover/social:scale-110 group-hover/social:rotate-12" />
                {likedButtons.has('github') && (
                  <>
                    <Heart className="absolute -top-2 -right-2 w-4 h-4 text-red-400 animate-ping" />
                    <Heart className="absolute -top-1 -left-1 w-3 h-3 text-red-400 animate-ping delay-200" />
                    <Heart className="absolute -bottom-1 right-0 w-3 h-3 text-red-400 animate-ping delay-400" />
                  </>
                )}
              </button>

              <button
                onClick={() => handleSocialClick('linkedin', personal.socialLinks.linkedin)}
                className={`relative p-5 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 group/social shadow-lg border border-white/10 overflow-hidden theme-glow
                  ${likedButtons.has('linkedin') ? 'animate-pulse bg-red-500/30 scale-125' : ''}
                `}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={28} className="group-hover/social:animate-pulse text-white transition-transform duration-300 group-hover/social:scale-110 group-hover/social:-rotate-12" />
                {likedButtons.has('linkedin') && (
                  <>
                    <Heart className="absolute -top-2 -right-2 w-4 h-4 text-red-400 animate-ping" />
                    <Heart className="absolute -top-1 -left-1 w-3 h-3 text-red-400 animate-ping delay-200" />
                    <Heart className="absolute -bottom-1 right-0 w-3 h-3 text-red-400 animate-ping delay-400" />
                  </>
                )}
              </button>

              <button
                onClick={() => handleSocialClick('twitter', personal.socialLinks.twitter)}
                className={`relative p-5 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 group/social shadow-lg border border-white/10 overflow-hidden theme-glow
                  ${likedButtons.has('twitter') ? 'animate-pulse bg-red-500/30 scale-125' : ''}
                `}
                aria-label="Twitter Profile"
              >
                <Twitter size={28} className="group-hover/social:animate-pulse text-white transition-transform duration-300 group-hover/social:scale-110 group-hover/social:rotate-12" />
                {likedButtons.has('twitter') && (
                  <>
                    <Heart className="absolute -top-2 -right-2 w-4 h-4 text-red-400 animate-ping" />
                    <Heart className="absolute -top-1 -left-1 w-3 h-3 text-red-400 animate-ping delay-200" />
                    <Heart className="absolute -bottom-1 right-0 w-3 h-3 text-red-400 animate-ping delay-400" />
                  </>
                )}
              </button>
            </div>

            <div className="relative mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent blur-sm"></div>
            </div>

            <div className="space-y-3">
              <p className="text-gray-300 dark:text-gray-400 flex items-center justify-center gap-2 mb-3 hover:text-gray-200 dark:hover:text-gray-300 transition-colors duration-300 cursor-default text-lg">
                Made with <Heart size={18} className="text-red-400 animate-pulse" /> by {personal.name.split(' ')[0]} {personal.name.split(' ')[1]}
              </p>
              <p className="text-gray-400 dark:text-gray-500 hover:text-gray-300 dark:hover:text-gray-400 transition-colors duration-300 cursor-default">
                © 2024 All rights reserved
              </p>
            </div>
          </div>

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        </div>

        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 rounded-3xl blur-2xl transform translate-y-4 opacity-50 -z-20"></div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 text-white rounded-2xl shadow-2xl transition-all duration-500 ease-out group z-50
          backdrop-blur-xs border border-white/30 hover:-translate-y-2
          bg-gradient-to-r from-blue-500/60 to-cyan-600/60 dark:from-blue-500/40 dark:to-cyan-600/40
          hover:from-blue-500/80 hover:to-cyan-600/80 dark:hover:from-blue-500/60 dark:hover:to-cyan-600/60
          ${showScrollTop
            ? 'opacity-100 scale-100 translate-y-0 rotate-0'
            : 'opacity-0 scale-75 translate-y-8 rotate-45'
          }
        `}
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
        <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"></div>
        <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10 scale-150 bg-gradient-to-r ${isDark ? 'from-blue-400 to-cyan-500' : 'from-yellow-400 to-amber-500'}`}></div>
      </button>
    </div>
  );
};

export default Footer;