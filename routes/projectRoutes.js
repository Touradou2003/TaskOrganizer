// routes/projects.js
const express = require('express');
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/authentification');

const router = express.Router();

router.post('/', auth, projectController.createProject);
router.get('/search', auth, projectController.searchProject);
router.put('/:id', auth, projectController.updateProject);
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;
