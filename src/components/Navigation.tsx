import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Award, GraduationCap, FolderOpen, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext'; // You need to provide a ThemeContext

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('header');
  const [isScrolled, setIsScrolled] = useState(false); // 1. Added state for scroll detection
  const { isDark } = useTheme(); // Hook to get the current theme state

  const navItems = [
    { id: 'header', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 2. Added logic to update isScrolled state for the "tuck-in" effect
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Add smooth scroll behavior with offset for fixed navigation
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ 
        top: offsetTop, 
        behavior: 'smooth' 
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button with enhanced transparency */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        // 3. Updated className to be dynamic based on isScrolled state
        className={`fixed z-50 p-3 rounded-2xl backdrop-blur-xl bg-white/15 dark:bg-gray-800/15 border border-gray-300/20 dark:border-gray-700/20 hover:bg-white/25 dark:hover:bg-gray-800/25 transition-all duration-300 hover:scale-110 md:hidden shadow-lg group ${
          isScrolled ? 'top-4 left-4' : 'top-6 left-6'
        }`}
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-6">
          <Menu 
            className={`absolute inset-0 transition-all duration-300 group-hover:scale-110 ${isDark ? 'text-blue-400' : 'text-yellow-500'} ${
              isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
            }`}
            size={24}
          />
          <X 
            className={`absolute inset-0 transition-all duration-300 group-hover:scale-110 ${isDark ? 'text-blue-400' : 'text-yellow-500'} ${
              isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
            }`}
            size={24}
          />
        </div>
      </button>

      {/* Desktop Navigation - Android 16 QPR1 Style */}
      <nav className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
        <div className="backdrop-blur-md bg-white/25 dark:bg-gray-800/25 rounded-2xl border border-gray-300/40 dark:border-gray-700/40 p-2 shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative p-3 rounded-xl transition-all duration-500 ease-out hover:scale-110 block w-full mb-2 last:mb-0 transform ${
                  activeSection === item.id
                    ? 'bg-blue-500/40 text-blue-700 dark:text-blue-300 shadow-lg backdrop-blur-sm border border-blue-300/30 dark:border-blue-500/30 scale-105'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white/30 dark:hover:bg-gray-700/30'
                }`}
                title={item.label}
              >
                <Icon 
                  size={20} 
                  className={`transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'animate-pulse scale-110' 
                      : 'group-hover:scale-125 group-hover:rotate-12 group-hover:animate-pulse'
                  }`} 
                />
                
                {/* Enhanced Tooltip with theme popup styling - Properly aligned */}
                <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-4 py-3 bg-white/25 dark:bg-gray-800/25 backdrop-blur-md text-gray-800 dark:text-gray-200 text-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out whitespace-nowrap border border-gray-300/40 dark:border-gray-700/40 shadow-xl translate-x-2 group-hover:translate-x-0 scale-75 group-hover:scale-100 origin-left font-medium pointer-events-none">
                  {item.label}
                  
                  {/* Tooltip arrow - Properly centered */}
                  <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-white/25 dark:bg-gray-800/25 border-l border-t border-gray-300/40 dark:border-gray-700/40 rotate-45 backdrop-blur-md"></div>
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation with maximum transparency and blur */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-80 max-w-[80vw] backdrop-blur-xl bg-white/20 dark:bg-gray-900/20 border-r border-white/20 dark:border-gray-700/20 transform transition-all duration-500 ease-out shadow-2xl rounded-r-3xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 pt-20">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Navigation</h3>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-300 hover:scale-105 mb-2 transform backdrop-blur-sm group ${
                    activeSection === item.id
                      ? 'bg-blue-500/60 text-white shadow-lg scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/30 dark:hover:bg-gray-800/30'
                  }`}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                    transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <Icon 
                    size={20} 
                    className={`transition-all duration-300 ${
                      activeSection === item.id 
                        ? 'animate-pulse scale-110' 
                        : 'group-hover:scale-125 group-hover:rotate-12'
                    }`} 
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;