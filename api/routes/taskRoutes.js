const express = require('express');
const router = express.Router();
const requireAuth = require('../../middlewares/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

router.get('/get', requireAuth, getTasks);
router.post('/create', requireAuth, createTask);
router.put('/:id', requireAuth, updateTask);
router.delete('/:id', requireAuth, deleteTask);

module.exports = router;
