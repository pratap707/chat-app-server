import cors from "cors";
import express from "express";
import { supabase } from "./src/database/config.js"; // Ensure the path is correct

const app = express();
const PORT = 2001;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Route!");
});

// About Route
app.get("/about", (req, res) => {
  res.send("Welcome to the About Page");
});
app.post("/signIn", (req, res) => {
    console.log("signIn route")
    res.send("Welcome to the signIn Page");
  });

// API Message Route
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Fetch Users from Supabase
app.get("/fetchUsers", async (req, res) => {
  try {
    let { data: users, error } = await supabase.from("users").select("*");

    if (error) throw error; // Handle Supabase error

    res.json({ success: true, users }); // Send data as JSON
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

