/**
 * Registering the playlist API endpoints
 */

import Express from 'express';
import Playlists from '../../lib/Playlists.js';
import {
  getPlaylists,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
} from './crudPlaylist.js';

const app = Express.Router();
const playlistData = new Playlists();

// get the playlists
app.get('/:userId/playlists', async (req, res) => {
  await getPlaylists(playlistData, req, res);
});

// add a playlist
app.post('/:userId/playlists', async (req, res) => {
  await addPlaylist(playlistData, req, res);
});

// update a playlist
app.put('/:userId/playlists/:id', async (req, res) => {
  await updatePlaylist(playlistData, req, res);
});

// delete a playlist
app.delete('/:userId/playlists/:id', async (req, res) => {
  await deletePlaylist(playlistData, req, res);
});

export default app;
