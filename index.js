import cors from "cors";
import express from "express";
import { supabase } from "./src/database/config.js"; // Ensure the path is correct

const app = express();
const PORT = 2001;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests


app.post("/signIn",async (req, res) => {
  const {email,password } = req.body;
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { email: email, password: password,username:email },
      ])
      .select()
              
    
  } catch (error) {
    throw error;
    console.log("this is the error from database");
  }
    console.log("signIn route")
    res.json({ auth: "true" });
  });

  
  // Home Route
  app.get("/", async (req, res) => {
    try {
      // Ensure 'getstart' is a valid column
      const { data, error } = await supabase
        .from("users")
        .insert([{ getstart: "User started" }])
        .select();
  
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Database insertion failed" });
      }
  
      res.json({ auth: "true", message: "Welcome to the Home Route!", data });
  
    } catch (error) {
      console.error("Error in Home Route:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

// API Message Route
app.get("/message", (req, res) => {
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

