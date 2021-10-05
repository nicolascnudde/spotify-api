/**
 * A user parser to parse the incoming request
 */

export default (request) => {
  const { user } = request.body;

  // validate if we have a user in the body
  if (user == null) {
    throw new Error('The user object was not set!');
  }

  // check if the user has a title
  if (user.username == null) {
    throw new Error('The user object doesn\'t have a username!');
  }

  // check if the user has an email address
  if (user.email == null) {
    throw new Error('The user object doesn\'t have an email address!');
  }

  // return the parsed user
  return user;
};
