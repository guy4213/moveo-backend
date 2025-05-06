// routes/songRoutes.js
import express from "express";
import Song from "../models/songModel.js"; // Updated import path to match your file name
import { Op } from "sequelize";

const router = express.Router();

// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search songs - This route must come BEFORE the /:id route
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    const songs = await Song.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { artist: { [Op.like]: `%${query}%` } }
        ]
      }
    });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get song by id - This must come AFTER the /search route
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ error: 'Song not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new song
router.post('/', async (req, res) => {
  try {
    const { name, artist, image_path } = req.body;
    if (!name || !artist) {
      return res.status(400).json({ error: 'Name and artist are required' });
    }
    
    const newSong = await Song.create({ name, artist, image_path });
    res.status(201).json(newSong);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a song
router.put('/:id', async (req, res) => {
  try {
    const { name, artist, image_path } = req.body;
    const song = await Song.findByPk(req.params.id);
    
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    if (name) song.name = name;
    if (artist) song.artist = artist;
    if (image_path) song.image_path = image_path;
    
    await song.save();
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a song
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    await song.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;