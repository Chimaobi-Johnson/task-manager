const express = require('express');
const app = express();

const PORT = 8000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Task Manager API'});
})

app.get('/dreams', (req, res) => {
    res.status(200).json({ message: 'Big dreams'});
})

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
});

module.exports = app;