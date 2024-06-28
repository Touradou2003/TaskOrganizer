// controllers/projectController.js
const Project = require('../models/projectModel');
const Task = require('../models/taskModel');

// Créer un projet
exports.createProject = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.userId;
    try {
        const project = new Project({ name, userId });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Rechercher un projet par nom
exports.searchProject = async (req, res) => {
    const { name } = req.query;
    const userId = req.user.userId;
    try {
        const project = await Project.findOne({ name, userId });
        if (!project) return res.status(404).send('Project not found');
        res.json(project);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Modifier un projet
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.userId;
    try {
        const project = await Project.findOneAndUpdate({ _id: id, userId }, { name }, { new: true });
        if (!project) return res.status(404).send('Project not found');
        res.json(project);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Supprimer un projet et ses tâches associées
exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const project = await Project.findOneAndDelete({ _id: id, userId });
        if (!project) return res.status(404).send('Project not found');
        await Task.deleteMany({ projectId: project._id });
        res.send('Project and associated tasks deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
