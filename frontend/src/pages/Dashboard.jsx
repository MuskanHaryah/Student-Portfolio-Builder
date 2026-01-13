import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProjectGrid from '../components/ProjectGrid';
import ProjectForm from '../components/ProjectForm';
import Modal from '../components/Modal';
import ProfileSettings from '../components/ProfileSettings';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    }
  }, [activeTab]);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/projects');
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = () => {
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // Prepare FormData for multipart upload
      const submitData = new FormData();
      
      // Add text fields
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('githubLink', formData.githubLink);
      submitData.append('liveLink', formData.liveLink);
      submitData.append('dateCompleted', formData.dateCompleted);
      
      // Add technologies as JSON
      submitData.append('technologies', JSON.stringify(formData.technologies));
      
      // Add image files
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          // If it's a File object (new upload), add it
          if (image instanceof File) {
            submitData.append('images', image);
          }
          // If it's a string URL (existing image), we'll handle separately
          else if (typeof image === 'string' && image.startsWith('http')) {
            submitData.append('existingImages', image);
          }
        });
      }
      
      const response = await api.post('/projects', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setProjects([response.data, ...projects]);
      setIsFormOpen(false);
      setSuccessMessage('Project created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error creating project:', error);
      alert(error.response?.data?.message || 'Error creating project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
      setProjects(projects.filter(p => p._id !== projectId));
      setSuccessMessage('Project deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting project:', error);
      alert(error.response?.data?.message || 'Error deleting project. Please try again.');
    }
  };

  const handleEditProject = (project) => {
    // TODO: Implement edit functionality in next step
    console.log('Edit project:', project);
    alert('Edit functionality coming soon!');
  };

  const handleUpdateProfile = (updatedUser) => {
    // Update user in context/auth state
    // This assumes the AuthContext has a way to update user
    // For now, just refresh the page to get updated data
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user?.name}</h1>
              <p className="text-blue-100">@{user?.username}</p>
            </div>
          </div>
          <p className="text-blue-100 mt-4">{user?.bio || 'No bio added yet'}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium transition border-b-2 ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium transition border-b-2 ${
              activeTab === 'projects'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            My Projects
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 font-medium transition border-b-2 ${
              activeTab === 'settings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <div className="text-sm text-gray-600 font-medium">Total Projects</div>
                  <div className="text-4xl font-bold text-blue-600 mt-2">{projects.length}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <div className="text-sm text-gray-600 font-medium">Portfolio Views</div>
                  <div className="text-4xl font-bold text-purple-600 mt-2">0</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <div className="text-sm text-gray-600 font-medium">Account Status</div>
                  <div className="text-lg font-bold text-green-600 mt-2">Active</div>
                </div>
              </div>

              <p className="text-gray-600">Welcome to your dashboard! Start by adding your first project to showcase your work.</p>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Projects</h2>
                <button
                  onClick={handleAddProject}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                >
                  + Add Project
                </button>
              </div>
              <ProjectGrid 
                projects={projects} 
                isLoading={isLoading} 
                onAddProject={handleAddProject}
                onDeleteProject={handleDeleteProject}
                onEditProject={handleEditProject}
              />
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <div className="space-y-6">
                {/* Profile Settings Component */}
                <ProfileSettings user={user} onUpdate={handleUpdateProfile} />

                {/* Share Your Portfolio */}
                <div className="pb-6 border-b">
                  <h3 className="text-lg font-semibold mb-4">Share Your Portfolio</h3>
                  <p className="text-gray-600 text-sm mb-3">Share your portfolio with employers and colleagues:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={`${window.location.origin}/portfolio/${user?.username}`}
                      readOnly
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/portfolio/${user?.username}`);
                        alert('Portfolio URL copied to clipboard!');
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Form Modal */}
      <Modal
        isOpen={isFormOpen}
        title="Create New Project"
        onClose={handleFormCancel}
      >
        <ProjectForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
