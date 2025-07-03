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

// ===============================================
// React Component for PWA Install Prompt
// ===============================================

interface InstallBannerProps {
  onInstall: () => void;
  onDismiss: () => void;
}

const InstallBanner: React.FC<InstallBannerProps> = ({ onInstall, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Small delay to allow element to be in DOM before animating

    const autoDismissTimeout = setTimeout(() => {
      if (isVisible) { // Only auto-dismiss if it's currently visible
        console.log('⏰ Auto-dismissing install prompt after 15 seconds');
        onDismiss(); // Call dismiss to handle animation and removal
      }
    }, 15000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(autoDismissTimeout);
    };
  }, [isVisible, onDismiss]);

  return createPortal(
    <div
      id="install-banner"
      className={`
        fixed top-20 right-20 p-5 rounded-2xl shadow-xl z-[9999]
        font-sans max-w-xs border border-white/20
        transition-all duration-400 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-5 scale-90'}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        color: 'white'
      }}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="text-3xl">📱</div>
        <div>
          <div className="font-bold mb-1 text-lg">Install Portfolio App</div>
          <div className="text-sm opacity-90 leading-tight">Add to home screen for quick access and offline viewing</div>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={onInstall}
          className="
            flex-1 py-3 px-5 rounded-lg cursor-pointer font-semibold text-sm
            transition-all duration-200 ease-in-out
          "
          style={{
            background: 'rgba(255,255,255,0.25)',
            border: '1px solid rgba(255,255,255,0.4)',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.35)')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
        >
          ⬇️ Install
        </button>
        <button
          onClick={onDismiss}
          className="
            py-3 px-4 rounded-lg cursor-pointer text-sm
            transition-all duration-200 ease-in-out
          "
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.4)',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          ✕
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
        fixed top-20 right-20 p-4 rounded-xl shadow-lg z-[9999]
        font-sans max-w-[280px] border border-white/20
        transition-all duration-400 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-5 scale-90'}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.8))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        color: 'white'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">✅</div>
        <div>
          <div className="font-semibold">App Installed!</div>
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

export default PWAInstaller;