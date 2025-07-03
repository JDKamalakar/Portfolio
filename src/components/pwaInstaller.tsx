function isServiceWorkerSupported(): boolean {
  // Check if Service Workers are supported
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  // Check if we're in StackBlitz or a similar webcontainer environment (which might not support Service Workers fully)
  const isStackBlitz =
    window.location.hostname.includes('stackblitz') ||
    window.location.hostname.includes('webcontainer') ||
    (window.location.hostname.includes('localhost') &&
      window.navigator.userAgent.includes('WebContainer'));

  return !isStackBlitz;
}

// Global variable to store the deferred prompt event
let deferredPrompt: BeforeInstallPromptEvent | null = null;
let installPromptShown = false;

/**
 * Creates and displays the custom PWA install promotion banner.
 */
function showInstallPromotion(): void {
  if (installPromptShown) return;
  installPromptShown = true;

  const installBanner = document.createElement('div');
  installBanner.id = 'install-banner';
  installBanner.className = 'install-popup-enter'; // Add class for enter animation
  installBanner.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.7), rgba(139, 92, 246, 0.7));
      color: white;
      padding: 20px 24px;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      z-index: 9999;
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 320px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.2);
      opacity: 0;
      transform: translateY(-20px) scale(0.9);
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    " class="backdrop-blur-md">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
        <div style="font-size: 32px;">📱</div>
        <div>
          <div style="font-weight: 700; margin-bottom: 4px; font-size: 16px;">Install Portfolio App</div>
          <div style="font-size: 13px; opacity: 0.9; line-height: 1.4;">Add to home screen for quick access and offline viewing</div>
        </div>
      </div>
      <div style="display: flex; gap: 12px; margin-top: 16px;">
        <button id="install-btn" style="
          background: rgba(255,255,255,0.25);
          border: 1px solid rgba(255,255,255,0.4);
          color: white;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          flex: 1;
          transition: all 0.2s ease;
        " onmouseover="this.style.background='rgba(255,255,255,0.35)'" onmouseout="this.style.background='rgba(255,255,255,0.25)'">
          ⬇️ Install
        </button>
        <button id="dismiss-btn" style="
          background: transparent;
          border: 1px solid rgba(255,255,255,0.4);
          color: white;
          padding: 10px 16px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
        " onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
          ✕
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(installBanner);

  // Trigger the enter animation
  requestAnimationFrame(() => {
    (installBanner.querySelector('div') as HTMLElement).style.opacity = '1';
    (installBanner.querySelector('div') as HTMLElement).style.transform = 'translateY(0) scale(1)';
  });

  // Install button click handler
  document.getElementById('install-btn')?.addEventListener('click', async () => {
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
    removeBanner();
  });

  // Dismiss button click handler
  document.getElementById('dismiss-btn')?.addEventListener('click', () => {
    console.log('👋 User dismissed install prompt');
    removeBanner();
  });

  // Auto dismiss after 15 seconds
  setTimeout(() => {
    const banner = document.getElementById('install-banner');
    if (banner) {
      console.log('⏰ Auto-dismissing install prompt after 15 seconds');
      removeBanner();
    }
  }, 15000);
}

/**
 * Removes the install promotion banner with an exit animation.
 */
function removeBanner(): void {
  const banner = document.getElementById('install-banner');
  if (banner) {
    // Apply exit animation
    (banner.querySelector('div') as HTMLElement).style.opacity = '0';
    (banner.querySelector('div') as HTMLElement).style.transform = 'translateY(-20px) scale(0.9)';

    setTimeout(() => {
      if (banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 400); // Match transition duration
  }
}

/**
 * Displays a thank you message after the PWA is successfully installed.
 */
function showThankYouMessage(): void {
  const thankYou = document.createElement('div');
  thankYou.id = 'thank-you-banner';
  thankYou.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.7), rgba(5, 150, 105, 0.7));
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 9999;
      font-family: system-ui, -apple-system, sans-serif;
      opacity: 0;
      transform: translateY(-20px) scale(0.9);
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    " class="backdrop-blur-md">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="font-size: 24px;">✅</div>
        <div>
          <div style="font-weight: 600;">App Installed!</div>
          <div style="font-size: 14px; opacity: 0.9;">Thanks for installing the portfolio app</div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(thankYou);

  // Trigger the enter animation
  requestAnimationFrame(() => {
    (thankYou.querySelector('div') as HTMLElement).style.opacity = '1';
    (thankYou.querySelector('div') as HTMLElement).style.transform = 'translateY(0) scale(1)';
  });

  setTimeout(() => {
    const currentThankYou = document.getElementById('thank-you-banner');
    if (currentThankYou) {
      // Apply exit animation
      (currentThankYou.querySelector('div') as HTMLElement).style.opacity = '0';
      (currentThankYou.querySelector('div') as HTMLElement).style.transform = 'translateY(-20px) scale(0.9)';
      setTimeout(() => {
        if (currentThankYou.parentNode) {
          currentThankYou.parentNode.removeChild(currentThankYou);
        }
      }, 400); // Match transition duration
    }
  }, 4000);
}

/**
 * Initializes PWA functionalities including Service Worker registration and install prompt handling.
 */
export function initializePWA(): void {
  if (isServiceWorkerSupported()) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ SW registered successfully:', registration);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) { // Ensure newWorker exists
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, show update notification
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

  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('🚀 PWA install prompt triggered');
    e.preventDefault(); // Prevent the mini-infobar from appearing on mobile
    deferredPrompt = e as BeforeInstallPromptEvent; // Stash the event

    // Show custom install promotion after a short delay
    setTimeout(() => {
      if (!installPromptShown) {
        showInstallPromotion();
      }
    }, 3000); // Show after 3 seconds
  });

  // Handle successful installation
  window.addEventListener('appinstalled', () => {
    console.log('🎉 PWA was installed successfully');
    installPromptShown = true; // Mark as installed
    removeBanner(); // Remove install banner if still visible
    setTimeout(() => {
      showThankYouMessage();
    }, 1000);
  });

  // Debug: Log PWA installation criteria
  console.log('🔍 PWA Installation Criteria Check:');
  console.log('- Service Worker:', isServiceWorkerSupported() ? '✅' : '❌ (Not supported in this environment)');
  console.log('- HTTPS:', location.protocol === 'https:' || location.hostname === 'localhost' ? '✅' : '❌');
  console.log('- Manifest:', document.querySelector('link[rel="manifest"]') ? '✅' : '❌');
}