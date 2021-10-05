/**
 * Registering the Song API endpoints
 */

import Express from 'express';
import Songs from '../../lib/Songs.js';
import {
  getSongs,
  addSong,
  deleteSong,
} from './crudSong.js';

const app = Express.Router();
const songData = new Songs();

// get the songs
app.get('/', async (req, res) => {
  await getSongs(songData, req, res);
});

// add a song
app.post('/', async (req, res) => {
  await addSong(songData, req, res);
});

// delete a song
app.delete('/:id', async (req, res) => {
  await deleteSong(songData, req, res);
});

export default app;
