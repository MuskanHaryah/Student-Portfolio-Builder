import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Portfolio = () => {
  const { user, loading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while auth is loading
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-warm-600 font-medium">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <div className="relative text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #C75C5C 0%, #A84848 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/30 backdrop-blur-sm rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl sm:text-5xl font-bold shadow-lg border border-white/40">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{user?.name}</h1>
          <p className="text-white/80 text-lg mb-4">@{user?.username}</p>
          <p className="text-white/90 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {user?.bio || 'No bio added yet. Add one in settings to tell the world about yourself!'}
          </p>
          
          {/* Social Links Placeholder */}
          <div className="flex justify-center gap-4 mt-8">
            <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110">
              <span className="text-xl"></span>
            </a>
            <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110">
              <span className="text-xl"></span>
            </a>
            <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110">
              <span className="text-xl"></span>
            </a>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {user?.skills && user.skills.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-warm-900 mb-6 text-center">My Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white rounded-full text-primary-600 font-medium border border-primary-200 shadow-soft hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <span className="inline-block text-primary-600 font-medium text-sm tracking-wider uppercase mb-3">Portfolio</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-warm-900">My Projects</h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl shadow-soft border border-cream-200 overflow-hidden animate-pulse">
                <div className="h-48 bg-cream-200"></div>
                <div className="p-6">
                  <div className="h-5 bg-cream-200 rounded-full mb-3 w-3/4"></div>
                  <div className="h-4 bg-cream-100 rounded-full mb-2"></div>
                  <div className="h-4 bg-cream-100 rounded-full w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (!Array.isArray(projects) || projects.length === 0) ? (
          <div className="text-center py-16 bg-white/50 rounded-3xl border border-cream-200">
            <span className="text-6xl mb-4 block">📁</span>
            <p className="text-warm-600 text-lg mb-4">No projects yet</p>
            <p className="text-warm-500">Projects added to your portfolio will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => (
              <div key={project._id} className="bg-white rounded-3xl shadow-soft border border-cream-200 overflow-hidden group hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                {/* Project Image */}
                {project.images && project.images.length > 0 ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-cream-100 to-blush-100 flex items-center justify-center">
                    <span className="text-5xl">📁</span>
                  </div>
                )}
                
                {/* Project Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-warm-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4 line-clamp-2">
                    {project.description || 'No description provided'}
                  </p>
                  
                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full border border-primary-100"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-cream-100 text-warm-600 text-xs font-medium rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Links */}
                  <div className="flex gap-3">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-sm bg-warm-800 hover:bg-warm-900 text-white py-2.5 rounded-xl transition-all font-medium"
                      >
                        ⚡ GitHub
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-sm bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-2.5 rounded-xl transition-all font-medium"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-warm-900 text-white/80 px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-sm">
          Made with care using Portfolio Builder
        </p>
      </div>
    </div>
  );
};

export default Portfolio;
