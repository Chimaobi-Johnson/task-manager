const express = require('express');
const router = express.Router();
const requireAuth = require('../../middlewares/auth');
const { getTasks, createTask, updateTask, deleteTask, getTaskInsights } = require('../controllers/taskController');

router.get('/get', requireAuth, getTasks);
router.post('/create', requireAuth, createTask);
router.put('/:id', requireAuth, updateTask);
router.delete('/:id', requireAuth, deleteTask);
router.get('/insights/:email', getTaskInsights);

module.exports = router;
