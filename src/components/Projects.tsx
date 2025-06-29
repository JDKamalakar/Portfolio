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
      className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 transition-all duration-700 ease-in-out"
    >
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl transition-colors duration-500"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full blur-3xl transition-colors duration-500"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 cursor-default">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full hover:w-32 transition-all duration-300"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => {
            const isExpanded = expandedProjects.includes(index);
            const previewDescription = getPreviewDescription(project.description);
            const hasMoreContent = project.description.length > 120;
            
            return (
              <div 
                key={index} 
                className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group flex flex-col ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Header Section */}
                <div className="p-8 pb-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 flex-1 leading-tight">
                      {project.title}
                    </h3>
                    {hasMoreContent && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-300 ml-4 flex-shrink-0"
                      >
                        {isExpanded ? (
                          <ChevronUp size={20} className="hover:animate-bounce transition-transform duration-300" />
                        ) : (
                          <ChevronDown size={20} className="hover:animate-bounce transition-transform duration-300" />
                        )}
                      </button>
                    )}
                  </div>
                  
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
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
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-96' : 'max-h-20'
                  }`}>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
                      {isExpanded ? project.description : previewDescription}
                    </p>
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
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-sm font-medium hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons - Anchored to bottom */}
                <div className="p-8 pt-0 mt-auto">
                  <div className="flex gap-4">
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 group/btn flex-1 justify-center"
                    >
                      <Github size={16} className="group-hover/btn:animate-pulse" />
                      <span className="font-medium">Code</span>
                    </a>
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 border-2 border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-500 dark:hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105 group/btn flex-1 justify-center"
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
    </section>
  );
};

export default Projects;