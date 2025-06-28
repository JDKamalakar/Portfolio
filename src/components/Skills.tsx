import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Skills = () => {
  const { skills } = portfolioData;
  const [animatedSkills, setAnimatedSkills] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill bars with staggered delay
          skills.technical.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [skills.technical]);

  return (
    <section 
      id="skills"
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500"
    >
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-3xl transition-colors duration-500"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl transition-colors duration-500"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-default">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full hover:w-32 transition-all duration-300"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills with Progress Bars */}
          <div className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="text-blue-600 dark:text-blue-400" size={28} />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Technical Skills</h3>
            </div>
            <div className="space-y-6">
              {skills.technical.map((skill, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {skill.name}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:scale-110 transition-transform duration-300">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden group-hover:h-4 transition-all duration-300">
                    <div 
                      className={`h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg ${
                        animatedSkills.includes(index) ? 'animate-pulse' : ''
                      }`}
                      style={{ 
                        width: animatedSkills.includes(index) ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Expertise Areas */}
          <div className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-purple-600 dark:text-purple-400" size={28} />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Core Expertise</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {skills.expertise.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer group ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:scale-150 group-hover:animate-pulse transition-all duration-300"></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;