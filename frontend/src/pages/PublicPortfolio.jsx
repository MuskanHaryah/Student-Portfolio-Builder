import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ProjectGrid from '../components/ProjectGrid';
import LoadingSpinner from '../components/LoadingSpinner';

const PublicPortfolio = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolioData();
  }, [username]);

  const fetchPortfolioData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch user profile and projects using public endpoint
      const response = await api.get(`/projects/user/${username}`, {
        skipAuth: true, // Indicate this is a public endpoint
      });
      
      if (response.data) {
        setPortfolioData(response.data.user);
        setProjects(response.data.projects || []);
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError(err.response?.data?.message || 'Failed to load portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" color="rose" />
          <p className="text-warm-600 mt-4 text-sm sm:text-base">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-8">
        <div className="text-center max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-cream-200">
          <div className="text-5xl mb-4"></div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-warm-900 mb-2">Portfolio Not Found</h1>
          <p className="text-sm sm:text-base text-warm-600 mb-6">{error || `No portfolio found for @${username}`}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-rose inline-block"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-primary-400 via-primary-500 to-blush-500 text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blush-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-20 text-4xl opacity-30"></div>
        <div className="absolute bottom-10 left-20 text-4xl opacity-30"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/30 backdrop-blur-sm rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl sm:text-5xl font-bold shadow-lg border border-white/40">
            {portfolioData.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{portfolioData.name}</h1>
          <p className="text-white/80 text-lg mb-4">@{portfolioData.username}</p>
          <p className="text-white/90 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {portfolioData.bio || 'Welcome to my portfolio!'}
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {portfolioData.github && (
              <a
                href={portfolioData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full hover:bg-white/30 transition-all text-white font-medium"
              >
                <span>⚡</span> GitHub
              </a>
            )}
            {portfolioData.linkedin && (
              <a
                href={portfolioData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full hover:bg-white/30 transition-all text-white font-medium"
              >
                <span></span> LinkedIn
              </a>
            )}
            {portfolioData.website && (
              <a
                href={portfolioData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full hover:bg-white/30 transition-all text-white font-medium"
              >
                <span>🌐</span> Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {portfolioData.skills && portfolioData.skills.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-warm-900 mb-6 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {portfolioData.skills.map((skill, index) => (
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Projects Section */}
        <div className="text-center mb-12">
          <span className="inline-block text-primary-600 font-medium text-sm tracking-wider uppercase mb-3">Portfolio</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-warm-900">Projects</h2>
        </div>
        
        {(!Array.isArray(projects) || projects.length === 0) ? (
          <div className="text-center py-16 bg-white/50 rounded-3xl border border-cream-200">
            <span className="text-6xl mb-4 block">📁</span>
            <p className="text-warm-600 text-lg">No projects to display yet</p>
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

export default PublicPortfolio;
