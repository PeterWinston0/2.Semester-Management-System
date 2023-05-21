const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let projectSchema = new Schema(
    {
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String,
        },
        stakeholders: {
            type: String,
        },
        allocated_hours: {
            type: Number,
        },
        dropbox_url: {
            type: String,
        },
        github_url: {
            type: String,
        },
        project_id: {
            type: Number, 
        },
    }
);

module.exports = mongoose.model("project", projectSchema);

        //start_date: {
        //    type: Date, 
        //    default: Date.now
        //},