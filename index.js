require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

// Mock database
const mockDatabase = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Jim Beam' }
];

app.get('/', (req, res) => {
    res.send('Welcome');
});

// Efficiently return users
app.get('/users', (req, res) => {
    res.json(mockDatabase);
});

// Vulnerable input handling (sanitized)
app.get('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10); // Safely parse the user ID
    const user = mockDatabase.find(user => user.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Use environment variable for sensitive data
const hardcodedPassword = process.env.PASSWORD;

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
