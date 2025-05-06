import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const dbType = process.env.DB_TYPE || 'mysql'; // Default to 'mysql' if not set

let sequelize;

if (dbType === 'mysql') {
  // MySQL setup
  sequelize = new Sequelize(
    process.env.DB_NAME,     // Database name
    process.env.DB_USER,     // Username
    process.env.DB_PASS,     // Password
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',      // Set the dialect as MySQL
      port: process.env.DB_PORT,
    }
  );
  console.log("✅ Using MySQL database");
} else if (dbType === 'sqlite') {
  // SQLite setup (using an SQLite file)
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',  // SQLite file name, or ':memory:' for an in-memory DB
  });
  console.log("✅ Using SQLite database");
} else {
  console.error('❌ Unsupported DB_TYPE in .env file');
}

export default sequelize;
