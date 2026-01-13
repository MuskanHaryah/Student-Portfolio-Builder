import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
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
                  <div className="text-4xl font-bold text-blue-600 mt-2">0</div>
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
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition">
                  Add Project
                </button>
              </div>
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No projects yet. Create your first project to showcase your work!</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <div className="space-y-6">
                <div className="pb-6 border-b">
                  <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-2 font-medium">{user?.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Username:</span>
                      <span className="ml-2 font-medium">@{user?.username}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <span className="ml-2 font-medium">{user?.name}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                  <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition font-medium">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
