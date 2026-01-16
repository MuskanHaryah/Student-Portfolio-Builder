import React from 'react';

const ProjectCard = ({ project, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      onDelete(project._id);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden border border-cream-200 group relative">
      {/* Action buttons - Top Right Corner */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={onEdit}
          className="bg-white/95 backdrop-blur-sm hover:bg-cream-100 text-warm-800 p-2 rounded-xl font-medium text-xs shadow-lg transition-all duration-200 hover:scale-110"
          title="Edit Project"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500/95 backdrop-blur-sm hover:bg-red-600 text-white p-2 rounded-xl font-medium text-xs shadow-lg transition-all duration-200 hover:scale-110"
          title="Delete Project"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

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
                  className="inline-block bg-gradient-to-r from-[#C75C5C]/10 to-blush-50 text-[#C75C5C] text-xs px-3 py-1.5 rounded-full font-medium border border-[#C75C5C]/20"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="inline-block bg-cream-100 text-warm-600 text-xs px-3 py-1.5 rounded-full font-medium border border-cream-200">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 mt-5">
          {project.githubLink && project.githubLink.trim() !== '' && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm bg-white hover:bg-[#C75C5C]/5 py-3 px-4 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border-2 border-[#C75C5C] text-[#C75C5C]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub Link
            </a>
          )}
          {project.liveLink && project.liveLink.trim() !== '' && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm bg-gradient-to-r from-[#C75C5C] to-[#B54C4C] hover:from-[#B54C4C] hover:to-[#A43C3C] text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {/* Show message if no links */}
          {(!project.githubLink || project.githubLink.trim() === '') && (!project.liveLink || project.liveLink.trim() === '') && (
            <div className="w-full text-center text-sm text-warm-400 py-3">
              No links added yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
