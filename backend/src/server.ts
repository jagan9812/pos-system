import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// ━━━ MIDDLEWARE ━━━
app.use(cors());
app.use(express.json());

// ━━━ DATABASE ━━━
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/pos_db'
});

// ━━━ HEALTH CHECK ━━━
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// ━━━ AUTH ROUTES ━━━
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const token = 'jwt_token_here';

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ━━━ PRODUCTS ROUTES ━━━
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, sku, category, price, cost, qty, thresh } = req.body;
    const result = await pool.query(
      'INSERT INTO products (name, sku, category, price, cost, qty, thresh) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, sku, category, price, cost, qty, thresh]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ━━━ TRANSACTIONS ROUTES ━━━
app.get('/api/transactions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transactions ORDER BY created_at DESC LIMIT 100');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const { items, total, profit, cost } = req.body;
    const result = await pool.query(
      'INSERT INTO transactions (items, total, profit, cost, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [JSON.stringify(items), total, profit, cost]
    );
    
    io.emit('transaction:new', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ━━━ WEBSOCKET ━━━
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('product:update', (data) => {
    io.emit('product:updated', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// ━━━ START SERVER ━━━
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✓ POS Backend running on http://localhost:${PORT}`);
});