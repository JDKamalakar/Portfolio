import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Sparkles, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

const PixelSmartphoneIcon: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
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
        <rect width="12" height="18" x="6" y="3" rx="2" ry="2" />
        <rect x="6" y="6" width="12" height="2" fill="currentColor" stroke="none" />
        <text x="12" y="14.5" fill="currentColor" fontSize="5px" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" stroke="none">G</text>
    </svg>
);

const WelcomeModal = () => {
    const { theme, setTheme, glowMode, setGlowMode, hasVisited, setHasVisited } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDeviceType = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkDeviceType();
        window.addEventListener('resize', checkDeviceType);
        return () => window.removeEventListener('resize', checkDeviceType);
    }, []);

    useEffect(() => {
        // Small delay to ensure smooth entry animation after load
        if (!hasVisited) {
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [hasVisited]);

    const handleComplete = () => {
        setIsVisible(false);
        setTimeout(() => setHasVisited(true), 500); // Wait for exit animation
    };

    if (hasVisited && !isVisible) return null;

    const getModalGlow = () => {
        switch (glowMode) {
            case 'always':
                return 'shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)] border-purple-500/50';
            case 'light-only':
                return 'shadow-[0_0_50px_-12px_rgba(234,179,8,0.5)] border-yellow-500/50';
            case 'dark-only':
                return 'shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] border-blue-500/50';
            default:
                return 'shadow-2xl border-white/20 dark:border-gray-700/30';
        }
    };

    const SystemIcon = isMobile ? PixelSmartphoneIcon : Monitor;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-white/10 dark:bg-black/40 backdrop-blur-md transition-colors duration-500" />

            {/* Modal Content */}
            <div
                className={`relative w-full max-w-md bg-white/60 dark:bg-gray-900/30 backdrop-blur-3xl rounded-3xl overflow-hidden transform transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-8 opacity-0'
                    } border ${getModalGlow()}`}
            >
                {/* Playful top decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500" />

                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 dark:bg-blue-400/10 mb-4 animate-bounce-slow shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                            <Sparkles className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome!</h2>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                            Personalize your experience to get started.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Theme Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Choose Theme
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { id: 'system', icon: SystemIcon, label: 'Auto', glowClass: 'theme-glow' },
                                    { id: 'light', icon: Sun, label: 'Light', glowClass: 'glow-yellow' },
                                    { id: 'dark', icon: Moon, label: 'Dark', glowClass: 'glow-blue' },
                                ].map(({ id, icon: Icon, label, glowClass }) => (
                                    <button
                                        key={id}
                                        onClick={() => setTheme(id as any)}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-lg hover:rounded-xl border transition-all duration-300 hover:-translate-y-1 active:scale-95 ${glowClass} ${theme === id
                                            ? 'bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-400 scale-105 active-glow rounded-xl'
                                            : 'bg-white/40 dark:bg-gray-800/40 border-white/20 dark:border-gray-700/30 text-gray-800 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span className="text-sm font-bold">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Glow Selection */}
                        {/* Glow Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Glow Effects
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'dark-only', label: 'Adaptive (Default)', desc: 'Glows in Dark Mode', glowClass: 'glow-blue' },
                                    { id: 'always', label: 'Always On', desc: 'Maximum Vibes', glowClass: 'glow-purple' },
                                    { id: 'light-only', label: 'Light Mode', desc: 'Glows in Light Mode', glowClass: 'glow-yellow' },
                                    { id: 'off', label: 'No Glow', desc: 'Clean & Minimal', glowClass: 'glow-white' },
                                ].map(({ id, label, desc, glowClass }) => (
                                    <button
                                        key={id}
                                        onClick={() => setGlowMode(id as any)}
                                        className={`relative p-3 rounded-lg hover:rounded-xl border text-left transition-all duration-300 hover:-translate-y-1 active:scale-95 ${glowClass} ${glowMode === id
                                            ? 'bg-purple-500/20 border-purple-500 text-purple-800 dark:text-purple-300 scale-[1.02] active-glow rounded-xl'
                                            : 'bg-white/40 dark:bg-gray-800/40 border-white/20 dark:border-gray-700/30 text-gray-800 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60'
                                            }`}
                                    >
                                        <div className="font-bold text-sm mb-0.5">{label}</div>
                                        <div className="text-[10px] font-medium opacity-80">{desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleComplete}
                        className="w-full mt-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group border border-white/20"
                    >
                        <span>Get Started</span>
                        <Check size={18} className="transition-transform group-hover:scale-125" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeModal;
