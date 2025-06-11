// src/config/index.js

const dotenv = require('dotenv');
const path = require('path');
const logger = require('../utils/logger');

// Load environment variable dari file .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const requiredEnv = ['PORT', 'SUPABASE_URL', 'SUPABASE_KEY'];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    logger.error(`Environment variable ${key} tidak ditemukan di .env`);
    process.exit(1);
  }
});

module.exports = {
  port: process.env.PORT || 3000,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
};
