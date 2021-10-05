/**
 * All the CRUD operation actions for songs
 */

import parseSong from './parseSong.js';

/**
 * Get all songs
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const getSongs = async (song, request, response) => {
  try {
    response.status(200).json({ songs: await song.get() });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Add a song
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const addSong = async (song, request, response) => {
  try {
    const {
      title,
      artist,
      uri,
      added,
    } = parseSong(request, response);
    const newSong = await song.add(title, artist, uri, added);
    response.status(201).json({ song: newSong });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Delete a song
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const deleteSong = async (song, request, response) => {
  try {
    const { id } = request.params;
    await song.delete(id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
