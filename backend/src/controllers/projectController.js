import Project from '../models/Project.js';
import User from '../models/User.js';

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
    const { title, description, technologies, githubLink, liveLink, dateCompleted } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const project = await Project.create({
      userId,
      title,
      description,
      technologies: technologies || [],
      githubLink: githubLink || '',
      liveLink: liveLink || '',
      dateCompleted: dateCompleted || new Date(),
    });

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, description, technologies, githubLink, liveLink, dateCompleted } = req.body;

    // Find project and check ownership
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (technologies) project.technologies = technologies;
    if (githubLink !== undefined) project.githubLink = githubLink;
    if (liveLink !== undefined) project.liveLink = liveLink;
    if (dateCompleted) project.dateCompleted = dateCompleted;

    await project.save();

    res.status(200).json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
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
