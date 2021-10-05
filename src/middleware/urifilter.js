/* eslint-disable consistent-return */
/**
 * URI filter middleware
 */

export default (req, res, next) => {
  if (!req.body.song) {
    next();
    return false;
  }

  const { uri } = req.body.song;
  // check if the uri has the following string
  if (uri.includes('spotify:track:')) {
    next();
  } else {
    res.status(406).json({ error: 'The URI is not valid! Please try again.' });
  }
};
