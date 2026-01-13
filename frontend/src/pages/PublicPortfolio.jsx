import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import ProjectGrid from '../components/ProjectGrid';

const PublicPortfolio = () => {
  const { username } = useParams();
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-gray-400 text-5xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-6">{error || `No portfolio found for @${username}`}</p>
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
              {portfolioData.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{portfolioData.name}</h1>
              <p className="text-blue-100">@{portfolioData.username}</p>
            </div>
          </div>
          <p className="text-blue-100 mt-4">{portfolioData.bio || 'No bio added yet'}</p>

          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            {portfolioData.github && (
              <a
                href={portfolioData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition underline"
              >
                GitHub
              </a>
            )}
            {portfolioData.linkedin && (
              <a
                href={portfolioData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition underline"
              >
                LinkedIn
              </a>
            )}
            {portfolioData.website && (
              <a
                href={portfolioData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition underline"
              >
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Projects Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">📁</div>
              <p className="text-gray-600 text-lg">No projects to display yet</p>
            </div>
          ) : (
            <ProjectGrid 
              projects={projects} 
              isLoading={false}
              onAddProject={() => {}} // Not used in public view
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicPortfolio;
