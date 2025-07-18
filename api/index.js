const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

const PORT = 8000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Task Manager API'});
})

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/dreams', (req, res) => {
    res.status(200).json({ message: 'Big dreams'});
})

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
});

module.exports = app;