/* eslint-disable no-undef */
import Songs from '../src/lib/Songs.js';

const database = new Songs();

describe('Tests to the sqlite3 database', () => {
  it('should return an array with at least one song', async () => {
    const songs = await database.get();
    expect(Array.isArray(await songs)).toBe(true);
    expect(songs.length).toBeGreaterThan(0);
  });
});
