import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Calendar, Award, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Education = () => {
  const { education, certifications } = portfolioData;
  const [expandedEducation, setExpandedEducation] = useState<number[]>([]);
  const [expandedCertifications, setExpandedCertifications] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleEducationExpanded = (index: number) => {
    setExpandedEducation(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleCertificationExpanded = (index: number) => {
    setExpandedCertifications(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section 
      id="education"
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden bg-gray-50 dark:bg-gray-900 transition-all duration-700 ease-in-out"
    >
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl transition-colors duration-500"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl transition-colors duration-500"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 cursor-default">
            Education & Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full hover:w-32 transition-all duration-300"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-blue-600 dark:text-blue-400" size={32} />
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => {
                const isExpanded = expandedEducation.includes(index);
                const hasInstitution = edu.institution && edu.institution.trim() !== '';
                return (
                  <div 
                    key={index} 
                    className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${hasInstitution ? 'cursor-pointer' : 'cursor-default'} group ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                    onClick={() => hasInstitution && toggleEducationExpanded(index)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex-1">
                        {edu.degree}
                      </h4>
                      {hasInstitution && (
                        <div className="flex items-center gap-2 ml-2">
                          {isExpanded ? (
                            <ChevronUp size={20} className="text-blue-600 dark:text-blue-400 group-hover:animate-bounce flex-shrink-0 transition-transform duration-300" />
                          ) : (
                            <ChevronDown size={20} className="text-blue-600 dark:text-blue-400 group-hover:animate-bounce flex-shrink-0 transition-transform duration-300" />
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-32' : 'max-h-16'
                    }`}>
                      {hasInstitution && (
                        <div className={`transition-all duration-500 ease-in-out ${
                          isExpanded ? 'opacity-100 max-h-8 mb-3' : 'opacity-0 max-h-0 mb-0'
                        }`}>
                          <p className="text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                            {edu.institution}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                          <Calendar size={16} className="group-hover:animate-pulse" />
                          <span>{edu.period}</span>
                        </div>
                        <span className="font-semibold text-green-600 dark:text-green-400 hover:scale-110 transition-transform duration-300">
                          {edu.grade}
                        </span>
                      </div>
                    </div>
                    
                    {hasInstitution && !isExpanded && (
                      <div className="flex justify-center mt-3">
                        <MoreHorizontal size={16} className="text-gray-400 dark:text-gray-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Certifications */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-green-600 dark:text-green-400" size={32} />
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Certifications</h3>
            </div>
            <div className="space-y-6">
              {certifications.map((cert, index) => {
                const isExpanded = expandedCertifications.includes(index);
                const hasInstitution = cert.institution && cert.institution.trim() !== '';
                return (
                  <div 
                    key={index} 
                    className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${hasInstitution ? 'cursor-pointer' : 'cursor-default'} group ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                    onClick={() => hasInstitution && toggleCertificationExpanded(index)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 flex-1">
                        {cert.title}
                      </h4>
                      {hasInstitution && (
                        <div className="flex items-center gap-2 ml-2">
                          {isExpanded ? (
                            <ChevronUp size={20} className="text-green-600 dark:text-green-400 group-hover:animate-bounce flex-shrink-0 transition-transform duration-300" />
                          ) : (
                            <ChevronDown size={20} className="text-green-600 dark:text-green-400 group-hover:animate-bounce flex-shrink-0 transition-transform duration-300" />
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-32' : 'max-h-16'
                    }`}>
                      {hasInstitution && (
                        <div className={`transition-all duration-500 ease-in-out ${
                          isExpanded ? 'opacity-100 max-h-8 mb-3' : 'opacity-0 max-h-0 mb-0'
                        }`}>
                          <p className="text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                            {cert.institution}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                        <span className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                          {cert.year}
                        </span>
                        {cert.grade && (
                          <span className="font-semibold text-green-600 dark:text-green-400 hover:scale-110 transition-transform duration-300">
                            {cert.grade}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {hasInstitution && !isExpanded && (
                      <div className="flex justify-center mt-3">
                        <MoreHorizontal size={16} className="text-gray-400 dark:text-gray-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;