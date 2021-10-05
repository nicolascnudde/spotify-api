import knex from 'knex';

// database configuration
const dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: './db/music.db3',
  },
  useNullAsDefault: true,
};

// initialize and export
const knexMusic = knex(dbConfig);
export default knexMusic;
