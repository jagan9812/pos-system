import { Pool } from 'pg';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/pos_db'
});

const seedData = async () => {
  try {
    const passwordHash = await bcryptjs.hash('admin123', 10);

    await pool.query('DELETE FROM transaction_items');
    await pool.query('DELETE FROM transactions');
    await pool.query('DELETE FROM products');
    await pool.query('DELETE FROM users');

    await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
      ['Admin User', 'admin@vanitha.com', passwordHash, 'admin']
    );

    const products = [
      { name: 'Basmati Rice (1kg)', sku: 'RICE-001', category: 'pantry', price: 250, cost: 200, qty: 50, thresh: 10 },
      { name: 'Milk (500ml)', sku: 'MILK-001', category: 'dairy', price: 35, cost: 25, qty: 80, thresh: 15 },
      { name: 'Bread (White)', sku: 'BREAD-001', category: 'bakery', price: 50, cost: 35, qty: 40, thresh: 10 },
      { name: 'Banana (per kg)', sku: 'BAN-001', category: 'produce', price: 60, cost: 40, qty: 25, thresh: 5 },
    ];

    for (const product of products) {
      await pool.query(
        'INSERT INTO products (name, sku, category, price, cost, qty, thresh) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [product.name, product.sku, product.category, product.price, product.cost, product.qty, product.thresh]
      );
    }

    console.log('Database seeded!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await pool.end();
  }
};

seedData();