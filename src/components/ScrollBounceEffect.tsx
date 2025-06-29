import React, { useEffect, useState } from 'react';

const ScrollBounceEffect = () => {
  const [bounceDirection, setBounceDirection] = useState<'top' | 'bottom' | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let bounceTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollBottom = scrollTop + clientHeight;

      // Check if at top (with small tolerance)
      if (scrollTop <= 5) {
        clearTimeout(bounceTimeout);
        clearTimeout(hideTimeout);
        setBounceDirection('top');
        setIsVisible(true);
        
        bounceTimeout = setTimeout(() => {
          setIsVisible(false);
          hideTimeout = setTimeout(() => {
            setBounceDirection(null);
          }, 500);
        }, 1000);
      }
      // Check if at bottom (with small tolerance)
      else if (scrollBottom >= scrollHeight - 5) {
        clearTimeout(bounceTimeout);
        clearTimeout(hideTimeout);
        setBounceDirection('bottom');
        setIsVisible(true);
        
        bounceTimeout = setTimeout(() => {
          setIsVisible(false);
          hideTimeout = setTimeout(() => {
            setBounceDirection(null);
          }, 500);
        }, 1000);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(bounceTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!bounceDirection) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Top Bounce Effect */}
      {bounceDirection === 'top' && (
        <div className="absolute top-0 left-0 right-0 h-32 flex items-start justify-center pt-4">
          <div className={`transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 scale-100' : '-translate-y-8 scale-75'
          }`}>
            {/* Bounce Indicator */}
            <div className="relative">
              {/* Main bounce element */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500/30 to-purple-600/30 dark:from-blue-400/20 dark:to-purple-500/20 rounded-full backdrop-blur-xl border border-white/30 dark:border-gray-700/30 flex items-center justify-center animate-bounce shadow-2xl">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full animate-pulse"></div>
              </div>
              
              {/* Ripple effects */}
              <div className="absolute inset-0 w-16 h-16 bg-blue-500/20 dark:bg-blue-400/10 rounded-full animate-ping"></div>
              <div className="absolute inset-0 w-16 h-16 bg-purple-500/20 dark:bg-purple-400/10 rounded-full animate-ping delay-200"></div>
              
              {/* Text indicator */}
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-lg">
                  Top of page
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bounce Effect */}
      {bounceDirection === 'bottom' && (
        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center pb-4">
          <div className={`transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 scale-100' : 'translate-y-8 scale-75'
          }`}>
            {/* Bounce Indicator */}
            <div className="relative">
              {/* Text indicator */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-lg">
                  End of page
                </span>
              </div>
              
              {/* Main bounce element */}
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 dark:from-purple-400/20 dark:to-indigo-500/20 rounded-full backdrop-blur-xl border border-white/30 dark:border-gray-700/30 flex items-center justify-center animate-bounce shadow-2xl">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full animate-pulse"></div>
              </div>
              
              {/* Ripple effects */}
              <div className="absolute inset-0 w-16 h-16 bg-purple-500/20 dark:bg-purple-400/10 rounded-full animate-ping"></div>
              <div className="absolute inset-0 w-16 h-16 bg-indigo-500/20 dark:bg-indigo-400/10 rounded-full animate-ping delay-200"></div>
            </div>
          </div>
        </div>
      )}

      {/* Background overlay for better visibility */}
      <div className={`absolute inset-0 bg-gradient-to-b ${
        bounceDirection === 'top' 
          ? 'from-white/10 via-transparent to-transparent dark:from-gray-900/10' 
          : 'from-transparent via-transparent to-white/10 dark:to-gray-900/10'
      } transition-opacity duration-500`}></div>
    </div>
  );
};

export default ScrollBounceEffect;