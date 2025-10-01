import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, ChevronDown, MoreHorizontal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Experience = () => {
  const { experience } = portfolioData;
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getPreviewAchievements = (achievements: string[], maxItems: number = 2) => {
    return achievements.slice(0, maxItems);
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden bg-gray-50 dark:bg-gray-900 transition-all duration-700 ease-in-out"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/50 via-cyan-200/40 to-blue-300/50 dark:from-blue-900/30 dark:via-cyan-900/25 dark:to-blue-800/30 rounded-full blur-3xl transition-all duration-1000 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-indigo-200/50 via-blue-200/40 to-cyan-300/50 dark:from-indigo-900/30 dark:via-blue-900/25 dark:to-cyan-800/30 rounded-full blur-3xl transition-all duration-1000 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/40 via-blue-300/30 to-cyan-300/40 dark:from-indigo-900/25 dark:via-blue-800/20 dark:to-cyan-900/25 rounded-full blur-2xl animate-pulse delay-500 transition-all duration-1000"></div>
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-gradient-to-br from-teal-200/40 via-cyan-300/30 to-sky-300/40 dark:from-teal-900/25 dark:via-cyan-800/20 dark:to-sky-900/25 rounded-full blur-2xl animate-pulse delay-1500 transition-all duration-1000"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-300/40 to-blue-400/40 dark:from-indigo-800/30 dark:to-blue-900/30 rounded-full blur-2xl animate-bounce delay-700"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-300/40 to-cyan-400/40 dark:from-blue-800/30 dark:to-cyan-900/30 rounded-full blur-2xl animate-bounce delay-1200"></div>
      <div className="absolute top-16 left-16 w-16 h-16 bg-gradient-to-br from-emerald-300/35 to-teal-400/35 dark:from-emerald-800/25 dark:to-teal-900/25 rounded-full blur-xl animate-bounce delay-300"></div>
      <div className="absolute bottom-16 right-16 w-20 h-20 bg-gradient-to-br from-sky-300/35 to-blue-400/35 dark:from-sky-800/25 dark:to-blue-900/25 rounded-full blur-xl animate-bounce delay-800"></div>
      <div className="absolute top-3/4 right-10 w-12 h-12 bg-gradient-to-br from-cyan-300/35 to-blue-400/35 dark:from-cyan-800/25 dark:to-blue-900/25 rounded-full blur-lg animate-pulse delay-600"></div>
      <div className="absolute top-10 right-1/2 w-14 h-14 bg-gradient-to-br from-blue-300/35 to-indigo-400/35 dark:from-blue-800/25 dark:to-indigo-900/25 rounded-full blur-lg animate-pulse delay-1100"></div>
      <div className="absolute top-1/3 left-0 w-8 h-8 bg-blue-400/20 dark:bg-blue-600/15 rounded-full blur-sm" style={{ animation: 'moveAcross 20s linear infinite', animationDelay: '0s' }}></div>
      <div className="absolute bottom-1/4 right-0 w-6 h-6 bg-cyan-400/20 dark:bg-cyan-600/15 rounded-full blur-sm" style={{ animation: 'moveAcross 18s linear infinite reverse', animationDelay: '5s' }}></div>
      <div className="absolute top-2/3 left-1/3 w-5 h-5 bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-sm" style={{ animation: 'orbitalMove 15s ease-in-out infinite', animationDelay: '2s' }}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-default">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 mx-auto rounded-full hover:w-32 transition-all duration-300"></div>
        </div>

        <div className="space-y-8">
          {experience.map((exp, index) => {
            const isExpanded = expandedItems.includes(index);
            const previewAchievements = getPreviewAchievements(exp.achievements);
            const hasMoreContent = exp.achievements.length > 2;

            return (
              <div
                key={index}
                // MODIFIED: Added glow and fixed transition delay
                className={`backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 transition-transform duration-500 transition-[box-shadow] duration-200 group ${hasMoreContent ? 'cursor-pointer' : 'cursor-default'} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } bg-white/15 dark:bg-gray-800/15 ${isExpanded ? 'scale-[1.02] shadow-3xl bg-white/25 dark:bg-gray-800/25' : 'hover:scale-[1.02] hover:bg-white/20 dark:hover:bg-gray-800/20'} hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onClick={() => hasMoreContent && toggleExpanded(index)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {exp.company}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                        <MapPin size={16} className="group-hover:animate-pulse" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300">
                        <Calendar size={16} className="group-hover:animate-pulse" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  {hasMoreContent && (
                    <div className="mt-4 md:mt-0 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <span className="text-sm font-medium">
                        {isExpanded ? 'Show Less' : 'Show More'}
                      </span>
                      <div className={`transform transition-all duration-500 ease-in-out ${
                        isExpanded ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
                      }`}>
                        <ChevronDown size={20} className="group-hover:animate-bounce" />
                      </div>
                    </div>
                  )}
                </div>

                <div className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
                  isExpanded ? 'max-h-96' : 'max-h-30'
                }`}>
                  <div className={`transform transition-all duration-500`}>
                    <ul className="space-y-3">
                      {(isExpanded ? exp.achievements : previewAchievements).map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 hover:translate-x-2 transition-all duration-300 group/item"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover/item:text-gray-900 dark:group-hover/item:text-gray-100 transition-colors duration-300">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* MODIFIED: Simplified the fade-out effect */}
                  {!isExpanded && hasMoreContent && (
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/15 to-transparent dark:from-gray-800/15 pointer-events-none"></div>
                  )}
                </div>

                {hasMoreContent && !isExpanded && (
                  <div className="flex justify-center mt-2">
                    <MoreHorizontal size={20} className="text-gray-400 dark:text-gray-500 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes moveAcross {
          0% {
            transform: translateX(-50px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 50px));
            opacity: 0;
          }
        }
        
        @keyframes orbitalMove {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(100px) translateY(-50px) rotate(90deg);
          }
          50% {
            transform: translateX(50px) translateY(-100px) rotate(180deg);
          }
          75% {
            transform: translateX(-50px) translateY(-50px) rotate(270deg);
          }
          100% {
            transform: translateX(0) translateY(0) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;444444