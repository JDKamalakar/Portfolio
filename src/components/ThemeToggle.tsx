import React, { useState, useRef, useEffect } from 'react';
// 1. Import icons from lucide-react (Smartphone is removed)
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// 2. UPDATED: Custom Pixel-style smartphone icon component
// Dot removed and 'G' added.
const PixelSmartphoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    {/* This path creates the distinctive camera bar of a Pixel phone */}
    <path d="M5 7h14" />
    {/* This text element creates the 'G' logo, inheriting color */}
    <text x="12" y="15" fill="currentColor" fontSize="6px" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" stroke="none">G</text>
  </svg>
);


const ThemeToggle = () => {
  const { theme, setTheme, isDark } = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const themeToggleRef = useRef<HTMLDivElement>(null);

  const isSystemActive = theme === 'system';
  const isLightActive = theme === 'light';
  const isDarkActive = theme === 'dark';

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDeviceType(); // Check on initial render
    window.addEventListener('resize', checkDeviceType); // Add listener for screen resize

    // Cleanup the listener when the component unmounts
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeToggleRef.current && !themeToggleRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  const handleSystemTheme = () => {
    setTheme('system');
    setShowOptions(false);
  };

  const handleManualTheme = (isDarkModeSelected: boolean) => {
    setTheme(isDarkModeSelected ? 'dark' : 'light');
    setShowOptions(false);
  };

  // 3. Conditionally choose the icon, now using the custom Pixel icon
  const SystemIcon = isMobile ? PixelSmartphoneIcon : Monitor;

  return (
    <div
      ref={themeToggleRef}
      className={`fixed z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'top-4 right-4'
          : 'top-6 right-6'
      }`}
    >
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="p-3 rounded-2xl bg-white/25 dark:bg-gray-800/25 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 hover:scale-110 group shadow-xl"
        aria-label="Toggle theme"
      >
        <div className={`relative w-6 h-6 flex items-center justify-center
                          transition-transform duration-700 ease-in-out
                          ${showOptions ? 'rotate-[360deg]' : 'rotate-0'}`}>

          {/* System Theme Icon (PC/Mobile) - UPDATED */}
          <SystemIcon
            className={`absolute inset-0 transition-all duration-500 ease-out
                          ${isSystemActive
                ? 'opacity-100 scale-100 rotate-0 group-hover:scale-110 group-hover:animate-pulse'
                : 'opacity-0 scale-50 rotate-[-90deg]'
              }
                          ${isSystemActive && (isDark ? 'text-blue-400' : 'text-yellow-500')}`}
            size={24}
          />

          {/* Light Theme Icon */}
          <Sun
            className={`absolute inset-0 transition-all duration-500 ease-out
                          ${isLightActive
                ? 'opacity-100 scale-100 rotate-0 group-hover:scale-110 group-hover:rotate-180'
                : 'opacity-0 scale-50 rotate-[90deg]'
              }
                          text-yellow-500`}
            size={24}
          />

          {/* Dark Theme Icon */}
          <Moon
            className={`absolute inset-0 transition-all duration-500 ease-out
                          ${isDarkActive
                ? 'opacity-100 scale-100 rotate-0 group-hover:scale-110 group-hover:animate-pulse group-hover:rotate-[360deg]'
                : 'opacity-0 scale-50 rotate-[-90deg]'
              }
                          text-blue-400`}
            size={24}
          />
        </div>
      </button>

      {/* Theme Options Popover */}
      <div className={`absolute top-16 right-0 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-gray-300/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-3 min-w-[180px] transform transition-all duration-500 ease-out origin-top-right ${
        showOptions
          ? 'opacity-100 scale-100 translate-y-0 rotate-0 pointer-events-auto'
          : 'opacity-0 scale-75 -translate-y-4 rotate-12 pointer-events-none'
      }`}>
        {/* System Theme Button (Popup) */}
        <button
          onClick={handleSystemTheme}
          className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm mb-2 transform origin-center
            ${isSystemActive
              ? 'bg-blue-500/40 text-blue-700 dark:text-blue-300 shadow-lg scale-105 border border-blue-300/30 dark:border-blue-500/30'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30'
            }
            hover:scale-105 hover:-translate-y-1`}
          style={{
            transitionDelay: showOptions ? '100ms' : '0ms',
            opacity: showOptions ? 1 : 0
          }}
        >
          {/* Icon always visible, only animates - UPDATED */}
          <SystemIcon
            size={18}
            className={`transition-all duration-300
              ${isSystemActive
                ? (isDark ? 'text-blue-400' : 'text-yellow-500')
                : 'text-blue-500'
              }
              ${isSystemActive ? 'scale-110' : ''}
              group-hover:rotate-12 group-hover:scale-110`}
          />
          <span className="text-sm font-medium inline-block group-hover:scale-110 transition-transform duration-300">System</span>
        </button>

        {/* Light Theme Button (Popup) */}
        <button
          onClick={() => handleManualTheme(false)}
          className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm mb-2 transform origin-center
            ${isLightActive
              ? 'bg-yellow-500/40 text-yellow-700 dark:text-yellow-300 shadow-lg scale-105 border border-yellow-300/30 dark:border-yellow-500/30'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30'
            }
            hover:scale-105 hover:-translate-y-1`}
          style={{
            transitionDelay: showOptions ? '150ms' : '0ms',
            opacity: showOptions ? 1 : 0
          }}
        >
          <Sun
            size={18}
            className={`text-yellow-500 transition-all duration-300
              ${isLightActive ? 'scale-110' : ''}
              group-hover:rotate-180 group-hover:scale-110`}
          />
          <span className="text-sm font-medium inline-block group-hover:scale-110 transition-transform duration-300">Light</span>
        </button>

        {/* Dark Theme Button (Popup) */}
        <button
          onClick={() => handleManualTheme(true)}
          className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm transform origin-center
            ${isDarkActive
              ? 'bg-blue-500/40 text-blue-700 dark:text-blue-300 shadow-lg scale-105 border border-blue-300/30 dark:border-blue-500/30'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30'
            }
            hover:scale-105 hover:-translate-y-1`}
          style={{
            transitionDelay: showOptions ? '200ms' : '0ms',
            opacity: showOptions ? 1 : 0
          }}
        >
          <Moon
            size={18}
            className={`text-blue-500 dark:text-blue-400 transition-all duration-300
              ${isDarkActive ? 'scale-110' : ''}
              group-hover:rotate-[360deg] group-hover:scale-110`}
          />
          <span className="text-sm font-medium inline-block group-hover:scale-110 transition-transform duration-300">Dark</span>
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;1111