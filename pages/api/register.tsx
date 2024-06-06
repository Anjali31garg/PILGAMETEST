import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    res.status(200).json({ user: result.rows[0] });
  } catch (error: any) {  // Using 'any' to allow capturing any error type
    res.status(500).json({ error: error.message });
  }
}
