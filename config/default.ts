import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const customConfig: {
  port: number;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  origin: string;
  dbUri: string;
 secret:string;
} = {
  port: 8000,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,

  origin: 'http://localhost:3000',

  dbUri: process.env.DATABASE_URL as string,
  secret:process.env.JWT_SECRET as string
};

export default customConfig;