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
        setIsVisible(entry.isIntersecting);
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
      {/* Animated Background Flairs */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-gradient-to-br from-green-200/30 via-emerald-200/20 to-teal-300/30 dark:from-green-900/20 dark:via-emerald-900/15 dark:to-teal-800/20 rounded-full blur-3xl transition-all duration-1000 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-br from-blue-200/30 via-cyan-200/20 to-blue-300/30 dark:from-blue-900/20 dark:via-cyan-900/15 dark:to-blue-800/20 rounded-full blur-3xl transition-all duration-1000 animate-pulse delay-1000"></div>
      
      {/* Floating animated orbs */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-teal-300/25 to-blue-400/25 dark:from-teal-800/15 dark:to-blue-900/15 rounded-full blur-2xl animate-bounce delay-700"></div>
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-300/25 to-indigo-400/25 dark:from-cyan-800/15 dark:to-indigo-900/15 rounded-full blur-2xl animate-bounce delay-1200"></div>
      
      {/* Moving Elements */}
      <div className="absolute top-1/5 left-0 w-6 h-6 bg-blue-400/20 dark:bg-blue-600/15 rounded-full blur-sm" 
           style={{ 
             animation: 'educationFloat 20s ease-in-out infinite',
             animationDelay: '0s'
           }}></div>
      <div className="absolute bottom-1/5 right-0 w-8 h-8 bg-green-400/20 dark:bg-green-600/15 rounded-full blur-sm" 
           style={{ 
             animation: 'educationFloat 16s ease-in-out infinite reverse',
             animationDelay: '4s'
           }}></div>
      <div className="absolute top-1/2 left-1/3 w-5 h-5 bg-cyan-400/20 dark:bg-cyan-600/15 rounded-full blur-sm" 
           style={{ 
             animation: 'academicOrbit 24s linear infinite',
             animationDelay: '1s'
           }}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-default">
            Education & Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 mx-auto rounded-full hover:w-32 transition-all duration-300"></div>
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
                    className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-500 ${hasInstitution ? 'cursor-pointer' : 'cursor-default'} group overflow-hidden ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    } ${isExpanded ? 'scale-[1.02] shadow-2xl' : 'hover:scale-[1.02]'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                    onClick={() => hasInstitution && toggleEducationExpanded(index)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex-1">
                          {edu.degree}
                        </h4>
                        {hasInstitution && (
                          <div className="flex items-center gap-2 ml-2">
                            <div className={`transform transition-all duration-500 ease-in-out ${
                              isExpanded ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
                            }`}>
                              <ChevronDown size={20} className="text-blue-600 dark:text-blue-400 group-hover:animate-bounce flex-shrink-0" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Animated content container */}
                      <div className={`transition-all duration-700 ease-in-out ${
                        isExpanded ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'
                      }`}>
                        <div className={`transform transition-all duration-500 ${
                          isExpanded ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
                        }`}>
                          {hasInstitution && (
                            <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                              <p className="text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                                {edu.institution}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Three dots indicator when collapsed */}
                      {hasInstitution && !isExpanded && (
                        <div className="mb-3 flex justify-center">
                          <MoreHorizontal size={16} className="text-gray-400 dark:text-gray-500 animate-pulse" />
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
                    className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-500 ${hasInstitution ? 'cursor-pointer' : 'cursor-default'} group overflow-hidden ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    } ${isExpanded ? 'scale-[1.02] shadow-2xl' : 'hover:scale-[1.02]'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                    onClick={() => hasInstitution && toggleCertificationExpanded(index)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 flex-1">
                          {cert.title}
                        </h4>
                        {hasInstitution && (
                          <div className="flex items-center gap-2 ml-2">
                            <div className={`transform transition-all duration-500 ease-in-out ${
                              isExpanded ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
                            }`}>
                              <ChevronDown size={20} className="text-green-600 dark:text-green-400 group-hover:animate-bounce flex-shrink-0" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Animated content container */}
                      <div className={`transition-all duration-700 ease-in-out ${
                        isExpanded ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'
                      }`}>
                        <div className={`transform transition-all duration-500 ${
                          isExpanded ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
                        }`}>
                          {hasInstitution && (
                            <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                              <p className="text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                                {cert.institution}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Three dots indicator when collapsed */}
                      {hasInstitution && !isExpanded && (
                        <div className="mb-3 flex justify-center">
                          <MoreHorizontal size={16} className="text-gray-400 dark:text-gray-500 animate-pulse" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                        <span className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300">
                          {cert.year}
                        </span>
                        {cert.grade && (
                          <span className="font-semibold text-green-600 dark:text-green-400 hover:scale-110 transition-transform duration-300">
                            {cert.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes educationFloat {
          0%, 100% { 
            transform: translateX(0px) translateY(0px) scale(1); 
          }
          33% { 
            transform: translateX(80px) translateY(-60px) scale(1.2); 
          }
          66% { 
            transform: translateX(40px) translateY(-120px) scale(0.8); 
          }
        }
        
        @keyframes academicOrbit {
          0% { 
            transform: rotate(0deg) translateX(120px) rotate(0deg); 
          }
          100% { 
            transform: rotate(360deg) translateX(120px) rotate(-360deg); 
          }
        }
      `}</style>
    </section>
  );
};

export default Education;1111