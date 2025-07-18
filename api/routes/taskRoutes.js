const express = require('express');
const router = express.Router();
const requireAuth = require('../../middlewares/auth');
const { getTasks, createTask } = require('../controllers/taskController');

router.get('/', requireAuth, getTasks);
router.post('/', requireAuth, createTask);

module.exports = router;
