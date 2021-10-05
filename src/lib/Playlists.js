/* eslint-disable consistent-return */
import knexMusic from '../../db/knexMusic.js';

class Playlist {
  constructor() {
    this.table = 'playlists';
  }

  async get(userId) {
    try {
      return await knexMusic(this.table).where('owner', userId).select();
    } catch (error) {
      console.log(error.message);
    }
  }

  async add(title, userId, songs) {
    try {
      const dateCreated = Date.now();
      return await knexMusic(this.table).insert({
        title,
        owner: userId,
        date_created: dateCreated,
        songs,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id, userId, title, songs) {
    try {
      const dateUpdated = Date.now();
      // eslint-disable-next-line max-len
      return await knexMusic(this.table).where({ id, owner: userId }).update({ title, songs, date_modified: dateUpdated });
    } catch (error) {
      console.log(error.message);
    }
  }

  async delete(id, userId) {
    try {
      return await knexMusic(this.table).where({ id, owner: userId }).del();
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default Playlist;
