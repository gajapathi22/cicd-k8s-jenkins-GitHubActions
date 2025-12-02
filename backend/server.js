const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 4000;


app.use(cors());app.use(express.json());

// Sample route
app.get('/api/hello', (req, res) => {
    res.json('Hello from the backend server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});