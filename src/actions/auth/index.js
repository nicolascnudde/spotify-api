/* eslint-disable radix */
import Express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import Users from '../../lib/Users.js';

// init dotenv library
dotenv.config();

const app = Express.Router();

// function to check if the user pass and hashed pass matches
const isPasswordValid = async (userPassword, dbPassword) => {
  const match = await bcrypt.compare(userPassword, dbPassword);
  return match;
};

// init passport
const LocalStrategy = passportLocal.Strategy;

// init user database
const userData = new Users();

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      try {
        // get user by username
        const user = await userData.findOne(username);

        // check if the user exists
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (!(await isPasswordValid(password, user.password))) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

/**
 * Hash a password
 */
app.post('/hashpass', (req, res) => {
  bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
    .then((hash) => {
      res.status(200).send(hash);
    });
});

/**
 * Authenticate a user
 */
app.post('/login', (req, res) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      res.status(401).send(info);
    } else if (!user) {
      res.status(401).send(info);
    } else {
      // jwt data
      const jwtData = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      // create and sign a jwt
      const token = jwt.sign(jwtData, process.env.JWT_SECRET_KEY, {
        expiresIn: parseInt(process.env.JWT_LIFETIME),
      });

      res.status(200).json({
        success: true,
        token,
        user: {
          username: user.username,
        },
      });
    }
  })(req, res);
});

export default app;
