import React from 'react';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-indigo-50"></div>
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-purple-600 font-medium mb-2">{project.subtitle}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span>{project.period}</span>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href={project.githubUrl}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
                >
                  <Github size={16} />
                  Code
                </a>
                <a 
                  href={project.demoUrl}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-purple-500 text-purple-600 rounded-lg hover:bg-purple-500 hover:text-white transition-all hover:scale-105"
                >
                  <ExternalLink size={16} />
                  Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;