// controllers/taskController.js
const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const calculateCoefficient = require('../utils/calculCoeficient');

// Créer une tâche
exports.createTask = async (req, res) => {
    const { title, difficulty, importance, deadline, estimatedTime, projectId, status = 'new' } = req.body;
    const userId = req.user.userId;
    try {
        const project = await Project.findOne({ _id: projectId, userId });
        if (!project) return res.status(404).send('Project not found');
        const task = new Task({ title, difficulty, importance, deadline, estimatedTime, userId, projectId, status });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Récupérer les tâches d'un projet et les réorganiser
exports.getTasksByProject = async (req, res) => {
    const { projectId } = req.params;
    const userId = req.user.userId;
    try {
        const project = await Project.findOne({ _id: projectId, userId });
        if (!project) return res.status(404).send('Project not found');
        let tasks = await Task.find({ projectId, userId });
        tasks = tasks.map(task => {
            task.coefficient = calculateCoefficient(task.difficulty, task.importance, task.deadline, task.estimatedTime);
            return task;
        });
        tasks.sort((a, b) => b.coefficient - a.coefficient);
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Modifier une tâche
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, difficulty, importance, deadline, estimatedTime, status } = req.body;
    const userId = req.user.userId;
    try {
        const task = await Task.findOneAndUpdate({ _id: id, userId }, { title, difficulty, importance, deadline, estimatedTime, status }, { new: true });
        if (!task) return res.status(404).send('Task not found');
        res.json(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const task = await Task.findOneAndDelete({ _id: id, userId });
        if (!task) return res.status(404).send('Task not found');
        res.send('Task deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
