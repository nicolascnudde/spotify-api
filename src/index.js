/* eslint-disable prefer-destructuring */
/**
 * Our main application
 */
import Express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import registerSongEndPoints from './actions/song/registerSongEndpoints.js';
import registerPlaylistEndpoints from './actions/playlist/registerPlaylistEndpoints.js';
import registerUserEndpoints from './actions/user/registerUserEndpoints.js';
import allMiddleware from './middleware/index.js';
import authMiddleware from './middleware/auth.js';
import authenticate from './actions/auth/index.js';

// init dotenv
dotenv.config();

// create a new express application
const app = Express();

// define the node environment
const NODE_ENV = process.env.NODE_ENV;

// enable cors
app.use(cors());

// add json body parser
app.use(bodyParser.json());

// register songs endpoints with authentication and uri filter middleware
app.use('/songs', ...allMiddleware, registerSongEndPoints);

// register user playlists endpoints with authentication middleware
app.use('/users', authMiddleware, registerPlaylistEndpoints);

// register users endpoints
app.use('/users', registerUserEndpoints);

// register auth endpoints
app.use('/auth', authenticate);

/**
 * Start listening on a port
 */
if (NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT}`);
  });
}

// export the app
export default app;
