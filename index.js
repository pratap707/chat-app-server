// Import the Express module
import express from 'express'; // Fixed extra space
import { supabase } from './src/database/config.js';

const app = express();
const PORT = 2001;

// Middleware to parse JSON requests
app.use(express.json());

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Home Route!');
});

// About Route
app.get('/about', (req, res) => {
    res.send('Welcome to the About Page');
});

// Fetch Users from Supabase
app.get('/fetchUsers', async (req, res) => {
    try {
        let { data: users, error } = await supabase.from('users').select('*');

        if (error) {
            throw error; // Handle Supabase error
        }

        res.json({ success: true, users }); // Send data as JSON
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
