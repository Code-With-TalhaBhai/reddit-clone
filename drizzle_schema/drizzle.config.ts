import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';



dotenv.config();


export default defineConfig({
  out: './drizzle',
  schema: './schema/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.SUPABASE_CONNECTION_URI!,
  },
});