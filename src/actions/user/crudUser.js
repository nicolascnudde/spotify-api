/**
 * All the CRUD operation actions for users
 */

import parseUser from './parseUser.js';

/**
 * Register a new user
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const addUser = async (user, request, response) => {
  try {
    const {
      username,
      password,
      name,
      email,
    } = parseUser(request, response);
    const newUser = await user.add(username, password, name, email);
    response.status(201).json({ user: newUser });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Update a user's personal data
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const updateUser = async (user, request, response) => {
  try {
    const { username, name, email } = parseUser(request);
    const { id } = request.params;
    const updatedUser = await user.update(id, username, name, email);
    response.status(200).json({ playlist: updatedUser });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Get playlists from a user
 */
export const getPlaylistsFromUser = async (user, playlist, request, response) => {
  try {
    response.status(200).json({ playlist: await playlist.get() });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
