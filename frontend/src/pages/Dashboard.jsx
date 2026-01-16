import React, { useState, useEffect, useCallback } from 'react';
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
  const [hasLoadedProjects, setHasLoadedProjects] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchProjects = useCallback(async () => {
    console.log('[Dashboard] fetchProjects called');
    setIsLoading(true);
    try {
      console.log('[Dashboard] Making API call to /projects');
      const response = await api.get('/projects');
      console.log('[Dashboard] API response received:', response.data);
      const projectsArray = response.data.projects || [];
      console.log('[Dashboard] Setting projects:', projectsArray.length, 'items');
      setProjects(projectsArray);
      setHasLoadedProjects(true);
    } catch (error) {
      console.error('[Dashboard] Error fetching projects:', error);
      setProjects([]);
      setHasLoadedProjects(true);
    } finally {
      console.log('[Dashboard] fetchProjects finally block');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'projects' && !hasLoadedProjects) {
      fetchProjects();
    }
  }, [activeTab, hasLoadedProjects, fetchProjects]);

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

  const handleUpdateProfile = () => {
    // Update user in context/auth state
    // This assumes the AuthContext has a way to update user
    // For now, just refresh the page to get updated data
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-2xl shadow-rose z-50 animate-slide-down max-w-sm">
          <div className="flex items-center gap-3">
            <span className="text-xl">✓</span>
            <span className="text-sm sm:text-base font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-primary-400 via-primary-500 to-blush-500 text-white px-4 sm:px-6 lg:px-8 py-10 sm:py-14 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-20 text-4xl opacity-30"></div>
        <div className="absolute bottom-10 left-20 text-4xl opacity-30"></div>
        
       <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center space-x-4 sm:space-x-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold flex-shrink-0 shadow-lg border text-white" style={{backgroundColor: '#C75C5C', borderColor: '#C75C5C'}}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold truncate drop-shadow-lg" style={{color: '#C75C5C'}}>{user?.name}</h1>
              <p className="text-sm sm:text-base truncate" style={{color: '#C75C5C'}}>@{user?.username}</p>
            </div>
          </div>
          <p className="mt-4 text-sm sm:text-base leading-relaxed max-w-2xl" style={{color: '#000000'}}>{user?.bio || 'No bio added yet. Add one in settings to tell the world about yourself!'}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Tabs */}
        <div className="flex space-x-2 sm:space-x-4 border-b border-cream-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 sm:px-6 py-2 pb-3 font-semibold transition-all text-sm sm:text-base whitespace-nowrap relative ${
              activeTab === 'overview'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-warm-600 hover:text-warm-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 sm:px-6 py-2 pb-3 font-semibold transition-all text-sm sm:text-base whitespace-nowrap relative ${
              activeTab === 'projects'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-warm-600 hover:text-warm-900'
            }`}
          >
            My Projects
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 sm:px-6 py-2 pb-3 font-semibold transition-all text-sm sm:text-base whitespace-nowrap relative ${
              activeTab === 'settings'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-warm-600 hover:text-warm-900'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 sm:p-8 border border-cream-200">
          {activeTab === 'overview' && (
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-8 text-warm-900">Dashboard Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="relative rounded-3xl p-6 sm:p-8 shadow-soft overflow-hidden group hover:shadow-lg hover:-translate-y-2 transition-all duration-300" style={{backgroundColor: '#FDF8F6', borderColor: '#FCEEE9', borderWidth: '2px'}}>
                  <div className="absolute top-4 right-4 text-3xl opacity-30"></div>
                  <div className="relative z-10">
                    <div className="text-sm font-semibold mb-2 text-warm-600">Total Projects</div>
                    <div className="font-heading text-4xl sm:text-5xl font-bold text-primary-600">{projects.length}</div>
                    <div className="text-sm mt-2 text-warm-500">Keep building!</div>
                  </div>
                </div>
                <div className="relative rounded-3xl p-6 sm:p-8 shadow-soft overflow-hidden group hover:shadow-lg hover:-translate-y-2 transition-all duration-300" style={{backgroundColor: '#FDF8F6', borderColor: '#FCEEE9', borderWidth: '2px'}}>
                  <div className="absolute top-4 right-4 text-3xl opacity-30"></div>
                  <div className="relative z-10">
                    <div className="text-sm font-semibold mb-2 text-warm-600">Portfolio Views</div>
                    <div className="font-heading text-4xl sm:text-5xl font-bold text-secondary-600">0</div>
                    <div className="text-sm mt-2 text-warm-500">Share your link!</div>
                  </div>
                </div>
                <div className="relative rounded-3xl p-6 sm:p-8 shadow-soft overflow-hidden group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 sm:col-span-2 lg:col-span-1" style={{backgroundColor: '#FDF8F6', borderColor: '#FCEEE9', borderWidth: '2px'}}>
                  <div className="absolute top-4 right-4 text-3xl opacity-30"></div>
                  <div className="relative z-10">
                    <div className="text-sm font-semibold mb-2 text-warm-600">Account Status</div>
                    <div className="font-heading text-2xl sm:text-3xl font-bold text-blush-600">Active & Ready</div>
                    <div className="text-sm mt-2 text-warm-500">All systems go!</div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl p-6" style={{backgroundColor: '#FDF8F6', borderColor: '#FCEEE9', borderWidth: '2px'}}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl"></span>
                  <div>
                    <p className="text-warm-700 leading-relaxed">
                      <span className="font-semibold text-primary-600">Welcome to your dashboard!</span> Start by adding your first project to showcase your amazing work to the world. Your portfolio is your digital handshake – make it count!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-warm-900">My Projects</h2>
                <button
                  onClick={handleAddProject}
                  className="btn-rose inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Project
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
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-8 text-warm-900">Settings</h2>
              <div className="space-y-8">
                {/* Profile Settings Component */}
                <ProfileSettings user={user} onUpdate={handleUpdateProfile} />

                {/* Share Your Portfolio */}
                <div className="pb-8 border-b border-cream-200">
                  <h3 className="font-heading text-lg font-semibold mb-4 text-warm-900 flex items-center gap-2">
                    <span></span> Share Your Portfolio
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">Share your portfolio with employers and colleagues:</p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={`${window.location.origin}/portfolio/${user?.username}`}
                      readOnly
                      className="flex-1 px-4 py-3 border-2 border-cream-200 rounded-xl bg-cream-50/50 text-sm font-mono text-warm-700"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/portfolio/${user?.username}`);
                        setSuccessMessage('Portfolio URL copied to clipboard! 📋');
                        setTimeout(() => setSuccessMessage(''), 3000);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-xl transition-all shadow-soft"
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
