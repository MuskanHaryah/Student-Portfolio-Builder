import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Portfolio = () => {
  const { user, loading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.projects || response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while auth is loading
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cream-50 via-blush-50 to-cream-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-warm-600 font-medium text-lg">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  const projectCount = Array.isArray(projects) ? projects.length : 0;
  const skillsCount = user?.skills?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-blush-50">
      {/* Hero Section with Animated Background */}
      <div className="relative text-white px-4 sm:px-6 lg:px-8 py-20 sm:py-28 overflow-hidden" 
           style={{ 
             background: 'linear-gradient(135deg, #C75C5C 0%, #B74E4E 50%, #A84848 100%)',
           }}>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/20 rounded-2xl rotate-12 animate-float"></div>
          <div className="absolute bottom-40 right-20 w-16 h-16 border-2 border-white/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-40 right-40 w-12 h-12 bg-white/10 rounded-lg rotate-45 animate-float" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Profile Picture */}
          <div className="relative inline-block mb-8">
            <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md rounded-3xl mx-auto flex items-center justify-center text-5xl sm:text-6xl font-bold shadow-2xl border-4 border-white/30 transform hover:scale-105 transition-transform duration-300">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-400 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight animate-fade-in">
            {user?.name}
          </h1>
          <p className="text-white/90 text-xl sm:text-2xl mb-3 font-medium">@{user?.username}</p>
          
          {/* Bio */}
          <p className="text-white/85 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mb-8 px-4">
            {user?.bio || 'Passionate developer building amazing projects. Add your bio in settings to share your story!'}
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 hover:bg-white/25 transition-all hover:scale-105">
              <div className="text-3xl sm:text-4xl font-bold mb-1">{projectCount}</div>
              <div className="text-white/80 text-sm sm:text-base">Projects</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 hover:bg-white/25 transition-all hover:scale-105">
              <div className="text-3xl sm:text-4xl font-bold mb-1">{skillsCount}</div>
              <div className="text-white/80 text-sm sm:text-base">Skills</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 hover:bg-white/25 transition-all hover:scale-105">
              <div className="text-3xl sm:text-4xl font-bold mb-1">100%</div>
              <div className="text-white/80 text-sm sm:text-base">Passion</div>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {user?.github && (
              <a 
                href={user.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 border border-white/30 shadow-lg"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {user?.linkedin && (
              <a 
                href={user.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 border border-white/30 shadow-lg"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
            {user?.website && (
              <a 
                href={user.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 border border-white/30 shadow-lg"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            )}
            {!user?.github && !user?.linkedin && !user?.website && (
              <>
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <svg className="w-6 h-6 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <svg className="w-6 h-6 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
              </>
            )}
          </div>

          {/* Scroll Indicator */}
          <div className="mt-12 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {user?.skills && user.skills.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-warm-900 mb-4">Skills & Technologies</h2>
            <p className="text-warm-600 max-w-2xl mx-auto">Technologies and tools I work with to bring ideas to life</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {user.skills.map((skill, index) => (
              <div
                key={index}
                className="group px-6 py-3 rounded-2xl font-semibold border-2 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#C75C5C', borderColor: '#C75C5C', color: 'white' }}
              >
                <span className="text-lg">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-warm-900 mb-6">Featured Projects</h2>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            A collection of projects showcasing my skills and creativity
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl shadow-soft border border-cream-200 overflow-hidden animate-pulse">
                <div className="h-56 bg-gradient-to-br from-cream-200 to-blush-100"></div>
                <div className="p-6">
                  <div className="h-6 bg-cream-200 rounded-full mb-3 w-3/4"></div>
                  <div className="h-4 bg-cream-100 rounded-full mb-2"></div>
                  <div className="h-4 bg-cream-100 rounded-full w-5/6 mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-cream-100 rounded-lg w-20"></div>
                    <div className="h-8 bg-cream-100 rounded-lg w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (!Array.isArray(projects) || projects.length === 0) ? (
          <div className="text-center py-20 bg-gradient-to-br from-white to-cream-50 rounded-3xl border-2 border-dashed border-cream-300 shadow-inner">
            <div className="text-8xl mb-6 animate-bounce">📁</div>
            <h3 className="text-2xl font-bold text-warm-800 mb-3">No Projects Yet</h3>
            <p className="text-warm-600 text-lg mb-6 max-w-md mx-auto">
              Your amazing projects will appear here. Start building and showcase your work!
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-all cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add your first project
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project._id} 
                className="bg-white rounded-3xl shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden border border-cream-200 group hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                {project.images && project.images.length > 0 ? (
                  <div className="w-full h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-cream-100 to-blush-100 relative">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-cream-100 via-blush-50 to-primary-50 flex items-center justify-center relative">
                    <svg className="w-16 h-16 text-warm-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {/* Project Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-warm-900 mb-2 line-clamp-1 group-hover:text-[#C75C5C] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description || 'No description provided'}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-block bg-gradient-to-r from-[#C75C5C]/10 to-blush-50 text-[#C75C5C] text-xs px-3 py-1.5 rounded-full font-medium border border-[#C75C5C]/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="inline-block bg-cream-100 text-warm-600 text-xs px-3 py-1.5 rounded-full font-medium border border-cream-200">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-3 mt-5">
                    {project.githubLink && project.githubLink.trim() !== '' && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-sm bg-white hover:bg-[#C75C5C]/5 py-3 px-4 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border-2 border-[#C75C5C] text-[#C75C5C]"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {project.liveLink && project.liveLink.trim() !== '' && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-sm bg-gradient-to-r from-[#C75C5C] to-[#B54C4C] hover:from-[#B54C4C] hover:to-[#A43C3C] text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {/* Show message if no links */}
                    {(!project.githubLink || project.githubLink.trim() === '') && (!project.liveLink || project.liveLink.trim() === '') && (
                      <div className="w-full text-center text-sm text-warm-400 py-3">
                        No links added yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FDF8F6 0%, #FCEEE9 50%, #FDF8F6 100%)' }}>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blush-100 rounded-full blur-3xl opacity-40"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl mb-8 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-warm-900 mb-6">
            Let's Work Together!
          </h2>
          <p className="text-warm-600 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? I'm always open to discussing new opportunities and creative ideas. Let's build something amazing!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {user?.github && (
              <a
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-600 rounded-2xl font-bold hover:bg-cream-50 transition-all border-2 border-primary-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>View GitHub Profile</span>
              </a>
            )}
            {user?.linkedin && (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                style={{ backgroundColor: '#C75C5C' }}
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>Connect on LinkedIn</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            )}
          </div>

          {/* Email/Contact Info */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 text-warm-600 text-sm">
            <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Open to collaboration and new opportunities</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-warm-900 text-white/80 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="font-heading text-2xl font-bold text-white mb-2">{user?.name}</h3>
            <p className="text-white/60">@{user?.username}</p>
          </div>
          <p className="text-sm mb-6">
            Built using Portfolio Builder
          </p>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {user?.name}. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
