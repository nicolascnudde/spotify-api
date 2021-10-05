/**
 * A playlist parser to parse the incoming request
 */

export default (request) => {
  const { playlist } = request.body;

  // validate if we have a playlist in the body
  if (playlist == null) {
    throw new Error('The playlist object was not set!');
  }

  // check if the playlist has a title
  if (playlist.title == null) {
    throw new Error('The playlist object doesn\'t have a title!');
  }

  // return the parsed playlist
  return playlist;
};
