import React, { useState } from 'react';
import TagsInput from './TagsInput';
import api from '../services/api';

const ProfileSettings = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    skills: user?.skills || [],
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    website: user?.website || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillsChange = (skills) => {
    setFormData(prev => ({
      ...prev,
      skills: skills,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await api.put('/auth/profile', formData);
      onUpdate(response.data.user);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Error updating profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
      skills: user?.skills || [],
      github: user?.github || '',
      linkedin: user?.linkedin || '',
      website: user?.website || '',
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        <div className="pb-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
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
              <span className="ml-2 font-medium">{user?.name || 'Not set'}</span>
            </div>
            <div>
              <span className="text-gray-600">Bio:</span>
              <span className="ml-2 font-medium">{user?.bio || 'No bio'}</span>
            </div>
            {user?.skills && user?.skills.length > 0 && (
              <div>
                <span className="text-gray-600">Skills:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {user?.github && (
              <div>
                <span className="text-gray-600">GitHub:</span>
                <a href={user.github} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
                  {user.github}
                </a>
              </div>
            )}
            {user?.linkedin && (
              <div>
                <span className="text-gray-600">LinkedIn:</span>
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
                  {user.linkedin}
                </a>
              </div>
            )}
            {user?.website && (
              <div>
                <span className="text-gray-600">Website:</span>
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
                  {user.website}
                </a>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          Edit Profile
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Skills */}
      <div>
        <TagsInput
          label="Skills"
          placeholder="e.g., JavaScript, React (press Enter to add)"
          tags={formData.skills}
          onTagsChange={handleSkillsChange}
          helpText="Add your technical skills and expertise"
        />
      </div>

      {/* GitHub */}
      <div>
        <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-2">
          GitHub Profile
        </label>
        <input
          type="url"
          id="github"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="https://github.com/username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
          LinkedIn Profile
        </label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
          Personal Website
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4 border-t">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
