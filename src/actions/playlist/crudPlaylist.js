/**
 * All the CRUD operation actions for playlists
 */

import parsePlaylist from './parsePlaylist.js';

/**
 * Get all playlist from a user
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const getPlaylists = async (playlist, request, response) => {
  try {
    const { userId } = request.params;
    const allPlaylists = await playlist.get(userId);
    response.status(200).json({ playlist: allPlaylists });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Add a playlist to a user
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const addPlaylist = async (playlist, request, response) => {
  try {
    const { title, dateCreated, songs } = parsePlaylist(request, response);
    const { userId } = request.params;
    const newPlaylist = await playlist.add(title, userId, dateCreated, songs);
    response.status(201).json({ playlist: newPlaylist });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Update a user's playlist
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const updatePlaylist = async (playlist, request, response) => {
  try {
    const { title, songs } = parsePlaylist(request);
    const { userId, id } = request.params;
    const updatedPlaylist = await playlist.update(id, userId, title, songs);
    response.status(200).json({ playlist: updatedPlaylist });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Delete a user's playlist
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const deletePlaylist = async (playlist, request, response) => {
  try {
    const { userId, id } = request.params;
    await playlist.delete(userId, id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
