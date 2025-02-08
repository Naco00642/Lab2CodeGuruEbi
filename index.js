const express = require('express');
const app = express();
const port = 3000;

// Mock database
const mockDatabase = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Jim Beam' }
];

app.get('/',(req,res)=>{
    res.send('wellcome')
})
// Endpoint with inefficient loop
app.get('/users', (req, res) => {
    let results = [];
    for (let i = 0; i < mockDatabase.length; i++) {
        results.push(mockDatabase[i]);
    }
    res.json(results);
});

// Vulnerable input handling (unsanitized query parameter)
app.get('/user/:id', (req, res) => {
    const userId = req.params.id; // Unsanitized input
    const user = mockDatabase.find(user => user.id == userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Hardcoded sensitive data
const hardcodedPassword = 'mySuperSecretPassword123';

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
