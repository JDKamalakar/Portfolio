import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Sparkles, PowerOff } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// MODIFIED: The icon has been completely redrawn to be properly centered and sized within its viewBox.
// This provides a safe margin on all sides and permanently fixes the clipping issue.
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
    {/* Centered phone body with padding */}
    <rect width="12" height="18" x="6" y="3" rx="2" ry="2" />
    {/* Centered camera bar */}
    <rect x="6" y="6" width="12" height="2" fill="currentColor" stroke="none" />
    {/* Centered 'G' logo */}
    <text x="12" y="14.5" fill="currentColor" fontSize="5px" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" stroke="none">G</text>
  </svg>
);

const ThemeToggle = () => {
  const { theme, setTheme, isDark, glowMode, setGlowMode } = useTheme();
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
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
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

  const SystemIcon = isMobile ? PixelSmartphoneIcon : Monitor;

  const themePopoverOptions = [
    {
      label: 'System',
      value: 'system' as const,
      icon: SystemIcon,
      active: isSystemActive,
      color: isSystemActive ? (isDark ? 'text-blue-400' : 'text-yellow-500') : 'text-blue-500',
      activeClass: 'bg-blue-500/30 text-blue-700 dark:text-blue-300 shadow-md border border-blue-300/50 dark:border-blue-500/50 theme-glow',
      hoverGlowClass: 'theme-glow'
    },
    {
      label: 'Light',
      value: 'light' as const,
      icon: Sun,
      active: isLightActive,
      color: 'text-yellow-500',
      activeClass: 'bg-yellow-500/30 text-yellow-700 dark:text-yellow-300 shadow-md border border-yellow-300/50 dark:border-yellow-500/50 glow-yellow active-glow',
      hoverGlowClass: 'glow-yellow'
    },
    {
      label: 'Dark',
      value: 'dark' as const,
      icon: Moon,
      active: isDarkActive,
      color: 'text-blue-500 dark:text-blue-400',
      activeClass: 'bg-blue-500/30 text-blue-700 dark:text-blue-300 shadow-md border border-blue-300/50 dark:border-blue-500/50 glow-blue active-glow',
      hoverGlowClass: 'glow-blue'
    }
  ];

  const glowPopoverOptions = [
    {
      label: 'Always',
      value: 'always' as const,
      icon: Sparkles,
      active: glowMode === 'always',
      color: 'text-purple-500',
      activeClass: 'bg-purple-500/30 text-purple-700 dark:text-purple-300 shadow-md border border-purple-300/50 dark:border-purple-500/50 theme-glow',
      hoverGlowClass: 'theme-glow'
    },
    {
      label: 'Dark Only',
      value: 'dark-only' as const,
      icon: Moon,
      active: glowMode === 'dark-only',
      color: 'text-blue-500',
      activeClass: 'bg-blue-500/30 text-blue-700 dark:text-blue-300 shadow-md border border-blue-300/50 dark:border-blue-500/50 glow-blue active-glow',
      hoverGlowClass: 'glow-blue'
    },
    {
      label: 'Light Only',
      value: 'light-only' as const,
      icon: Sun,
      active: glowMode === 'light-only',
      color: 'text-yellow-500',
      activeClass: 'bg-yellow-500/30 text-yellow-700 dark:text-yellow-300 shadow-md border border-yellow-300/50 dark:border-yellow-500/50 glow-yellow active-glow',
      hoverGlowClass: 'glow-yellow'
    },
    {
      label: 'Off',
      value: 'off' as const,
      icon: PowerOff,
      active: glowMode === 'off',
      color: 'text-gray-500',
      activeClass: 'bg-gray-500/30 text-gray-700 dark:text-gray-300 shadow-md border border-gray-300/50 dark:border-gray-500/50',
      hoverGlowClass: ''
    }
  ];

  const handleThemeSelect = (selectedTheme: 'system' | 'light' | 'dark') => {
    setTheme(selectedTheme);
    setShowOptions(false);
  };

  return (
    <div
      ref={themeToggleRef}
      className={`fixed z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'top-4 right-4' : 'top-6 right-6'
        }`}
    >
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="p-3 rounded-2xl bg-white/25 dark:bg-gray-800/25 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 hover:scale-110 group shadow-xl"
        aria-label="Toggle theme"
      >
        <div
          className={`relative w-6 h-6 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${showOptions ? 'rotate-[360deg]' : 'rotate-0'
            }`}
        >
          <SystemIcon
            className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isSystemActive
              ? 'opacity-100 scale-100 rotate-0 group-hover:scale-110 group-hover:animate-pulse'
              : 'opacity-0 scale-50 rotate-[-90deg]'
              } ${isSystemActive && (isDark ? 'text-blue-400' : 'text-yellow-500')}`}
            size={24}
          />
          <Sun
            className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isLightActive
              ? 'opacity-100 scale-100 rotate-0 group-hover:scale-110 group-hover:rotate-180'
              : 'opacity-0 scale-50 rotate-[90deg]'
              } text-yellow-500`}
            size={24}
          />
          <Moon
            className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isDarkActive
              ? 'opacity-100 scale-100 rotate-0 group-hover:scale-110 group-hover:animate-pulse group-hover:rotate-[360deg]'
              : 'opacity-0 scale-50 rotate-[-90deg]'
              } text-blue-400`}
            size={24}
          />
        </div>
      </button>

      <div
        className={`absolute top-full mt-2 right-0 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-gray-300/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-2 flex flex-col gap-1.5 hover:gap-2 min-w-[160px] transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top-right ${showOptions
          ? 'opacity-100 scale-100 translate-y-0 rotate-0 pointer-events-auto'
          : 'opacity-0 scale-75 -translate-y-4 rotate-12 pointer-events-none'
          }`}
      >
        {themePopoverOptions.map((option, index) => {
          const isFirst = index === 0;
          const isLast = index === themePopoverOptions.length - 1;

          let roundingClass;
          if (option.active) {
            roundingClass = 'rounded-xl';
          } else {
            roundingClass = isFirst
              ? 'rounded-t-xl rounded'
              : isLast
                ? 'rounded-b-xl rounded'
                : 'rounded';
          }

          return (
            <button
              key={option.value}
              onClick={() => handleThemeSelect(option.value)}
              className={`group w-full flex items-center gap-3 px-4 py-3 transition-[transform,box-shadow,background-color,border-radius] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] backdrop-blur-sm transform origin-center hover:scale-105 hover:-translate-y-1 hover:rounded-xl text-sm font-medium ${roundingClass} ${option.active
                ? option.activeClass
                : `text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 ${option.hoverGlowClass}`
                }`}
              style={{
                transitionDelay: showOptions ? `${100 + index * 50}ms` : '0ms',
                opacity: showOptions ? 1 : 0,
              }}
            >
              <option.icon
                className={`inline-block transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 ${option.color} ${option.active ? 'scale-110' : ''
                  }`}
                size={18}
              />
              <span
                className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">{option.label}
              </span>
            </button>
          );
        })}

        <div className="my-2 h-px bg-gray-300/30 dark:bg-gray-700/30" />
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Glow Effect
        </div>

        {glowPopoverOptions.map((option, index) => {
          const isFirst = index === 0;
          const isLast = index === glowPopoverOptions.length - 1;

          let roundingClass;
          if (option.active) {
            roundingClass = 'rounded-xl';
          } else {
            roundingClass = isFirst
              ? 'rounded-t-xl rounded'
              : isLast
                ? 'rounded-b-xl rounded'
                : 'rounded';
          }

          // Calculate delay based on connection to previous list
          const baseDelay = themePopoverOptions.length * 50;

          return (
            <button
              key={option.value}
              onClick={() => setGlowMode(option.value)}
              className={`group w-full flex items-center gap-3 px-4 py-3 transition-[transform,box-shadow,background-color,border-radius] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] backdrop-blur-sm transform origin-center hover:scale-105 hover:-translate-y-1 hover:rounded-xl text-sm font-medium ${roundingClass} ${option.active
                ? option.activeClass
                : `text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 ${option.hoverGlowClass}`
                }`}
              style={{
                transitionDelay: showOptions ? `${100 + baseDelay + index * 50}ms` : '0ms',
                opacity: showOptions ? 1 : 0,
              }}
            >
              <option.icon
                className={`inline-block transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 ${option.color} ${option.active ? 'scale-110' : ''
                  }`}
                size={18}
              />
              <span
                className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">{option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeToggle;