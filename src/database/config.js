import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 2000 });

const supabaseUrl = 'https://nivegovqqkwkqjpfgofz.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

 export const  supabase = createClient(supabaseUrl, supabaseKey);
wss.on('connection', (ws) => {
  console.log('New client connected!');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:2000');
