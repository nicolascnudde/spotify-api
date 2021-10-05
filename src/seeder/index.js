/* imports */
import faker from 'faker';
import Users from '../lib/Users.js';

const usersDb = new Users();

const createUsers = (amount) => {
  const usersPlain = [];
  const users = [];
  let counter = 0;

  // as long the amount of departments doesn't meet the given amount, keep on faking
  while (counter < amount) {
    // create a new user
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      role: 'member',
    };
    // check if unique and then add to the array
    if (usersPlain.indexOf(user.username) < 0) {
      usersPlain.push(user.username);
      users.push(user);
      // eslint-disable-next-line no-plusplus
      counter++;
    }
  }

  // return the given amount of users
  return users;
};

const seedUsers = (users) => {
  const ids = users.map(async (user) => {
    const [id] = await usersDb.seed(user);
    return id;
  });

  return Promise.all(ids);
};

const seed = async () => {
  // get all the users from the database
  // const users = await usersDb.get();
  // console.log(users);

  // create 50 users
  const users = createUsers(50);
  console.log(`Created ${users.length} users`);

  // seed these users
  const ids = await seedUsers(users);
  console.log(ids);
  console.log('Users added to database');

  // stop the process
  process.exit();
};

seed();
