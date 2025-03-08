
/*

import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import { supabase } from "./script.js";

    
// Define __dirname manually in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Initialize Express App
const app = express();
const PORT = 2002;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static files from "src" directory
app.use(express.static(path.join(__dirname, "src")));

// ✅ Route for Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/index.html"));
});

// ✅ Route for Chat Page
app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "src/components/chat.html"));
});

app.get("/fetch", async (req, res) => {
    try {
        let { data: users, error } = await supabase
            .from("users")
            .select("*");
            console.log(users); // Ensure these columns exist in your database

        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ error: "Failed to fetch users" });
        }

        res.json(users); // Send fetched users as JSON
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




// ✅ Start HTTP Server
const server = app.listen(PORT, () => {
    console.log(`✅ Express server running at http://localhost:${PORT}`);
});

// ✅ Initialize WebSocket Server
const wss = new WebSocketServer({ server });

wss.on("connection", ws => {
    console.log("New client connected");

    ws.on("message", message => {
        console.log("Received:", message);

        // Broadcast message to all connected clients except sender
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => console.log("Client disconnected"));
});

console.log("✅ WebSocket server is running");
*/


import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import { supabase } from "./script.js";
// ✅ Define __dirname manually in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// ✅ Initialize Express App
const app = express();
const PORT = 2002;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static files from "src" directory
app.use(express.static(path.join(__dirname, "src")));

// ✅ Route for Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/index.html"));
});

// ✅ Route for Chat Page
app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "src/components/chat.html"));
});


// ✅ Fetch Users from Supabase
app.get("/fetch", async (req, res) => {
    try {
        let { data: users, error } = await supabase.from("users").select("*");

        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ error: "Failed to fetch users" });
        }

        res.json(users);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/message",async(req,res)=>{
const {}
})

// ✅ Start HTTP Server
const server = app.listen(PORT, () => {
    console.log(`✅ Express server running at http://localhost:${PORT}`);
});

// ✅ Initialize WebSocket Server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message) => {
        try {
            const decodedMessage = message.toString(); // Convert Buffer to String
            const parsedMessage = JSON.parse(decodedMessage);

            console.log("Received message:", parsedMessage.text);

            // Broadcast to all clients
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === ws.OPEN) {
                    client.send(JSON.stringify(parsedMessage));
                }
            });
        } catch (error) {
            console.error("Error processing message:", error);
        }
    });

    ws.on("close", () => console.log("Client disconnected"));
});

console.log("✅ WebSocket server is running");
