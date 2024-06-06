// lib/auth.ts
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  userId: number;
  name: string;
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, 'your_jwt_secret') as DecodedToken;
  } catch (e) {
    return null;
  }
}
