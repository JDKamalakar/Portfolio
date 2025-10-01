import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  const { personal, about } = portfolioData;
  const [isExpanded, setIsExpanded] = useState(false);
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

  const getPreviewText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
  };

  const hasMoreContent = personal.objective.length > 200;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-700 ease-in-out"
    >
      {/* Background elements */}
      <div className="absolute inset-0 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/50 via-blue-300/40 to-cyan-400/50 dark:from-blue-900/30 dark:via-blue-800/25 dark:to-cyan-900/30 rounded-full blur-3xl animate-pulse transition-all duration-1000"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-sky-200/50 via-blue-300/40 to-blue-400/50 dark:from-sky-900/30 dark:via-blue-800/25 dark:to-blue-900/30 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-1000"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-br from-cyan-200/40 via-sky-300/30 to-blue-300/40 dark:from-cyan-900/25 dark:via-sky-800/20 dark:to-blue-900/25 rounded-full blur-2xl animate-pulse delay-500 transition-all duration-1000"></div>
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-gradient-to-br from-indigo-200/40 via-blue-300/30 to-cyan-300/40 dark:from-indigo-900/25 dark:via-blue-800/20 dark:to-cyan-900/25 rounded-full blur-2xl animate-pulse delay-1500 transition-all duration-1000"></div>
      <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-indigo-300/40 to-blue-400/40 dark:from-indigo-800/30 dark:to-blue-900/30 rounded-full blur-2xl animate-bounce delay-500"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-300/40 to-cyan-400/40 dark:from-blue-800/30 dark:to-cyan-900/30 rounded-full blur-2xl animate-bounce delay-1500"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-emerald-300/35 to-teal-400/35 dark:from-emerald-800/25 dark:to-teal-900/25 rounded-full blur-xl animate-bounce delay-700"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-br from-sky-300/35 to-blue-400/35 dark:from-sky-800/25 dark:to-blue-900/25 rounded-full blur-xl animate-bounce delay-1200"></div>
      <div className="absolute top-2/3 left-10 w-12 h-12 bg-gradient-to-br from-cyan-300/35 to-blue-400/35 dark:from-cyan-800/25 dark:to-blue-900/25 rounded-full blur-lg animate-pulse delay-300"></div>
      <div className="absolute top-10 left-1/2 w-14 h-14 bg-gradient-to-br from-blue-300/35 to-indigo-400/35 dark:from-blue-800/25 dark:to-indigo-900/25 rounded-full blur-lg animate-pulse delay-800"></div>
      <div className="absolute top-1/4 left-0 w-8 h-8 bg-blue-400/20 dark:bg-blue-600/15 rounded-full blur-sm animate-bounce"
           style={{
             animation: 'float 6s ease-in-out infinite',
             animationDelay: '2s'
           }}></div>
      <div className="absolute bottom-1/3 right-0 w-6 h-6 bg-cyan-400/20 dark:bg-cyan-600/15 rounded-full blur-sm animate-pulse"
           style={{
             animation: 'slide 8s linear infinite',
             animationDelay: '1s'
           }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-default">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 mx-auto rounded-lg hover:w-32 transition-all duration-300"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className={`backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 p-8 rounded-lg shadow-2xl border border-white/20 dark:border-gray-700/20 hover:scale-[1.02] transition-all duration-500 group ${hasMoreContent ? 'cursor-pointer' : 'cursor-default'} ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          } ${isExpanded ? 'scale-[1.02] shadow-3xl bg-white/30 dark:bg-gray-800/30' : ''} hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]`} onClick={() => hasMoreContent && setIsExpanded(!isExpanded)}>
            <div className="relative">
              <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
                isExpanded ? 'max-h-96' : 'max-h-32'
              }`}>
                <div className={`transform transition-all duration-500 ${
                  isExpanded ? 'translate-y-0 scale-100' : 'translate-y-0 scale-100'
                }`}>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {isExpanded ? personal.objective : getPreviewText(personal.objective)}
                  </p>
                </div>
              </div>

              {hasMoreContent && (
                <div className="mt-4">
                  {!isExpanded && (
                    <div className="flex justify-center mb-2">
                      <MoreHorizontal size={20} className="text-gray-400 dark:text-gray-500 animate-pulse" />
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(!isExpanded);
                    }}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 group/btn"
                  >
                    <span className="font-medium">
                      {isExpanded ? 'Show Less' : 'Read More'}
                    </span>
                    <div className={`transform transition-all duration-500 ease-in-out ${
                      isExpanded ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
                    }`}>
                      <ChevronDown size={16} className="group-hover/btn:animate-bounce" />
                    </div>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4 mt-6">
              {about.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 hover:translate-x-2 transition-all duration-300 cursor-default group/item ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-2 h-2 ${
                    index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-cyan-500' : 'bg-indigo-500'
                  } rounded-lg group-hover/item:scale-150 transition-transform duration-300`}></div>
                  <span className="text-gray-600 dark:text-gray-400 group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-300">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`space-y-6 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          } transition-all duration-1000 delay-300`}>
            <div className="backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 p-6 rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/20 hover:scale-[1.02] hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 group hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.languages.map((lang, index) => (
                  // MODIFIED: Restructured tag for guaranteed transparency
                  <span
                    key={lang}
                    className="relative isolate px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="relative z-10">{lang}</span>
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                  </span>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 p-6 rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/20 hover:scale-[1.02] hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 group hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Hobbies
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.hobbies.map((hobby, index) => {
                  const getHobbyLink = (hobby: string) => {
                    if (hobby.toLowerCase().includes('manga')) {
                      return 'https://www.kenmei.co/user/JD_Dark_Pheonix';
                    }
                    if (hobby.toLowerCase().includes('anime')) {
                      return 'https://www.livechart.me/users/JD_DarkPheonix/library';
                    }
                    return null;
                  };

                  const link = getHobbyLink(hobby);

                  if (link) {
                    return (
                      <a
                        key={hobby}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        // MODIFIED: Restructured tag for guaranteed transparency
                        className="relative isolate px-3 py-1 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-lg text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <span className="relative z-10">{hobby}</span>
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                      </a>
                    );
                  }

                  return (
                    <span
                      key={hobby}
                      // MODIFIED: Restructured tag for guaranteed transparency
                      className="relative isolate px-3 py-1 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-lg text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="relative z-10">{hobby}</span>
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-5px);
          }
        }
        
        @keyframes slide {
          0% {
            transform: translateX(-100vw);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default About;