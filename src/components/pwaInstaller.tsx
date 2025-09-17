import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Download } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

// TypeScript definitions for PWA install prompt
declare global {
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }
  interface WindowEventMap {
    'beforeinstallprompt': BeforeInstallPromptEvent;
  }
}

// Helper variables and functions
let deferredPrompt: BeforeInstallPromptEvent | null = null;
let installPromptShown = false;

const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent || navigator.vendor;
  return /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
};

// Add CSS animations to the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; transform: scale(1) rotate(0deg); }
      25% { background-position: 100% 50%; transform: scale(1.05) rotate(1deg); }
      50% { background-position: 200% 50%; transform: scale(1) rotate(0deg); }
      75% { background-position: 300% 50%; transform: scale(1.05) rotate(-1deg); }
    }
    
    /* UPDATED: Moving line now starts and ends at 60% opacity */
    @keyframes slideAcross {
      0% { transform: translateX(-100%) rotate(45deg); opacity: 0.6; }
      50% { opacity: 1; }
      100% { transform: translateX(200%) rotate(45deg); opacity: 0.6; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-10px) scale(1.1); }
    }
    /* UPDATED: Shimmer now starts and ends at 50% opacity */
    @keyframes shimmer {
      0% { transform: translateX(-100%); opacity: 0.5; }
      50% { opacity: 0.75; }
      100% { transform: translateX(100%); opacity: 0.5; }
    }
    @keyframes ripple {
      from {
        transform: scale(0.5);
        opacity: 0.6;
      }
      to {
        transform: scale(1.5);
        opacity: 0;
      }
    }
  `;

  if (!document.head.querySelector('style[data-pwa-animations]')) {
    style.setAttribute('data-pwa-animations', 'true');
    document.head.appendChild(style);
  }
}


// ===============================================
// Install Banner
// ===============================================
interface InstallBannerProps {
  onInstall: () => void;
  onDismiss: () => void;
}

const InstallBanner: React.FC<InstallBannerProps> = ({ onInstall, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = isMobileDevice();

  useEffect(() => {
    const timeoutId = setTimeout(() => { setIsVisible(true); }, 100);
    const autoDismissTimeout = setTimeout(() => {
      if (isVisible) {
        console.log('⏰ Auto-dismissing install prompt after 10 seconds');
        onDismiss();
      }
    }, 10000);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(autoDismissTimeout);
    };
  }, [isVisible, onDismiss]);

  return createPortal(
    <div className={`fixed top-[88px] right-4 z-[9999] font-sans max-w-xs transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <div className={`absolute inset-0 rounded-2xl -z-10 transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ filter: 'blur(30px)', background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.5), rgba(66, 165, 245, 0.4), rgba(33, 150, 243, 0.5))', transform: 'translateY(10px) scale(0.95)', pointerEvents: 'none' }} />
      <div id="install-banner-content" className="relative p-5 rounded-2xl overflow-hidden bg-gray-900/30 backdrop-blur-xs border border-gray-700/20 shadow-xl">
        {/* Moving Background Animation */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-80" style={{ background: 'linear-gradient(135deg, #1A73E8 0%, #42A5F5 25%, #2196F3 50%, #1976D2 75%, #1565C0 100%)', animation: 'gradientShift 8s ease-in-out infinite' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(45deg, transparent 30%, #42A5F5 50%, transparent 70%)', animation: 'slideAcross 6s linear infinite' }} />
          <div className="absolute w-8 h-8 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, #42A5F5 0%, #1A73E8 100%)', top: '20%', left: '10%', animation: 'float 4s ease-in-out infinite' }} />
          <div className="absolute w-6 h-6 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #64B5F6 0%, #2196F3 100%)', top: '60%', right: '15%', animation: 'float 5s ease-in-out infinite reverse' }} />
          <div className="absolute w-4 h-4 rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #90CAF9 0%, #1976D2 100%)', bottom: '25%', left: '20%', animation: 'float 3.5s ease-in-out infinite' }} />
        </div>

        <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-20 rounded-full -z-10 bg-gradient-to-r from-blue-400/20 via-blue-500/30 to-blue-600/20 blur-3xl animate-[ripple_4s_ease-out_infinite] pointer-events-none ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 500ms ease-out' }} />

        {/* Header Section */}
        <div className="flex items-center gap-3 mb-3 relative">
          <div className="text-3xl drop-shadow-md">
            {/* UPDATED: Mobile icon dot removed and 'G' added */}
            {isMobile ? (<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M5 7h14" />
                <text x="12" y="15.5" fill="white" fontSize="6px" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" stroke="none">G</text>
              </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.7 20H3.3a1 1 0 0 1-.58-1.45L4 16"/></svg>)}
          </div>
          <div className="flex-1">
            <div className="font-bold mb-1 text-lg text-shadow-sm text-white leading-none">Add to Home Screen</div>
            <div className="text-sm opacity-90 leading-tight text-white/90">Install for quick access and a better experience.</div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-3 mt-4">
          <button onClick={onInstall} className="flex-1 py-3 px-5 rounded-lg font-semibold text-sm group transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:scale-95 hover:scale-[1.08] text-white bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-500/30 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/50 flex items-center justify-center gap-2">
            <span className="group-hover:scale-110 transition-transform duration-200">⬇️</span>
            <span>Install</span>
          </button>
          <button onClick={onDismiss} className="flex-1 py-3 px-5 rounded-lg font-semibold text-sm group transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:scale-95 hover:scale-[1.08] text-white bg-white/20 border border-white/30 hover:bg-white/30 hover:shadow-white/25 flex items-center justify-center gap-2">
            <X className="w-5 h-5 text-red-700 transition-transform duration-1000 group-hover:rotate-[360deg] shrink-0" />
            <span>Later</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};


// ===============================================
// Thank You Banner
// ===============================================
interface ThankYouBannerProps {
  onDismiss: () => void;
}

const ThankYouBanner: React.FC<ThankYouBannerProps> = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = isMobileDevice();

  useEffect(() => {
    const timeoutId = setTimeout(() => { setIsVisible(true); }, 100);
    const autoDismissTimeout = setTimeout(() => { onDismiss(); }, 5000);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(autoDismissTimeout);
    };
  }, [onDismiss]);

  return createPortal(
    <div className={`fixed top-[88px] right-4 z-[9999] font-sans max-w-[280px] transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <div className={`absolute inset-0 rounded-xl -z-10 transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ filter: 'blur(20px)', background: 'linear-gradient(135deg, rgba(29, 233, 182, 0.5), rgba(0, 230, 118, 0.4), rgba(0, 200, 83, 0.5))', transform: 'translateY(8px) scale(0.96)', pointerEvents: 'none' }} />
      <div id="thank-you-banner-content" className="relative p-4 rounded-xl overflow-hidden bg-gray-900/30 backdrop-blur-md border border-gray-700/40 shadow-xl">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-80" style={{ background: 'linear-gradient(135deg, #1DE9B6 0%, #00E676 30%, #00C853 60%, #4CAF50 100%)', animation: 'gradientShift 6s ease-in-out infinite' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, #B2DFDB 50%, transparent 100%)', animation: 'shimmer 3s linear infinite' }} />
        </div>

        <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-16 rounded-full -z-10 bg-gradient-to-r from-green-400/20 via-green-500/30 to-green-600/20 blur-2xl animate-[ripple_4s_ease-out_infinite] pointer-events-none ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 500ms ease-out' }} />
        
        <div className="flex items-center gap-3">
          <div className="text-2xl drop-shadow-md">
            {isMobile ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="m9 12 2 2 4-4"/><path d="M12 18h.01"/></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M20 16V7a2 2 0 0 1-2-2H6a2 2 0 0 1-2 2v9h16Z"/><path d="m12 19 2 2 4-4"/><path d="M4 16h16"/></svg>)}
          </div>
          <div>
            <div className="font-semibold text-shadow-sm text-white">Successfully Installed! 🎉</div>
            <div className="text-sm opacity-90 text-gray-200">The app is on your {isMobile ? 'home screen' : 'desktop'}.</div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};


// ===============================================
// Main PWA Installer Component (Unchanged)
// ===============================================
const PWAInstaller: React.FC = () => {
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showThankYouBanner, setShowThankYouBanner] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  useEffect(() => {
    console.log('🚀 PWA Installer initialized');

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('🚀 PWA install prompt triggered');
      e.preventDefault();
      deferredPrompt = e;
      if (!installPromptShown) {
        console.log('📱 Showing custom install banner');
        setTimeout(() => {
          setShowInstallBanner(true);
        }, 3000);
      }
    };

    const handleAppInstalled = () => {
      console.log('🎉 PWA was installed successfully');
      installPromptShown = true;
      setShowInstallBanner(false);
      setTimeout(() => {
        setShowThankYouBanner(true);
      }, 1000);
    };

    const checkInstallation = () => {
      if (window.matchMedia?.('(display-mode: standalone)').matches) {
        console.log('📱 App is already installed');
        installPromptShown = true;
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    checkInstallation();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    console.log('👤 User clicked install');
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`👤 User response to install prompt: ${outcome}`);
        deferredPrompt = null;
      } catch (error) {
        console.error('❌ Error during installation:', error);
      }
    }
    setShowInstallBanner(false);
  };

  const handleDismissInstallBanner = () => {
    console.log('👤 User dismissed install banner');
    setShowInstallBanner(false);
    installPromptShown = true;
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

      {/* Service Worker Update Banner (This part still respects system theme) */}
      {needRefresh && (
        <div className="fixed bottom-4 right-4 p-4 rounded-xl shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 z-[10000] max-w-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Download size={16} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">New Version Available!</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click reload to update the app.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 font-medium"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
            <button
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
              onClick={() => setNeedRefresh(false)}
            >
              Later
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstaller;