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
    const { title, description, start_date, end_date, dropbox, github, techs } = req.body;
    const project = new Project({ title, description, start_date, end_date, dropbox, github, techs, tasks: {} });
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
    const { tasks, title, description, start_date, end_date, dropbox, github, techs } = req.body;

    const project = await Project.findByIdAndUpdate(req.params.id, { tasks, title, description, start_date, end_date, dropbox, github, techs, }, { new: true });

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



// const projectRouter = require("express").Router();

// const { request } = require("express");
// const { verifyToken } = require("../validation");

// //Models
// const projectModel = require("../models/project");

// //CRUD
// // Create - POST
// projectRouter.post("/", (req, res, next) => {
//   data = req.body;
//   projectModel
//     .insertMany(data)
//     .then((data) => {
//       res.status(201).send(data);
//     })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// });

// // /api/project/
// //Get All Data - get
// projectRouter.get("/", (req, res, next) => {
//   projectModel
//     .find()
//     .then((data) => {
//       res.send(mapArray(data));
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// });

// //CHAT GPT
// //Read specific project - get
// // Retrieve item details

// // projectRouter.get('/:id', async (req, res) => {
// //   try {
// //     const project = await projectModel.findById(req.params.id);
// //     if (project) {
// //       res.json(project);
// //     } else {
// //       res.status(404).json({ error: 'Project not found' });
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.sendStatus(500);
// //   }
// // });

// //Søren / School
// projectRouter.get("/:id", (req, res, next) => {
//   projectModel
//     .findById(req.params.id)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// });

// //CHAT GPT
// // Update specific project - put
// // projectRouter.put('/update/:id', async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const updatedProjectData = req.body;

// //     const updatedProject = await projectModel.findByIdAndUpdate(id, updatedProjectData, {
// //       new: true,
// //     });

// //     if (updatedProject) {
// //       res.json(updatedProject);
// //     } else {
// //       res.status(404).json({ error: 'Project not found' });
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.sendStatus(500);
// //   }
// // });

// //Søren / School
// projectRouter.put("/:id", (req, res, next) => {
//   const id = req.params.id;
//   projectModel
//     .findByIdAndUpdate(id, req.body)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message:
//             "Cannot update project with id=" +
//             id +
//             ". Maybe project was not found!",
//         });
//       } else {
//         res.send({ message: "project was succesfully updated." });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({ message: "Error updating project with id=" + id });
//     });
// });

// // Delete specific project - DELETE

// projectRouter.delete("/delete/:id", (req, res, next) => {
//   const id = req.params.id;
//   projectModel
//     .findByIdAndDelete(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message:
//             "Cannot delete Project with id=" +
//             id +
//             ". Maybe Project was not found!",
//         });
//       } else {
//         res.send({ message: "Project was succesfully deleted." });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({ message: "Error deleting Project with id=" + id });
//     });
// });

// function mapArray(inputArray) {
//   // do something with inputArray

//   let outputArray = inputArray.map((element) => ({
//     id: element._id,
//     title: element.title,
//     description: element.description,
//     stakeholders: element.stakeholders,
//     allocated_hours: element.allocated_hours,
//     dropbox_url: element.dropbox_url,
//     github_url: element.github_url,
//     project_id: element.project_id,

//     // add uri for this specific resource
//     uri: "/api/project/" + element._id,
//   }));

//   return outputArray;
// }

// module.exports = projectRouter;
