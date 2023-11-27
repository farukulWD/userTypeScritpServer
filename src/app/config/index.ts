import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  bycript_salt_rounds: process.env.BYCRIPT_HASH_ROUNDS,
  database_url: process.env.DATABASE_URL,
};
