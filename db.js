import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbType = process.env.DB_TYPE || 'mysql';
let sequelize;

try {
  if (dbType === 'mysql') {
    const {
      DB_NAME,
      DB_USER,
      DB_PASS,
      DB_HOST,
      DB_PORT = 3306 // fallback to default MySQL port
    } = process.env;

    if (!DB_NAME || !DB_USER || !DB_PASS || !DB_HOST) {
      throw new Error("Missing required MySQL environment variables");
    }

    sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'mysql',
      logging: false, // optional: disables SQL logging
    });

    console.log("✅ Using MySQL database");

  } else if (dbType === 'sqlite') {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'database.sqlite',
      logging: false,
    });

    console.log("✅ Using SQLite database");

  } else {
    throw new Error(`Unsupported DB_TYPE: ${dbType}`);
  }
} catch (err) {
  console.error("❌ Sequelize initialization failed:", err.message);
  process.exit(1);
}

export default sequelize;
