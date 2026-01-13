import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Project Image */}
      {project.images && project.images.length > 0 ? (
        <div className="w-full h-48 overflow-hidden bg-gray-200">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          <span className="text-gray-600">No image</span>
        </div>
      )}

      {/* Project Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {project.description || 'No description provided'}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-2">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md transition"
            >
              GitHub
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
