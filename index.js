import express from "express";
import sequelize from "./db.js";
import authRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import cors from "cors";
import { initializeSongData } from "./models/songModel.js"; // Import initialization function

const app = express();

// Use the PORT from environment variables (Render sets this), fallback to 3001 for local
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('./pics'));
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

// Sync SQLite and initialize data in development
if (process.env.DB_TYPE === "sqlite") {
  sequelize
    .sync({ force: process.env.NODE_ENV === 'development' })
    .then(async () => {
      console.log("✅ SQLite database synced");
      await initializeSongData();
    })
    .catch((err) => console.error("❌ SQLite database sync error:", err));
}

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
