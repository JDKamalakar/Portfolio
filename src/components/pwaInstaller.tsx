// src/components/pwaInstaller.tsx

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react'; // Re-import the X icon

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

/**
 * Checks if Service Workers are supported in the current environment.
 * @returns {boolean} True if Service Workers are supported and not in a known unsupported environment (like StackBlitz).
 */
function isServiceWorkerSupported(): boolean {
  if (!('serviceWorker' in navigator)) {
    return false;
  }
  const isStackBlitz =
    window.location.hostname.includes('stackblitz') ||
    window.location.hostname.includes('webcontainer') ||
    (window.location.hostname.includes('localhost') &&
      window.navigator.userAgent.includes('WebContainer'));
  return !isStackBlitz;
}

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
          background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4))', // Matching banner gradient
          transform: 'translateY(10px) scale(0.95)', // Slightly below and smaller than the popup
          pointerEvents: 'none', // Ensure it doesn't block clicks
        }}
      />

      {/* Main Popup Content - now a regular div within the positioned container */}
      <div
        id="install-banner-content"
        className={`
          relative p-5 rounded-2xl
          bg-white/25 dark:bg-gray-800/25 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40 shadow-xl
        `}
      >
        {/* Light Ripple Effect - positioned relative to this content div */}
        <div
          className={`
            absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-20 rounded-full
            bg-white/30 dark:bg-gray-200/30 blur-3xl -z-10
            animate-ripple pointer-events-none
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            transition: 'opacity 500ms ease-out',
          }}
        />

        {/* Header Section: Icon, text, and ABSOLUTE close button */}
        <div className="flex items-center gap-4 mb-3 relative"> {/* Add relative here for absolute positioning of X button */}
          <div className="text-3xl drop-shadow-md animate-bounce-slow">
            {isMobile ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone text-gray-900 dark:text-white"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-laptop text-gray-900 dark:text-white"><path d="M20 18H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z"/><path d="M2 15h20"/></svg>
            )}
          </div>
          <div className="flex-1">
            <div className="font-bold mb-1 text-lg text-shadow-sm text-gray-900 dark:text-white leading-none">Install Portfolio App</div>
            <div className="text-sm opacity-90 leading-tight text-gray-800 dark:text-gray-200">Add to home screen for quick access and offline viewing</div>
          </div>
          {/* Top-right X Close Button */}
          <button
            onClick={onDismiss}
            className="
              absolute top-0 right-0 p-1.5 rounded-lg cursor-pointer
              transition-all duration-300 ease-in-out group
              hover:scale-110 active:scale-90 w-8 h-8 flex items-center justify-center
              bg-white/20 dark:bg-gray-800/20 border border-gray-300/30 dark:border-gray-700/30 shadow-md
              dark:shadow-blue-500/50 dark:hover:shadow-blue-500/70
            "
          >
            {/* Increased size to w-6 h-6 and set text-red-700 for bolder red */}
            <X className="w-6 h-6 text-red-700 transition-transform duration-200 group-hover:rotate-90 group-hover:scale-110" />
          </button>
        </div>

        {/* Buttons Section: "Install" and "Cancel" buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={onInstall}
            className="
              flex-1 py-3 px-5 rounded-lg cursor-pointer font-semibold text-sm
              transition-all duration-300 ease-in-out
              shadow-md hover:shadow-lg active:scale-95 hover:scale-[1.03]
              text-gray-900 dark:text-white
              bg-white/20 dark:bg-gray-800/20 border border-gray-300/30 dark:border-gray-700/30
              hover:bg-white/30 dark:hover:bg-gray-700/30
              dark:shadow-blue-500/50 dark:hover:shadow-blue-500/70
            "
          >
            ⬇️ Install
          </button>
          <button
            onClick={onDismiss} {/* This button also dismisses the banner */}
            className="
              py-3 px-5 rounded-lg cursor-pointer font-semibold text-sm
              transition-all duration-300 ease-in-out
              shadow-md hover:shadow-lg active:scale-95 hover:scale-[1.03]
              text-gray-800 dark:text-gray-200
              bg-white/10 dark:bg-gray-700/10 border border-gray-300/30 dark:border-gray-700/30
              hover:bg-white/20 dark:hover:bg-gray-700/20
              dark:shadow-gray-500/30 dark:hover:shadow-gray-500/50
            "
          >
            Cancel
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
          background: 'linear-gradient(to bottom, rgba(16, 185, 129, 0.4), rgba(5, 150, 105, 0.4))', // Matching banner gradient
          transform: 'translateY(8px) scale(0.96)', // Slightly below and smaller than the popup
          pointerEvents: 'none',
        }}
      />

      {/* Main Popup Content - now a regular div within the positioned container */}
      <div
        id="thank-you-banner-content"
        className={`
          relative p-4 rounded-xl
          bg-white/25 dark:bg-gray-800/25 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40 shadow-xl
        `}
      >
        {/* Light Ripple Effect - positioned relative to this content div */}
        <div
          className={`
            absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-16 rounded-full
            bg-white/30 dark:bg-gray-200/30 blur-2xl -z-10
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone-check text-gray-900 dark:text-white"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="m9 12 2 2 4-4"/><path d="M12 18h.01"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-laptop-check text-gray-900 dark:text-white"><path d="M11 20H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="M2 15h12"/><path d="m18 22 4-4"/></svg>
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


// ===============================================
// Main PWA Installer Component
// ===============================================

const PWAInstaller: React.FC = () => {
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showThankYouBanner, setShowThankYouBanner] = useState(false);

  useEffect(() => {
    // 1. Service Worker Registration
    if (isServiceWorkerSupported()) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('✅ SW registered successfully:', registration);

            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    if (confirm('🔄 New version available! Click OK to update.')) {
                      window.location.reload();
                    }
                  }
                });
              }
            });
          })
          .catch((registrationError) => {
            console.warn(
              '⚠️ SW registration failed (this is expected in some environments):',
              registrationError.message
            );
          });
      });
    } else {
      console.log('ℹ️ Service Workers not supported in this environment - PWA features will be limited');
    }

    // 2. Before Install Prompt Listener
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

    // 3. App Installed Listener
    const handleAppInstalled = () => {
      console.log('🎉 PWA was installed successfully');
      installPromptShown = true;
      setShowInstallBanner(false); // Hide install banner if it was open
      setTimeout(() => {
        setShowThankYouBanner(true);
      }, 1000);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    // 4. Debug Logging
    console.log('🔍 PWA Installation Criteria Check:');
    console.log('- Service Worker:', isServiceWorkerSupported() ? '✅' : '❌ (Not supported in this environment)');
    console.log('- HTTPS:', location.protocol === 'https:' || location.hostname === 'localhost' ? '✅' : '❌');
    console.log('- Manifest:', document.querySelector('link[rel="manifest"]') ? '✅' : '❌');

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []); // Empty dependency array means this runs once on mount

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