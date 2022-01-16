import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = Number(process.env.PORT) || 3000;
export const DATABASE = process.env.DATABASE || ':memory:';
export const API_PREFIX = '/api/v1';
console.log({ DATABASE });
