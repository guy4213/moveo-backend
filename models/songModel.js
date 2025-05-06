// models/Song.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";


const Song = sequelize.define('Song', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lyrics_chords: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_path: {
    type: DataTypes.STRING
  }
}, {
  // Optional model configuration
  timestamps: true, // Adds createdAt and updatedAt timestamps
  tableName: 'songs' // Explicitly sets table name (otherwise pluralized model name)
});

export default Song;

// Initialize with sample data
export const initializeSongData = async () => {
  const songsData = [
    {
      name: "Echo",
      artist: "The Weeknd",
      image_path: "/images/1.png",
      lyrics_chords: [
        { chords: ["Am", "F"], lyric: "Echoes of you in my mind" },
        { chords: ["C", "G"], lyric: "They follow me through the night" },
        { chords: ["Am", "F"], lyric: "Can't escape this memory" },
        { chords: ["C", "G"], lyric: "You're the rhythm inside of me" }
      ]
    },
    {
      name: "Gold",
      artist: "Dua Lipa",
      image_path: "/images/2.png",
      lyrics_chords: [
        { chords: ["C", "G"], lyric: "Touch me and I turn to gold" },
        { chords: ["Am", "F"], lyric: "Every word you say, I hold" },
        { chords: ["C", "G"], lyric: "Shining brighter than before" },
        { chords: ["Am", "F"], lyric: "You leave me wanting more" }
      ]
    },
    {
      name: "Falling",
      artist: "Harry Styles",
      image_path: "/images/3.png",
      lyrics_chords: [
        { chords: ["Em", "C"], lyric: "I'm in my head again" },
        { chords: ["G", "D"], lyric: "Wondering how it ends" },
        { chords: ["Em", "C"], lyric: "Falling through the dark" },
        { chords: ["G", "D"], lyric: "With your name in my heart" }
      ]
    },
    {
      name: "Waves",
      artist: "Dean Lewis",
      image_path: "/images/4.png",
      lyrics_chords: [
        { chords: ["G", "D"], lyric: "The waves keep crashing in" },
        { chords: ["Em", "C"], lyric: "Like memories under my skin" },
        { chords: ["G", "D"], lyric: "I try to stay afloat" },
        { chords: ["Em", "C"], lyric: "But your love still holds the boat" }
      ]
    },
    {
      name: "Shivers",
      artist: "Ed Sheeran",
      image_path: "/images/5.png",
      lyrics_chords: [
        { chords: ["Am", "F"], lyric: "You give me shivers down my spine" },
        { chords: ["C", "G"], lyric: "With every kiss, I lose all time" },
        { chords: ["Am", "F"], lyric: "Heartbeat dancing out of line" },
        { chords: ["C", "G"], lyric: "Girl, you mess with my mind" }
      ]
    },
    {
      name: "Alive",
      artist: "Sia",
      image_path: "/images/6.png",
      lyrics_chords: [
        { chords: ["F", "C"], lyric: "I’m still breathing, I’m alive" },
        { chords: ["G", "Am"], lyric: "Found the fire, I will survive" },
        { chords: ["F", "C"], lyric: "You tried to break me down" },
        { chords: ["G", "Am"], lyric: "But I rose up from the ground" }
      ]
    },
    {
      name: "Horizon",
      artist: "Coldplay",
      image_path: "/images/7.png",
      lyrics_chords: [
        { chords: ["C", "Am"], lyric: "Beyond the clouds, I see the light" },
        { chords: ["F", "G"], lyric: "Chasing dreams into the night" },
        { chords: ["C", "Am"], lyric: "The horizon pulls me through" },
        { chords: ["F", "G"], lyric: "Every step leads back to you" }
      ]
    }
  ];
  
  
  try {
    const existingSongs = await Song.count();
    if (existingSongs === 0) {
      await Song.bulkCreate(songsData);
      console.log("✅ Sample songs added to database");
    } else {
      console.log("✅ Songs table already has data");
    }
  } catch (error) {
    console.error("❌ Failed to initialize song data:", error);
  }
};