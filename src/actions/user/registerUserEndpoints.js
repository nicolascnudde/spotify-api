/**
 * Registering the Song API endpoints
 */
import Express from 'express';
import Users from '../../lib/Users.js';
import {
  addUser,
  updateUser,
} from './crudUser.js';

const app = Express.Router();
const userData = new Users();

app.post('/', async (req, res) => {
  await addUser(userData, req, res);
});

app.put('/:id', async (req, res) => {
  await updateUser(userData, req, res);
});

export default app;
