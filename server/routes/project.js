const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Create a new project
router.post('/', async (req, res) => {
  try {
    const { title, description, start_date, end_date, dropbox, github, user, techs } = req.body;
    const project = new Project({ title, description, start_date, end_date, dropbox, github, techs, user, tasks: {} });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const { tasks, title, description, start_date, end_date, dropbox, github, user, techs } = req.body;

    const project = await Project.findByIdAndUpdate(req.params.id, { tasks, title, description, start_date, end_date, dropbox, github, user, techs, }, { new: true });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;


