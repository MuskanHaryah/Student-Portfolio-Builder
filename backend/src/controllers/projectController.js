import Project from '../models/Project.js';
import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';

// Get all projects for a user
export const getUserProjects = async (req, res) => {
  try {
    const userId = req.userId;

    const projects = await Project.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Projects retrieved successfully',
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({
      message: 'Project retrieved successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new project
export const createProject = async (req, res) => {
  try {
    const userId = req.userId;
    let { title, description, technologies, githubLink, liveLink, dateCompleted } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    // Parse technologies if it's a string (from FormData)
    if (typeof technologies === 'string') {
      try {
        technologies = JSON.parse(technologies);
      } catch (e) {
        technologies = [];
      }
    }

    // Upload image to Cloudinary (only 1 image allowed)
    let imageUrl = '';
    if (req.files && req.files.length > 0) {
      const file = req.files[0]; // Only take the first image
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'student-portfolio/projects',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });
      imageUrl = result.secure_url;
    }

    const project = await Project.create({
      userId,
      title,
      description,
      technologies: technologies || [],
      githubLink: githubLink || '',
      liveLink: liveLink || '',
      dateCompleted: dateCompleted || new Date(),
      images: imageUrl ? [imageUrl] : [],
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    let { title, description, technologies, githubLink, liveLink, dateCompleted, existingImages } = req.body;

    // Find project and check ownership
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    // Parse technologies if it's a string (from FormData)
    if (typeof technologies === 'string') {
      try {
        technologies = JSON.parse(technologies);
      } catch (e) {
        technologies = project.technologies; // Keep existing if parse fails
      }
    }

    // Parse existingImages if it's a string (from FormData)
    let existingImagesArray = [];
    if (existingImages) {
      if (typeof existingImages === 'string') {
        try {
          existingImagesArray = JSON.parse(existingImages);
        } catch (e) {
          existingImagesArray = [existingImages];
        }
      } else if (Array.isArray(existingImages)) {
        existingImagesArray = existingImages;
      }
    }

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (technologies) project.technologies = technologies;
    if (githubLink !== undefined) project.githubLink = githubLink;
    if (liveLink !== undefined) project.liveLink = liveLink;
    if (dateCompleted) project.dateCompleted = dateCompleted;

    // Handle image - only 1 image allowed
    if (req.files && req.files.length > 0) {
      const file = req.files[0]; // Only take the first image
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'student-portfolio/projects',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });
      project.images = [result.secure_url];
    } else if (existingImagesArray.length > 0) {
      project.images = [existingImagesArray[0]]; // Only keep first image
    }

    await project.save();

    res.status(200).json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Find project and check ownership
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get public portfolio by username
export const getPublicPortfolio = async (req, res) => {
  try {
    const { username } = req.params;

    // Find user by username
    const user = await User.findOne({ username }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all projects for this user
    const projects = await Project.find({ userId: user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Portfolio retrieved successfully',
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        bio: user.bio,
        profilePicture: user.profilePicture,
        skills: user.skills,
        github: user.github,
        linkedin: user.linkedin,
        website: user.website,
      },
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
