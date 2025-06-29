import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
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
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl transition-colors duration-500"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl transition-colors duration-500"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-default">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full hover:w-32 transition-all duration-300"></div>
        </div>
        
        <div className="space-y-8">
          {experience.map((exp, index) => {
            const isExpanded = expandedItems.includes(index);
            const previewAchievements = getPreviewAchievements(exp.achievements);
            const hasMoreContent = exp.achievements.length > 2;
            
            return (
              <div 
                key={index} 
                className={`backdrop-blur-md bg-white/70 dark:bg-gray-800/70 p-8 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 hover:shadow-2xl transition-all duration-500 group ${hasMoreContent ? 'cursor-pointer' : 'cursor-default'} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${isExpanded ? 'scale-[1.02] shadow-2xl' : 'hover:scale-[1.02]'}`}
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
                      <div className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
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
                
                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  isExpanded ? 'max-h-96' : 'max-h-32'
                }`}>
                  <div className={`transform transition-all duration-500 ${
                    isExpanded ? 'translate-y-0 scale-100' : 'translate-y-0 scale-100'
                  }`}>
                    <ul className="space-y-3">
                      {(isExpanded ? exp.achievements : previewAchievements).map((achievement, i) => (
                        <li 
                          key={i} 
                          className="flex items-start gap-3 hover:translate-x-2 transition-all duration-300 group/item"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover/item:text-gray-900 dark:group-hover/item:text-gray-100 transition-colors duration-300">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {hasMoreContent && !isExpanded && (
                    <div className="flex justify-center mt-4">
                      <MoreHorizontal size={20} className="text-gray-400 dark:text-gray-500 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;