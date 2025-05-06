import express from "express";
import sequelize from "./db.js";
import authRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import cors from "cors";
import  { initializeSongData } from "./models/songModel.js"; // Import both the model and the initialization function

const app = express();
const PORT = 3001;
app.use(cors());

app.use(express.json());
app.use('/images', express.static('./pics'));
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

if (process.env.DB_TYPE === "sqlite") {
  sequelize
    .sync({ force: process.env.NODE_ENV === 'development' }) // Only force in development
    .then(async () => {
      console.log("✅ SQLite database synced");
      
      // Call the initialization function from your Song model
      await initializeSongData();
    })
    .catch((err) => console.error("❌ SQLite database sync error:", err));
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});