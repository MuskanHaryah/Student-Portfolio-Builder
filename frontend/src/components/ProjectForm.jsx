import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import TagsInput from './TagsInput';

const ProjectForm = ({ onSubmit, onCancel, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    githubLink: '',
    liveLink: '',
    dateCompleted: '',
    images: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        technologies: initialData.technologies || [],
        githubLink: initialData.githubLink || '',
        liveLink: initialData.liveLink || '',
        dateCompleted: initialData.dateCompleted ? initialData.dateCompleted.split('T')[0] : '',
        images: initialData.images || [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImagesChange = (images) => {
    setFormData(prev => ({
      ...prev,
      images: images,
    }));
  };

  const handleTechnologiesChange = (technologies) => {
    setFormData(prev => ({
      ...prev,
      technologies: technologies,
    }));
    if (errors.technologies) {
      setErrors(prev => ({
        ...prev,
        technologies: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }
    if (formData.technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Project Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., E-commerce Platform"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            errors.title
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your project, what it does, and key features..."
          rows="4"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            errors.description
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Image Upload */}
      <div>
        <ImageUpload onImagesChange={handleImagesChange} initialImages={formData.images} />
      </div>

      {/* Technologies Field */}
      <div>
        <TagsInput
          label="Technologies Used"
          placeholder="e.g., React, Node.js (press Enter to add)"
          tags={formData.technologies}
          onTagsChange={handleTechnologiesChange}
          errorMessage={errors.technologies}
          isRequired={true}
          helpText="Add the technologies and frameworks you used in this project"
        />
      </div>

      {/* GitHub Link */}
      <div>
        <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 mb-2">
          GitHub Repository Link
        </label>
        <input
          type="url"
          id="githubLink"
          name="githubLink"
          value={formData.githubLink}
          onChange={handleChange}
          placeholder="https://github.com/username/repo"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Live Link */}
      <div>
        <label htmlFor="liveLink" className="block text-sm font-medium text-gray-700 mb-2">
          Live Demo Link
        </label>
        <input
          type="url"
          id="liveLink"
          name="liveLink"
          value={formData.liveLink}
          onChange={handleChange}
          placeholder="https://myproject.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Date Completed */}
      <div>
        <label htmlFor="dateCompleted" className="block text-sm font-medium text-gray-700 mb-2">
          Completion Date
        </label>
        <input
          type="date"
          id="dateCompleted"
          name="dateCompleted"
          value={formData.dateCompleted}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4 border-t">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Project' : 'Create Project'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
