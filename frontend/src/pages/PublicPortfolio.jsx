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
              <div key={project._id} className="bg-white rounded-3xl shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden border border-cream-200 group relative">
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
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="inline-block bg-white text-warm-900 text-xs px-3 py-1.5 rounded-full font-medium border-2 border-warm-900"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="inline-block bg-white text-warm-900 text-xs px-3 py-1.5 rounded-full font-medium border-2 border-warm-900">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-3 mt-5">
                    {project.githubLink && project.githubLink.trim() !== '' ? (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-sm bg-white hover:bg-gray-50 py-2.5 px-4 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border-2"
                        style={{ color: '#C75C5C', borderColor: '#C75C5C' }}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub Link
                      </a>
                    ) : (
                      <div className="flex-1 bg-gray-50 py-2.5 px-4 rounded-xl border-2 border-gray-100"></div>
                    )}
                    {project.liveLink && project.liveLink.trim() !== '' ? (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-sm bg-gradient-to-r from-[#C75C5C] to-[#B54C4C] hover:from-[#B54C4C] hover:to-[#A43C3C] text-white py-2.5 px-4 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    ) : (
                      <div className="flex-1 bg-gray-50 py-2.5 px-4 rounded-xl border-2 border-gray-100"></div>
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
