import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gizli-anahtar';

export interface JWTPayload {
  id: number;
  name: string;
  email: string;
  role: string[];
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const obj = jwt.verify(token, JWT_SECRET);
    return obj as JWTPayload;
  } catch (error) {
    return null;
  }
}