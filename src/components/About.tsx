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
      <div className="absolute inset-0 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl transition-colors duration-500"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-100/50 dark:bg-purple-900/20 rounded-full blur-3xl transition-colors duration-500"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-default">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full hover:w-32 transition-all duration-300"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`backdrop-blur-md bg-white/60 dark:bg-gray-800/60 p-8 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group ${hasMoreContent ? 'cursor-pointer' : 'cursor-default'} ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          } ${isExpanded ? 'scale-[1.02] shadow-2xl' : ''}`} onClick={() => hasMoreContent && setIsExpanded(!isExpanded)}>
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
                    index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-indigo-500'
                  } rounded-full group-hover/item:scale-150 transition-transform duration-300`}></div>
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
            <div className="backdrop-blur-md bg-white/60 dark:bg-gray-800/60 p-6 rounded-xl shadow-lg border border-white/30 dark:border-gray-700/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.languages.map((lang, index) => (
                  <span 
                    key={lang} 
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer backdrop-blur-sm"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="backdrop-blur-md bg-white/60 dark:bg-gray-800/60 p-6 rounded-xl shadow-lg border border-white/30 dark:border-gray-700/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                Hobbies
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.hobbies.map((hobby, index) => {
                  // Check if hobby has a link
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
                        className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer backdrop-blur-sm"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {hobby}
                      </a>
                    );
                  }
                  
                  return (
                    <span 
                      key={hobby} 
                      className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer backdrop-blur-sm"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {hobby}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;