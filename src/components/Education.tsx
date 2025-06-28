import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Education = () => {
  const { education, certifications } = portfolioData;

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-gray-50">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Education & Certifications</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <GraduationCap className="text-blue-600" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="backdrop-blur-sm bg-white/80 p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{edu.degree}</h4>
                  <p className="text-blue-600 font-medium mb-2">{edu.institution}</p>
                  <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{edu.period}</span>
                    </div>
                    <span className="font-semibold text-green-600">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Certifications */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Certifications</h3>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div key={index} className="backdrop-blur-sm bg-white/80 p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{cert.title}</h4>
                  {cert.institution && (
                    <p className="text-blue-600 font-medium mb-2">{cert.institution}</p>
                  )}
                  <div className="flex items-center justify-between text-gray-600">
                    <span>{cert.year}</span>
                    {cert.grade && (
                      <span className="font-semibold text-green-600">{cert.grade}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;