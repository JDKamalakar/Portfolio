import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react'; // Keep X icon imported
import { useRegisterSW } from 'virtual:pwa-register/react';

// IMPORTANT: This 'declare global' block ensures that BeforeInstallPromptEvent
// is recognized by TypeScript across your project, even though this file is a module.
// We are adding it here as per your request to avoid a separate global.d.ts file.
declare global {
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }

  // Also augment WindowEventMap to ensure addEventListener types correctly
  interface WindowEventMap {
    'beforeinstallprompt': BeforeInstallPromptEvent;
  }
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let installPromptShown = false; // To prevent showing the banner multiple times

// Simple component to detect if it's likely a mobile device based on user agent
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false; // Server-side rendering check
  const userAgent = navigator.userAgent || navigator.vendor;
  return /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
};

// ===============================================
// React Component for PWA Install Prompt
// ===============================================

interface InstallBannerProps {
  onInstall: () => void;
  onDismiss: () => void;
}

const InstallBanner: React.FC<InstallBannerProps> = ({ onInstall, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = isMobileDevice();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const autoDismissTimeout = setTimeout(() => {
      if (isVisible) {
        console.log('⏰ Auto-dismissing install prompt after 8 seconds');
        onDismiss();
      }
    }, 8000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(autoDismissTimeout);
    };
  }, [isVisible, onDismiss]);

  return createPortal(
    <div
      className={`
        fixed top-[88px] right-4 z-[9999] font-sans max-w-xs
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
      `}
    >
      {/* Glow Effect - positioned relative to this outer container */}
      <div
        className={`
          absolute inset-0 rounded-2xl -z-10
          transition-opacity duration-500 ease-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          filter: 'blur(30px)', // Adjust blur for glow intensity
          background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.5), rgba(66, 165, 245, 0.4), rgba(33, 150, 243, 0.5))', // Material 3 expressive blue glow
          transform: 'translateY(10px) scale(0.95)', // Slightly below and smaller than the popup
          pointerEvents: 'none', // Ensure it doesn't block clicks
        }}
      />

      {/* Main Popup Content - now a regular div within the positioned container */}
      <div
        id="install-banner-content"
        className={`
          relative p-5 rounded-2xl overflow-hidden
          bg-white/25 dark:bg-gray-800/25 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40 shadow-xl
        `}
      >
        {/* Moving Background Animation */}
        <div className="absolute inset-0 -z-10">
          {/* Primary moving gradient */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: 'linear-gradient(135deg, #1A73E8 0%, #42A5F5 25%, #2196F3 50%, #1976D2 75%, #1565C0 100%)',
              animation: 'gradientShift 8s ease-in-out infinite'
            }}
          />

          {/* Secondary moving layer */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, #42A5F5 50%, transparent 70%)',
              animation: 'slideAcross 6s linear infinite'
            }}
          />

          {/* Floating orbs */}
          <div
            className="absolute w-8 h-8 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, #E3F2FD 0%, #1A73E8 100%)',
              top: '20%',
              left: '10%',
              animation: 'float 4s ease-in-out infinite'
            }}
          />
          <div
            className="absolute w-6 h-6 rounded-full opacity-25"
            style={{
              background: 'radial-gradient(circle, #BBDEFB 0%, #2196F3 100%)',
              top: '60%',
              right: '15%',
              animation: 'float 5s ease-in-out infinite reverse'
            }}
          />
          <div
            className="absolute w-4 h-4 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #90CAF9 0%, #1976D2 100%)',
              bottom: '25%',
              left: '20%',
              animation: 'float 3.5s ease-in-out infinite'
            }}
          />
        </div>

        {/* Light Ripple Effect - positioned relative to this content div */}
        <div
          className={`
            absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-20 rounded-full -z-10
            bg-gradient-to-r from-blue-200/40 via-blue-300/50 to-blue-400/40 dark:from-blue-400/20 dark:via-blue-500/30 dark:to-blue-600/20 blur-3xl
            animate-ripple pointer-events-none
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            transition: 'opacity 500ms ease-out',
          }}
        />

        {/* Header Section: Icon and text content */}
        {/* UPDATED: Reduced gap from gap-4 to gap-3 */}
        <div className="flex items-center gap-3 mb-3 relative">
          <div className="text-3xl drop-shadow-md">
            {isMobile ? (
              // UPDATED: Added Pixel-style phone icon with correct SVG path
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pixel-smartphone text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-200">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                {/* Pixel's distinctive camera bar */}
                <path d="M5 7h14" />
                {/* Centered dot often on the bottom bezel */}
                <path d="M12 18h.01" />
              </svg>
            ) : (
              // UPDATED: Added Laptop icon with correct SVG path
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-laptop text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-200">
                  <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.7 20H3.3a1 1 0 0 1-.58-1.45L4 16"/>
              </svg>
            )}
          </div>
          <div className="flex-1">
            <div className="font-bold mb-1 text-lg text-shadow-sm text-gray-900 dark:text-white leading-none">Install Portfolio App</div>
            <div className="text-sm opacity-90 leading-tight text-gray-800 dark:text-gray-200">Add to home screen for quick access and offline viewing</div>
          </div>
        </div>

        {/* Buttons Section: Install and Cancel (with X icon) */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={onInstall}
            className="
              flex-1 py-3 px-5 rounded-lg cursor-pointer font-semibold text-sm group
              transition-all duration-300 ease-in-out
              shadow-md hover:shadow-lg active:scale-95 hover:scale-[1.08]
              text-white
              bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-500/30
              hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/50
              flex items-center justify-center gap-2
            "
          >
            {/* Install Icon with hover scaling */}
            <span className="group-hover:scale-110 transition-transform duration-200">⬇️</span> {/* Span to apply scale */}
            <span>Install</span>
          </button>
          <button
            onClick={onDismiss}
            className="
              flex-1 py-3 px-5 rounded-lg cursor-pointer font-semibold text-sm group
              transition-all duration-300 ease-in-out
              shadow-md hover:shadow-lg active:scale-95 hover:scale-[1.08]
              text-white
              bg-white/20 border border-white/30
              hover:bg-white/30 hover:shadow-white/25
              flex items-center justify-center gap-2
            "
          >
            {/* X Icon with 360-degree rotation on hover */}
            <X className="w-5 h-5 text-red-700 transition-transform duration-1000 group-hover:rotate-[360deg] shrink-0" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

interface ThankYouBannerProps {
  onDismiss: () => void;
}

const ThankYouBanner: React.FC<ThankYouBannerProps> = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = isMobileDevice();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const autoDismissTimeout = setTimeout(() => {
      onDismiss();
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(autoDismissTimeout);
    };
  }, [onDismiss]);

  return createPortal(
    <div
      className={`
        fixed top-[88px] right-4 z-[9999] font-sans max-w-[280px]
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
      `}
    >
      {/* Glow Effect - positioned relative to this outer container */}
      <div
        className={`
          absolute inset-0 rounded-xl -z-10
          transition-opacity duration-500 ease-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          filter: 'blur(20px)', // Adjust blur for glow intensity (slightly less for thank you)
          background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.4), rgba(66, 165, 245, 0.3), rgba(33, 150, 243, 0.4))', // Material 3 blue glow for success
          transform: 'translateY(8px) scale(0.96)', // Slightly below and smaller than the popup
          pointerEvents: 'none',
        }}
      />

      {/* Main Popup Content - now a regular div within the positioned container */}
      <div
        id="thank-you-banner-content"
        className={`
          relative p-4 rounded-xl overflow-hidden
          bg-white/25 dark:bg-gray-800/25 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40 shadow-xl
        `}
      >
        {/* Moving Background Animation for Thank You Banner */}
        <div className="absolute inset-0 -z-10">
          {/* Success gradient with Material 3 blue */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background: 'linear-gradient(135deg, #1A73E8 0%, #42A5F5 30%, #2196F3 60%, #1976D2 100%)',
              animation: 'gradientShift 6s ease-in-out infinite'
            }}
          />

          {/* Success shimmer effect */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #E3F2FD 50%, transparent 100%)',
              animation: 'shimmer 3s linear infinite'
            }}
          />
        </div>

        {/* Light Ripple Effect - positioned relative to this content div */}
        <div
          className={`
            absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-16 rounded-full -z-10
            bg-gradient-to-r from-blue-200/40 via-blue-300/50 to-blue-400/40 blur-2xl
            animate-ripple pointer-events-none
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            transition: 'opacity 500ms ease-out',
          }}
        />

        <div className="flex items-center gap-3">
          <div className="text-2xl drop-shadow-md">
            {isMobile ? (
              // FIXED: Added correct path for smartphone-check icon
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone-check text-gray-900 dark:text-white">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                <path d="m9 12 2 2 4-4"/>
                <path d="M12 18h.01"/>
              </svg>
            ) : (
              // FIXED: Added correct path for laptop-check icon
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-laptop-check text-gray-900 dark:text-white">
                <path d="M20 16V7a2 2 0 0 1-2-2H6a2 2 0 0 1-2 2v9h16Z"/>
                <path d="m12 19 2 2 4-4"/>
                <path d="M4 16h16"/>
              </svg>
            )}
          </div>
          <div>
            <div className="font-semibold text-shadow-sm text-gray-900 dark:text-white">App Installed!</div>
            <div className="text-sm opacity-90 text-gray-800 dark:text-gray-200">Thanks for installing the portfolio app</div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Add CSS animations to the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes gradientShift {
      0%, 100% {
        background-position: 0% 50%;
        transform: scale(1) rotate(0deg);
      }
      25% {
        background-position: 100% 50%;
        transform: scale(1.05) rotate(1deg);
      }
      50% {
        background-position: 200% 50%;
        transform: scale(1) rotate(0deg);
      }
      75% {
        background-position: 300% 50%;
        transform: scale(1.05) rotate(-1deg);
      }
    }

    @keyframes slideAcross {
      0% {
        transform: translateX(-100%) rotate(45deg);
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translateX(200%) rotate(45deg);
        opacity: 0;
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px) scale(1);
      }
      50% {
        transform: translateY(-10px) scale(1.1);
      }
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `;

  if (!document.head.querySelector('style[data-pwa-animations]')) {
    style.setAttribute('data-pwa-animations', 'true');
    document.head.appendChild(style);
  }
}

// ===============================================
// Main PWA Installer Component
// ===============================================

const PWAInstaller: React.FC = () => {
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showThankYouBanner, setShowThankYouBanner] = useState(false);
  
  // Use vite-plugin-pwa's service worker registration
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('✅ SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('❌ SW registration error', error);
    },
  });

  useEffect(() => {
    // Handle offline ready state
    if (offlineReady) {
      console.log('🔄 App is ready to work offline');
    }

    // Handle need refresh state
    if (needRefresh) {
      if (confirm('🔄 New version available! Click OK to update.')) {
        updateServiceWorker(true);
      }
    }
  }, [offlineReady, needRefresh, updateServiceWorker]);

  useEffect(() => {
    // Before Install Prompt Listener
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('🚀 PWA install prompt triggered');
      e.preventDefault();
      deferredPrompt = e;
      if (!installPromptShown) { // Only show if not already shown/installed
        setTimeout(() => {
          setShowInstallBanner(true);
        }, 3000); // Show after 3 seconds
      }
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // App Installed Listener
    const handleAppInstalled = () => {
      console.log('🎉 PWA was installed successfully');
      installPromptShown = true;
      setShowInstallBanner(false); // Hide install banner if it was open
      setTimeout(() => {
        setShowThankYouBanner(true);
      }, 1000);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    // Debug Logging
    console.log('🔍 PWA Installation Criteria Check:');
    console.log('- Service Worker:', 'serviceWorker' in navigator ? '✅' : '❌');
    console.log('- HTTPS:', location.protocol === 'https:' || location.hostname === 'localhost' ? '✅' : '❌');
    console.log('- Manifest:', document.querySelector('link[rel="manifest"]') ? '✅' : '❌');

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    console.log('🎯 User clicked install button');
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`👤 User response to install prompt: ${outcome}`);
      if (outcome === 'accepted') {
        console.log('✅ User accepted the install prompt');
      } else {
        console.log('❌ User dismissed the install prompt');
      }
      deferredPrompt = null;
    } else {
      console.log('⚠️ No deferred prompt available');
      alert(
        'To install this app:\n\n• Chrome: Click the install icon in the address bar\n• Safari: Tap Share → Add to Home Screen\n• Edge: Click the app icon in the address bar'
      );
    }
    setShowInstallBanner(false); // Hide the install banner
  };

  const handleDismissInstallBanner = () => {
    console.log('👋 User dismissed install prompt');
    setShowInstallBanner(false);
  };

  const handleDismissThankYouBanner = () => {
    setShowThankYouBanner(false);
  };

  return (
    <>
      {showInstallBanner && (
        <InstallBanner
          onInstall={handleInstallClick}
          onDismiss={handleDismissInstallBanner}
        />
      )}
      {showThankYouBanner && (
        <ThankYouBanner
          onDismiss={handleDismissThankYouBanner}
        />
      )}
    </>
  );
};

export default PWAInstaller;