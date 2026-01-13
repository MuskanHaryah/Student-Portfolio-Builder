import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ projects, isLoading, onAddProject, onDeleteProject, onEditProject }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-5xl mb-4">📁</div>
        <p className="text-gray-600 text-lg mb-4">No projects yet. Create your first project!</p>
        <button
          onClick={onAddProject}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Create Project
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard 
          key={project._id} 
          project={project}
          onDelete={onDeleteProject}
          onEdit={() => onEditProject(project)}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
