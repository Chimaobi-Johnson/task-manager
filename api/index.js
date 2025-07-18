const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

// Routes
app.use('/api/home', (req, res) => {
    res.send({ message: 'Welcome to task manager API!!'})
});
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

module.exports = app;