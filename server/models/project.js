const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  dropbox: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  techs: [{
    name: {
      type: String,
      required: true,
    },
  }],
  tasks: {
    type: Object,
    required: true,
    default: {
      todo: [],
      doing: [],
      done: [],
    },
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;






// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// let projectSchema = new Schema(
//     {
//         title: {
//             type: String, 
//             required: true
//         },
//         description: {
//             type: String,
//         },
//         stakeholders: {
//             type: String,
//         },
//         allocated_hours: {
//             type: Number,
//         },
//         dropbox_url: {
//             type: String,
//         },
//         github_url: {
//             type: String,
//         },
//         project_id: {
//             type: Number, 
//         },
//     }
// );

// module.exports = mongoose.model("project", projectSchema);