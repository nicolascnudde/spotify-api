/* eslint-disable consistent-return */
import knexMusic from '../../db/knexMusic.js';

class Users {
  constructor() {
    this.table = 'users';
  }

  /**
   * Find a specific user
   */
  async findOne(username) {
    try {
      return await knexMusic('users')
        .where({ username })
        .select()
        .first();
    } catch (error) {
      return console.error(error);
    }
  }

  /**
   * List all users
   */
  async get() {
    try {
      return await knexMusic(this.table).select();
    } catch (message) {
      console.error(message);
    }
  }

  /**
   * Register a new user
   */
  async add(username, password, name, email) {
    try {
      return await knexMusic(this.table).insert({
        username,
        password,
        name,
        email,
        role: 'member',
      });
    } catch (message) {
      console.error(message);
    }
  }

  /**
   * Update a user's personal data
   */
  async update(id, username, name, email) {
    try {
      return await knexMusic(this.table).where('id', id).update({ username, name, email });
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Insert a new field to the users table through the seeder
   */
  async seed(field) {
    try {
      // add field, get new id and return the id
      const id = await knexMusic(this.table).insert(field);
      return id;
    } catch (message) {
      console.error(message);
    }
  }
}

export default Users;
