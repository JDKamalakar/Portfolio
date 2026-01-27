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
          skills.technical.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => [...prev, index]);
            }, index * 200);
          });
        } else {
          setIsVisible(false);
          setAnimatedSkills([]);
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
      className="py-20 px-6 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-all duration-700 ease-in-out"
    >
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/50 via-indigo-200/40 to-cyan-300/50 dark:from-blue-900/30 dark:via-indigo-900/25 dark:to-cyan-800/30 rounded-full blur-3xl transition-all duration-1000 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-br from-cyan-200/50 via-blue-200/40 to-indigo-300/50 dark:from-cyan-900/30 dark:via-blue-900/25 dark:to-indigo-800/30 rounded-full blur-3xl transition-all duration-1000 animate-pulse delay-1000"></div>
      <div className="absolute top-0 right-1/3 w-64 h-64 bg-gradient-to-br from-cyan-200/40 via-sky-300/30 to-blue-300/40 dark:from-cyan-900/25 dark:via-sky-800/20 dark:to-blue-900/25 rounded-full blur-2xl animate-pulse delay-500 transition-all duration-1000"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-200/40 via-blue-300/30 to-cyan-300/40 dark:from-indigo-900/25 dark:via-blue-800/20 dark:to-cyan-900/25 rounded-full blur-2xl animate-pulse delay-1500 transition-all duration-1000"></div>
      <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-cyan-300/40 to-blue-400/40 dark:from-cyan-800/30 dark:to-blue-900/30 rounded-full blur-2xl animate-bounce delay-500"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-300/40 to-indigo-400/40 dark:from-blue-800/30 dark:to-indigo-900/30 rounded-full blur-2xl animate-bounce delay-1500"></div>
      <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-emerald-300/35 to-teal-400/35 dark:from-emerald-800/25 dark:to-teal-900/25 rounded-full blur-xl animate-bounce delay-400"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-br from-sky-300/35 to-blue-400/35 dark:from-sky-800/25 dark:to-blue-900/25 rounded-full blur-xl animate-bounce delay-1000"></div>
      <div className="absolute top-2/3 right-10 w-12 h-12 bg-gradient-to-br from-cyan-300/35 to-blue-400/35 dark:from-cyan-800/25 dark:to-blue-900/25 rounded-full blur-lg animate-pulse delay-700"></div>
      <div className="absolute top-10 left-1/2 w-14 h-14 bg-gradient-to-br from-blue-300/35 to-indigo-400/35 dark:from-blue-800/25 dark:to-indigo-900/25 rounded-full blur-lg animate-pulse delay-1200"></div>
      <div className="absolute top-1/5 left-0 w-6 h-6 bg-blue-400/20 dark:bg-blue-600/15 rounded-full blur-sm" style={{ animation: 'waveMotion 16s ease-in-out infinite', animationDelay: '0s' }}></div>
      <div className="absolute bottom-1/5 right-0 w-8 h-8 bg-cyan-400/20 dark:bg-cyan-600/15 rounded-full blur-sm" style={{ animation: 'waveMotion 14s ease-in-out infinite reverse', animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-5 h-5 bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-sm" style={{ animation: 'circularMotion 18s linear infinite', animationDelay: '1s' }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-default">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 mx-auto rounded-full hover:w-32 transition-all duration-300"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills with Progress Bars */}
          <div className={`backdrop-blur-xl bg-white/15 dark:bg-gray-800/15 p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 hover:bg-white/25 dark:hover:bg-gray-800/25 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transition-[box-shadow] duration-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            } hover:scale-[1.02] theme-glow`}>
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
                  <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden group-hover:h-4 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:shadow-[0_0_12px_rgba(234,179,8,0.4)] dark:group-hover:shadow-[0_0_12px_rgba(59,130,246,0.4)]`}>
                    <div
                      className={`h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full transition-all duration-1000 ease-out ${animatedSkills.includes(index) ? 'animate-pulse' : ''
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
          <div className={`backdrop-blur-xl bg-white/15 dark:bg-gray-800/15 p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 hover:bg-white/25 dark:hover:bg-gray-800/25 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transition-[box-shadow] duration-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            } hover:scale-[1.02] theme-glow`}>
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-cyan-600 dark:text-cyan-400" size={28} />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Core Expertise</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {skills.expertise.map((item, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className="flex items-center shadow-md gap-3 p-4 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer group backdrop-blur-sm theme-glow"
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full group-hover:scale-150 group-hover:animate-pulse transition-all duration-300"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes waveMotion {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(60px) translateY(-40px); }
          50% { transform: translateX(120px) translateY(0px); }
          75% { transform: translateX(60px) translateY(40px); }
        }
        @keyframes circularMotion {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
      `}</style>
    </section>
  );
};

export default Skills;