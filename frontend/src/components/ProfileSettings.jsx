import React, { useState } from 'react';
import TagsInput from './TagsInput';
import api from '../services/api';
import LoadingSpinner from './LoadingSpinner';

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

  // Update formData when user prop changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        skills: user.skills || [],
        github: user.github || '',
        linkedin: user.linkedin || '',
        website: user.website || '',
      });
    }
  }, [user]);

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
    setSuccessMessage('');
    try {
      console.log('Sending profile update:', formData);
      const response = await api.put('/auth/profile', formData);
      console.log('Profile update response:', response.data);
      onUpdate(response.data.user);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      console.error('Error response:', error.response?.data);
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
          <div className="bg-primary-50 border border-primary-200 text-primary-700 px-5 py-4 rounded-2xl animate-slide-down">
            <div className="flex items-center gap-3">
              <span className="text-xl">✓</span>
              <span className="font-medium">{successMessage}</span>
            </div>
          </div>
        )}

        <div className="card-elegant p-8">
          <h3 className="font-heading text-2xl font-semibold mb-8 text-warm-900">
            Profile Information
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-start pb-4 border-b border-cream-200">
              <span className="text-warm-600 font-medium">Email:</span>
              <span className="font-semibold text-warm-800">{user?.email}</span>
            </div>
            <div className="flex justify-between items-start pb-4 border-b border-cream-200">
              <span className="text-warm-600 font-medium">Username:</span>
              <span className="font-semibold text-warm-800">@{user?.username}</span>
            </div>
            <div className="flex justify-between items-start pb-4 border-b border-cream-200">
              <span className="text-warm-600 font-medium">Name:</span>
              <span className="font-semibold text-warm-800">{user?.name || 'Not set'}</span>
            </div>
            <div className="flex justify-between items-start pb-4 border-b border-cream-200">
              <span className="text-warm-600 font-medium">Bio:</span>
              <span className="font-semibold text-warm-800 text-right max-w-xs">{user?.bio || 'No bio'}</span>
            </div>
            {user?.skills && user?.skills.length > 0 && (
              <div className="flex justify-between items-start pb-4 border-b border-cream-200">
                <span className="text-warm-600 font-medium">Skills:</span>
                <div className="flex flex-wrap gap-2 justify-end">
                  {user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-gradient-to-r from-primary-50 to-blush-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold border border-primary-200 shadow-soft hover:shadow-medium transition-shadow"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {user?.github && (
              <div className="flex justify-between items-start pb-4 border-b border-cream-200">
                <span className="text-warm-600 font-medium">GitHub:</span>
                <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                  github.com
                </a>
              </div>
            )}
            {user?.linkedin && (
              <div className="flex justify-between items-start pb-4 border-b border-cream-200">
                <span className="text-warm-600 font-medium">LinkedIn:</span>
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                  linkedin.com
                </a>
              </div>
            )}
            {user?.website && (
              <div className="flex justify-between items-start">
                <span className="text-warm-600 font-medium">Website:</span>
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                  visit website
                </a>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="btn-rose"
        >
          ✎ Edit Profile
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-warm-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className="w-full px-4 py-3 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-cream-50 transition-all"
        />
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-warm-700 mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          rows="3"
          className="w-full px-4 py-3 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-cream-50 transition-all resize-none"
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
        <label htmlFor="github" className="block text-sm font-medium text-warm-700 mb-2">
          GitHub Profile
        </label>
        <input
          type="url"
          id="github"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="https://github.com/username"
          className="w-full px-4 py-3 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-cream-50 transition-all"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-warm-700 mb-2">
          LinkedIn Profile
        </label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
          className="w-full px-4 py-3 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-cream-50 transition-all"
        />
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-warm-700 mb-2">
          Personal Website
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
          className="w-full px-4 py-3 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-cream-50 transition-all"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t border-cream-200">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex-1 btn-rose disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <LoadingSpinner size="sm" color="white" />}
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="flex-1 btn-cream disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
