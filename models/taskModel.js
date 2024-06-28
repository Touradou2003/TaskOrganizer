// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
    },
    importance: {
        type: Number,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    estimatedTime: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['new', 'in progress', 'completed'],
        default: 'new',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
});

module.exports = mongoose.model('Task', TaskSchema);
