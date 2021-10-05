/**
 * A song parser to parse the incoming request
 */

export default (request) => {
  const { song } = request.body;

  // validate if we have a song in the body
  if (song == null) {
    throw new Error('The song object was not set!');
  }

  // check if the song has a title
  if (song.title == null) {
    throw new Error('The song object doesn\'t have a title!');
  }

  // check if the song has an artist
  if (song.artist == null) {
    throw new Error('The song object doesn\'t have an artist!');
  }

  // check if the song has a uri
  if (song.uri == null) {
    throw new Error('The song object doesn\'t have an uri!');
  }

  // return the parsed song
  return song;
};
