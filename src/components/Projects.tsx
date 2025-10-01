import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Calendar, ChevronDown, ChevronUp, Code, Eye, MoreHorizontal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Projects = () => {
  const { projects } = portfolioData;
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
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
    setExpandedProjects(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getPreviewDescription = (description: string, maxLength: number = 120) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 transition-all duration-700 ease-in-out"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/50 via-cyan-200/40 to-blue-300/50 dark:from-blue-900/30 dark:via-cyan-900/25 dark:to-blue-800/30 rounded-full blur-3xl transition-all duration-1000 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-200/50 via-blue-200/40 to-cyan-300/50 dark:from-indigo-900/30 dark:via-blue-900/25 dark:to-cyan-800/30 rounded-full blur-3xl transition-all duration-1000 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-cyan-200/40 via-blue-300/30 to-indigo-300/40 dark:from-cyan-900/25 dark:via-blue-800/20 dark:to-indigo-900/25 rounded-full blur-2xl animate-pulse delay-500 transition-all duration-1000"></div>
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-gradient-to-br from-indigo-200/40 via-blue-300/30 to-cyan-300/40 dark:from-indigo-900/25 dark:via-blue-800/20 dark:to-cyan-900/25 rounded-full blur-2xl animate-pulse delay-1500 transition-all duration-1000"></div>
      <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-blue-300/40 to-cyan-400/40 dark:from-blue-800/30 dark:to-cyan-900/30 rounded-full blur-2xl animate-bounce delay-500"></div>
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-indigo-300/40 to-blue-400/40 dark:from-indigo-800/30 dark:to-blue-900/30 rounded-full blur-2xl animate-bounce delay-1500"></div>
      <div className="absolute top-16 right-16 w-16 h-16 bg-gradient-to-br from-emerald-300/35 to-teal-400/35 dark:from-emerald-800/25 dark:to-teal-900/25 rounded-full blur-xl animate-bounce delay-300"></div>
      <div className="absolute bottom-16 left-16 w-20 h-20 bg-gradient-to-br from-sky-300/35 to-blue-400/35 dark:from-sky-800/25 dark:to-blue-900/25 rounded-full blur-xl animate-bounce delay-800"></div>
      <div className="absolute top-3/4 left-10 w-12 h-12 bg-gradient-to-br from-cyan-300/35 to-blue-400/35 dark:from-cyan-800/25 dark:to-blue-900/25 rounded-full blur-lg animate-pulse delay-600"></div>
      <div className="absolute top-10 right-1/2 w-14 h-14 bg-gradient-to-br from-blue-300/35 to-indigo-400/35 dark:from-blue-800/25 dark:to-indigo-900/25 rounded-full blur-lg animate-pulse delay-1100"></div>
      <div className="absolute top-1/5 left-0 w-6 h-6 bg-blue-400/20 dark:bg-blue-600/15 rounded-full blur-sm" style={{ animation: 'slideRight 15s linear infinite', animationDelay: '0s' }}></div>
      <div className="absolute bottom-1/4 right-0 w-8 h-8 bg-cyan-400/20 dark:bg-cyan-600/15 rounded-full blur-sm" style={{ animation: 'slideLeft 12s linear infinite', animationDelay: '3s' }}></div>
      <div className="absolute top-3/5 left-1/2 w-4 h-4 bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-sm" style={{ animation: 'floatVertical 10s ease-in-out infinite', animationDelay: '1.5s' }}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-default">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 mx-auto rounded-full hover:w-32 transition-all duration-300"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => {
            const isExpanded = expandedProjects.includes(index);
            const previewDescription = getPreviewDescription(project.description);
            const hasMoreContent = project.description.length > 120;
            const hasDemoLink = !!project.demoUrl;

            return (
              <div
                key={index}
                // MODIFIED: Added glow, fixed transition, and added smooth easing
                className={`backdrop-blur-xl bg-white/15 dark:bg-gray-800/15 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transition-[box-shadow] duration-200 group flex flex-col ${hasMoreContent ? 'cursor-pointer' : 'cursor-default'} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${isExpanded ? 'scale-[1.02] shadow-3xl bg-white/25 dark:bg-gray-800/25' : 'hover:scale-[1.02] hover:bg-white/20 dark:hover:bg-gray-800/20'} hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onClick={() => hasMoreContent && toggleExpanded(index)}
              >
                {/* Header Section */}
                <div className="p-8 pb-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex-1 leading-tight">
                      {project.title}
                    </h3>
                    {hasMoreContent && (
                      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {isExpanded ? 'Show Less' : 'Show More'}
                        </span>
                        <div className={`transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          isExpanded ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
                        }`}>
                          <ChevronDown size={20} className="text-blue-600 dark:text-blue-400 group-hover:animate-bounce" />
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                    {project.subtitle}
                  </p>

                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
                    <Calendar size={16} className="group-hover:animate-pulse flex-shrink-0" />
                    <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                      {project.period}
                    </span>
                  </div>
                </div>

                {/* Description Section */}
                <div className="px-8 pb-6 flex-1">
                  <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isExpanded ? 'max-h-96' : 'max-h-20'
                  }`}>
                    <div className={`transform transition-all duration-500`}>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
                        {isExpanded ? project.description : previewDescription}
                        {!isExpanded && hasMoreContent && '...'}
                      </p>
                    </div>
                  </div>

                  {hasMoreContent && !isExpanded && (
                    <div className="flex justify-center mt-3">
                      <MoreHorizontal size={16} className="text-gray-400 dark:text-gray-500 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Technologies Section */}
                <div className="px-8 pb-6">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <Code size={16} className="text-indigo-600 dark:text-indigo-400" />
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        // MODIFIED: Added glow
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg text-sm font-medium hover:scale-110 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:shadow-[0_0_15px_rgba(234,179,8,0.5)] dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        style={{ animationDelay: `${i * 50}ms` }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-8 pt-0 mt-auto">
                  <div className="flex gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      // MODIFIED: Added glow
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:scale-105 transition-all duration-300 group/btn flex-1 justify-center backdrop-blur-sm hover:shadow-[0_0_15px_rgba(234,179,8,0.5)] dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} className="group-hover/btn:animate-pulse" />
                      <span className="font-medium">Code</span>
                    </a>
                    <a
                      href={hasDemoLink ? project.demoUrl : undefined}
                      target={hasDemoLink ? "_blank" : undefined}
                      rel={hasDemoLink ? "noopener noreferrer" : undefined}
                      // MODIFIED: Added glow
                      className={`flex items-center gap-2 px-6 py-3 border-2 rounded-xl transition-all duration-300 hover:scale-105 group/btn flex-1 justify-center backdrop-blur-sm hover:shadow-[0_0_15px_rgba(234,179,8,0.5)] dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] ${
                        hasDemoLink
                          ? "border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white"
                          : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
                      }`}
                      onClick={(e) => {
                        if (!hasDemoLink) e.preventDefault();
                        e.stopPropagation();
                      }}
                      aria-disabled={!hasDemoLink}
                      tabIndex={hasDemoLink ? 0 : -1}
                    >
                      <Eye size={16} className="group-hover/btn:animate-pulse" />
                      <span className="font-medium">Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          0% { transform: translateX(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 100px)); opacity: 0; }
        }
        @keyframes slideLeft {
          0% { transform: translateX(100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(calc(-100vw - 100px)); opacity: 0; }
        }
        @keyframes floatVertical {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-50px); }
        }
      `}</style>
    </section>
  );
};

export default Projects;