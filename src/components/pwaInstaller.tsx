// src/components/pwaInstaller.tsx

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

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
    // Trigger animation after component mounts
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Small delay to allow element to be in DOM before animating

    // Reduced auto-dismiss time to 8 seconds
    const autoDismissTimeout = setTimeout(() => {
      if (isVisible) { // Only auto-dismiss if it's currently visible
        console.log('⏰ Auto-dismissing install prompt after 8 seconds');
        onDismiss(); // Call dismiss to handle animation and removal
      }
    }, 8000); // Popup stays for 8 seconds

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(autoDismissTimeout);
    };
  }, [isVisible, onDismiss]);

  return createPortal(
    <div
      id="install-banner"
      className={`
        fixed top-[88px] right-4 p-5 rounded-2xl z-[9999]
        font-sans max-w-xs border border-white/20
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.25))', // Reduced transparency further
        backdropFilter: 'blur(15px) saturate(200%)', // More blur and saturation for glass effect
        WebkitBackdropFilter: 'blur(15px) saturate(200%)', // For Safari
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15)', // Deeper, more diffused shadow
        color: 'white'
      }}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="text-3xl drop-shadow-md">
          {isMobile ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg> // Phone icon
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-laptop"><path d="M20 18H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z"/><path d="M2 15h20"/></svg> // Laptop icon
          )}
        </div>
        <div>
          <div className="font-bold mb-1 text-lg text-shadow-sm">Install Portfolio App</div> {/* Text shadow */}
          <div className="text-sm opacity-90 leading-tight">Add to home screen for quick access and offline viewing</div>
        </div>
        <button
          onClick={onDismiss}
          className="
            absolute top-3 right-3 p-1 rounded-full cursor-pointer text-sm
            transition-all duration-300 ease-in-out group
            hover:scale-125 active:scale-90
          "
          style={{
            background: 'rgba(255,255,255,0.1)', // Slightly visible background for button
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x text-red-400 group-hover:rotate-180 transition-transform duration-300"></svg>
        </button>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={onInstall}
          className="
            flex-1 py-3 px-5 rounded-lg cursor-pointer font-semibold text-sm
            transition-all duration-300 ease-in-out
            shadow-md hover:shadow-lg active:scale-95 hover:scale-[1.03]
          "
          style={{
            background: 'rgba(255,255,255,0.15)', // More transparent
            border: '1px solid rgba(255,255,255,0.4)',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
        >
          ⬇️ Install
        </button>
      </div>
    </div>,
    document.body // Portal to body
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
    }, 4000); // Auto-dismiss thank you after 4 seconds

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(autoDismissTimeout);
    };
  }, [onDismiss]);

  return createPortal(
    <div
      id="thank-you-banner"
      className={`
        fixed top-[88px] right-4 p-4 rounded-xl z-[9999]
        font-sans max-w-[280px] border border-white/20
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.25))', // Reduced transparency further
        backdropFilter: 'blur(15px) saturate(200%)', // More blur and saturation for glass effect
        WebkitBackdropFilter: 'blur(15px) saturate(200%)', // For Safari
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15)', // Deeper, more diffused shadow
        color: 'white'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl drop-shadow-md">
          {isMobile ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone-check"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="m9 12 2 2 4-4"/><path d="M12 18h.01"/></svg> // Phone with check icon
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-laptop-check"><path d="M11 20H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="M2 15h12"/><path d="m18 22 4-4"/></svg> // Laptop with check icon
          )}
        </div>
        <div>
          <div className="font-semibold text-shadow-sm">App Installed!</div> {/* Text shadow */}
          <div className="text-sm opacity-90">Thanks for installing the portfolio app</div>
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

export default PWAInstaller;1