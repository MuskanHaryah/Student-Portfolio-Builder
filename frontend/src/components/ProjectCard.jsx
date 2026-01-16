import React from 'react';

const ProjectCard = ({ project, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      onDelete(project._id);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden border border-cream-200 group">
      {/* Project Image */}
      {project.images && project.images.length > 0 ? (
        <div className="w-full h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-cream-100 to-blush-100 relative">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Action buttons overlay - show on mobile, hover on desktop */}
          <div className="absolute inset-0 bg-gradient-to-t from-warm-900/60 via-warm-900/20 to-transparent md:from-warm-900/0 md:via-warm-900/0 md:to-transparent md:group-hover:from-warm-900/60 md:group-hover:via-warm-900/30 md:group-hover:to-transparent transition-all duration-300 flex items-center justify-center gap-2">
            <button
              onClick={onEdit}
              className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 bg-cream-100 hover:bg-cream-200 text-warm-800 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm shadow-lg transform md:translate-y-2 md:group-hover:translate-y-0"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl font-medium text-xs sm:text-sm shadow-lg transform md:translate-y-2 md:group-hover:translate-y-0"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-cream-100 via-blush-50 to-primary-50 flex items-center justify-center relative">
          <span className="text-warm-400 text-4xl sm:text-5xl"></span>
          {/* Action buttons overlay for no image */}
          <div className="absolute inset-0 bg-gradient-to-t from-warm-900/60 via-warm-900/20 to-transparent md:from-warm-900/0 md:via-warm-900/0 md:to-transparent md:group-hover:from-warm-900/60 md:group-hover:via-warm-900/30 md:group-hover:to-transparent transition-all duration-300 flex items-center justify-center gap-2">
            <button
              onClick={onEdit}
              className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 bg-cream-100 hover:bg-cream-200 text-warm-800 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm shadow-lg transform md:translate-y-2 md:group-hover:translate-y-0"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl font-medium text-xs sm:text-sm shadow-lg transform md:translate-y-2 md:group-hover:translate-y-0"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Project Content */}
      <div className="p-5 sm:p-6">
        <h3 className="font-heading text-lg sm:text-xl font-bold text-warm-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-warm-600 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.description || 'No description provided'}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="inline-block bg-gradient-to-r from-primary-50 to-blush-50 text-primary-700 text-xs px-3 py-1.5 rounded-full font-medium border border-primary-100"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="inline-block bg-cream-100 text-warm-600 text-xs px-3 py-1.5 rounded-full font-medium border border-cream-200">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs sm:text-sm bg-warm-800 hover:bg-warm-900 text-white py-2.5 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <span className="mr-1">⚡</span>GitHub
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs sm:text-sm bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-2.5 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <span className="mr-1"></span>Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
