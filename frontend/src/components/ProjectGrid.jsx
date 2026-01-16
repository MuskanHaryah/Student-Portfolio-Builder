import React from 'react';
import ProjectCard from './ProjectCard';
import SkeletonCard from './SkeletonCard';

const ProjectGrid = ({ projects, isLoading, onAddProject, onDeleteProject, onEditProject }) => {
  // Ensure projects is always an array
  const projectList = Array.isArray(projects) ? projects : [];
  
  // Only show skeleton when loading AND we don't have any projects yet
  if (isLoading && projectList.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (projectList.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-cream-50 to-blush-50 rounded-3xl border border-cream-200">
        <div className="text-5xl mb-4">📁</div>
        <p className="text-warm-700 text-lg mb-2 font-medium">No projects yet</p>
        <p className="text-warm-500 mb-6">Create your first project to get started!</p>
        <button
          onClick={onAddProject}
          className="btn-rose inline-flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Project</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projectList.map((project) => (
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
