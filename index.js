import express from "express";
import sequelize from "./db.js";
import authRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import cors from "cors";
import { initializeSongData } from "./models/songModel.js"; // Import initialization function

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('./pics'));
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

// Authenticate DB and sync models
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection authenticated");

    // Sync models (set force to true only during development if needed)
    const shouldForceSync = process.env.NODE_ENV === 'development';
    await sequelize.sync({ force: shouldForceSync });
    console.log("✅ Database synced");

    // Initialize songs
    await initializeSongData();

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error during app initialization:", err.message);
    process.exit(1);
  }
};

startServer();
