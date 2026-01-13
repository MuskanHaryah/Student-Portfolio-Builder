import cloudinary from '../config/cloudinary.js';
import Project from '../models/Project.js';

// Upload project images
export const uploadProjectImages = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Check if project exists and user owns it
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to upload images for this project' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files provided' });
    }

    // Upload files to Cloudinary
    const uploadedUrls = [];

    for (const file of req.files) {
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

      uploadedUrls.push(result.secure_url);
    }

    // Add URLs to project
    project.images = [...project.images, ...uploadedUrls];
    await project.save();

    res.status(200).json({
      message: 'Images uploaded successfully',
      images: uploadedUrls,
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
