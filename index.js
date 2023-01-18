// Import packages
const express = require("express");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

// connection
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening to port ${port}`));
