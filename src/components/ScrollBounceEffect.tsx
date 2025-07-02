import React, { useEffect, useState, useRef } from 'react';

const ScrollBounceEffect = () => {
  const [bounceDirection, setBounceDirection] = useState<'top' | 'bottom' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollTop = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clearDirectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollBottom = scrollTop + clientHeight;

      const currentScrollTop = scrollTop;
      const isScrollingDown = currentScrollTop > lastScrollTop.current;
      const isScrollingUp = currentScrollTop < lastScrollTop.current;

      lastScrollTop.current = currentScrollTop;

      // Condition to show the top bounce effect
      if (scrollTop <= 5 && isScrollingUp) {
        // Clear any existing hide/clear timeouts before setting new ones for the bounce
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        if (clearDirectionTimeoutRef.current) {
          clearTimeout(clearDirectionTimeoutRef.current);
          clearDirectionTimeoutRef.current = null;
        }

        setBounceDirection('top');
        setIsVisible(true);
        
        // Set a timeout to hide the elements after 300 milliseconds
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          // After elements fade out, clear the direction
          clearDirectionTimeoutRef.current = setTimeout(() => {
            setBounceDirection(null);
          }, 500); // This duration should match the opacity transition duration
        }, 300); // Popup display duration
      }
      // Condition to show the bottom bounce effect
      else if (scrollBottom >= scrollHeight - 5 && isScrollingDown) {
        // Clear any existing hide/clear timeouts before setting new ones for the bounce
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        if (clearDirectionTimeoutRef.current) {
          clearTimeout(clearDirectionTimeoutRef.current);
          clearDirectionTimeoutRef.current = null;
        }

        setBounceDirection('bottom');
        setIsVisible(true);
        
        // Set a timeout to hide the elements after 300 milliseconds
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          // After elements fade out, clear the direction
          clearDirectionTimeoutRef.current = setTimeout(() => {
            setBounceDirection(null);
          }, 500); // This duration should match the opacity transition duration
        }, 300); // Popup display duration
      }
      // Condition to hide if currently visible and scrolling away from the boundary
      else if (isVisible) {
        // Define a small threshold to consider "away from boundary"
        const threshold = 10; 

        const isAwayFromTop = bounceDirection === 'top' && (scrollTop > threshold || isScrollingDown);
        const isAwayFromBottom = bounceDirection === 'bottom' && (scrollBottom < scrollHeight - threshold || isScrollingUp);

        if (isAwayFromTop || isAwayFromBottom) {
          setIsVisible(false); // Immediately start fading out

          // Clear any pending hide timeouts as we're forcing a hide now
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
          }
          
          // Set a timeout to clear the direction after the fade-out transition completes
          if (clearDirectionTimeoutRef.current) {
            clearTimeout(clearDirectionTimeoutRef.current);
            clearDirectionTimeoutRef.current = null;
          }
          clearDirectionTimeoutRef.current = setTimeout(() => {
            setBounceDirection(null);
          }, 500); // Matches opacity transition duration
        }
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
      // Clean up all timeouts when the component unmounts
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (clearDirectionTimeoutRef.current) {
        clearTimeout(clearDirectionTimeoutRef.current);
      }
    };
  }, [isVisible, bounceDirection]); // Dependencies ensure the latest state values are used in handleScroll

  if (!bounceDirection) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Top Bounce Effect */}
      {bounceDirection === 'top' && (
        <div className="absolute top-0 left-0 right-0 h-24 flex items-start justify-center pt-3">
          <div className={`transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 scale-100' : '-translate-y-6 scale-75'
          }`}>
            {/* Bounce Indicator Container */}
            <div className="relative w-6 h-6 flex items-center justify-center">
              {/* Ripple effects - perfectly centered using same dimensions as main element */}
              <div className="absolute inset-0 w-6 h-6 bg-blue-500/20 dark:bg-blue-400/10 rounded-full animate-ping scale-150"></div>
              <div className="absolute inset-0 w-6 h-6 bg-purple-500/20 dark:bg-purple-400/10 rounded-full animate-ping scale-150 delay-200"></div>
              
              {/* Main bounce element */}
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500/40 to-purple-600/40 dark:from-blue-400/30 dark:to-purple-500/30 rounded-full backdrop-blur-xl border border-white/40 dark:border-gray-700/40 flex items-center justify-center animate-bounce shadow-xl relative z-10">
                <div className="w-3 h-3 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Text indicator with glass effect */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="px-3 py-2 bg-white/25 dark:bg-gray-800/25 backdrop-blur-md text-gray-800 dark:text-gray-200 text-xs rounded-xl shadow-lg font-medium pointer-events-none border border-gray-300/40 dark:border-gray-700/40">
                Top of page
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bounce Effect */}
      {bounceDirection === 'bottom' && (
        <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center pb-3">
          <div className={`transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 scale-100' : 'translate-y-6 scale-75'
          }`}>
            {/* Text indicator with glass effect */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="px-3 py-2 bg-white/25 dark:bg-gray-800/25 backdrop-blur-md text-gray-800 dark:text-gray-200 text-xs rounded-xl shadow-lg font-medium pointer-events-none border border-gray-300/40 dark:border-gray-700/40">
                End of page
              </span>
            </div>
            
            {/* Bounce Indicator Container */}
            <div className="relative w-6 h-6 flex items-center justify-center">
              {/* Ripple effects - perfectly centered using same dimensions as main element */}
              <div className="absolute inset-0 w-6 h-6 bg-purple-500/20 dark:bg-purple-400/10 rounded-full animate-ping scale-150"></div>
              <div className="absolute inset-0 w-6 h-6 bg-indigo-500/20 dark:bg-indigo-400/10 rounded-full animate-ping scale-150 delay-200"></div>
              
              {/* Main bounce element */}
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500/40 to-indigo-600/40 dark:from-purple-400/30 dark:to-indigo-500/30 rounded-full backdrop-blur-xl border border-white/40 dark:border-gray-700/40 flex items-center justify-center animate-bounce shadow-xl relative z-10">
                <div className="w-3 h-3 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background overlay for better visibility */}
      <div className={`absolute inset-0 bg-gradient-to-b ${
        bounceDirection === 'top' 
          ? 'from-white/5 via-transparent to-transparent dark:from-gray-900/5' 
          : 'from-transparent via-transparent to-white/5 dark:to-gray-900/5'
      } transition-opacity duration-500`}></div>
    </div>
  );
};

export default ScrollBounceEffect;