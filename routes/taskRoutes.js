// routes/tasks.js
const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/authentification');

const router = express.Router();

router.post('/', auth, taskController.createTask);
router.get('/:projectId', auth, taskController.getTasksByProject);
router.put('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
