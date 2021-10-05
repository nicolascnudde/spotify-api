/* eslint-disable consistent-return */
import knexMusic from '../../db/knexMusic.js';

class Song {
  constructor() {
    this.table = 'songs';
  }

  /**
   * Get all the songs
   */
  async get() {
    try {
      return await knexMusic(this.table).select();
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Add a new song with the title, artist, uri parameters
   * The current date in ms will also be added
   *
   * @param {*} title
   * @param {*} artist
   * @param {*} uri
   */
  async add(title, artist, uri) {
    try {
      const date = Date.now();
      return await knexMusic(this.table).insert({
        title,
        artist,
        uri,
        date_added: date,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Delete a specific song
   *
   * @param {*} id
   */
  async delete(id) {
    try {
      return await knexMusic(this.table).where('id', id).del();
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default Song;
