// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Define an interface for the request body
interface LoginRequestBody {
  email: string;
  password: string;
}

// Define an interface for the user object
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Type the request body using the defined interface
  const { email, password } = req.body as LoginRequestBody;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0] as User | undefined;

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, name: user.name }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ token, user: { name: user.name } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
