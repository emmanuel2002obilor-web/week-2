
const express = require("express");
require("dotenv").config();

const app = express();

// 1. JSON BODY PARSING
app.use(express.json());

// 2. CUSTOM MIDDLEWARE (BONUS)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// 3. HOME ROUTE - SERVE STATIC HTML
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// 4. POST ROUTE - CREATE USER RESPONSE
app.post("/user", (req, res) => {
    const { name, email } = req.body;

    // Check for missing data
    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    res.status(201).json({
        message: `Hello, ${name}!`,
        email: email
    });
});

// 5. GET ROUTE - USER PROFILE
app.get("/user/:id", (req, res) => {
    const { id } = req.params;

    res.status(200).send(`User ${id} profile`);
});

// 6. START THE SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
