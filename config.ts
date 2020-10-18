import dotenv from 'dotenv';
dotenv.config();

type Config = {
  port: number;
  mongoDbUrl: string;
  jwtSecret: string;
};

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config: Config = {
  port: parseInt(process.env.PORT as string),
  mongoDbUrl: process.env.MONGODB_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
};

export default config;
