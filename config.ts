import * as dotenv from 'dotenv';
dotenv.config();

type Config = {
  port: number;
  mongoDbUrl: string;
  jwtSecret: string;
};

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config: Config = {
  port: parseInt(process.env.PORT),
  mongoDbUrl: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
