// src/components/PWAInstaller.tsx

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
// 1. Import the hook from the vite-plugin-pwa virtual module
import { useRegisterSW } from 'virtual:pwa-register/react';


// ... (Your TypeScript global definitions, helper functions, InstallBanner, and ThankYouBanner components remain exactly the same as above)


// ===============================================
// Main PWA Installer Component - INTEGRATED VERSION
// ===============================================
const PWAInstaller: React.FC = () => {
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showThankYouBanner, setShowThankYouBanner] = useState(false);

  // 2. Call the hook to get update status and functions
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  useEffect(() => {
    // NOTE: The manual Service Worker Registration block is gone.
    // The useRegisterSW() hook above handles everything automatically.

    // Before Install Prompt Listener (This part is kept)
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('🚀 PWA install prompt triggered');
      e.preventDefault();
      deferredPrompt = e;
      if (!installPromptShown) {
        setTimeout(() => {
          setShowInstallBanner(true);
        }, 3000);
      }
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // App Installed Listener (This part is kept)
    const handleAppInstalled = () => {
      console.log('🎉 PWA was installed successfully');
      installPromptShown = true;
      setShowInstallBanner(false);
      setTimeout(() => {
        setShowThankYouBanner(true);
      }, 1000);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // ... (Your handleInstallClick, handleDismissInstallBanner, and handleDismissThankYouBanner functions remain the same)

  // 3. Render all the potential banners
  return (
    <>
      {/* Renders your "Add to Home Screen" banner */}
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

      {/* Renders the "Update Available" banner when needRefresh is true */}
      {needRefresh && (
        <div className="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg bg-white border border-gray-200 z-[10000]">
          <div className="mb-2">
            <span className="font-bold">New Version Available!</span>
            <p className="text-sm text-gray-600">Click Reload to update the application.</p>
          </div>
          <button
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => updateServiceWorker(true)}
          >
            Reload
          </button>
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setNeedRefresh(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default PWAInstaller;