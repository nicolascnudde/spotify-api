## A Spotify API

For this assignment, we created our own "Spotify" API where we can manage users, songs and playlists.

Admins can add new songs, and members can manage their playlists.



### Built With

* JavaScript
* NodeJS
* Jest
* Knex (SQLite)
* Git Flow



## Usage

A Bearer Token (through JWT) is required in order to POST or DELETE a song, *and* to POST, UPDATE or DELETE a playlist.
This token can be obtained after successfully logging in.

All users can be assigned their own playlists, hence the endpoints for the playlists are /users/:userId/playlists(/:id) instead of /playlists.
Examples:
- If you want to create a new playlist for user 7, the endpoint will be /users/7/playlists
- If you want the update playlist that has the id 3 created by user 10, the endpoint will be /users/10/playlists/3

All of endpoints being used can be found below.

The date used when adding/creating or updating a song or playlist was set in **epoch** time (number of milliseconds since Jan 1 1970), as this contains the exact date and time.
This can ultimately be shown as the full date and time when coding the client (front-end) side. 



### Endpoints

Songs:

- GET: /songs

- POST: /songs

When sending JSON data, the song object has to be set with a title, an artist and the uri.
Example: 
{ "song": {"title": "song title here", "artist": "song artist here", "uri": "spotify:track:xxxxxxxxx" }}

The creation date will automatically be added when posting.

- DELETE: /songs/:id

Users:

- POST: /users/

When sending JSON data, the user object has to be set with a username, password and email address. A name can be added too, but is optional.
Example: 
{ "user": {"username": "chosen username here", "password": "chosen password here", "email": "chosen email address here" }}

The creation date will automatically to the database be added when posting.

- UPDATE: /users/:id

Playlists: 

- GET: /users/:userId/playlists

- POST: /users/:userId/playlists

When sending JSON data, the playlist object has to be set with a title. Songs can be added too, but are optional.
Example: 
{ "user": {"username": "chosen username here", "password": "chosen password here", "email": "chosen email address here" }}

The user that will create the playlist (userId) and the creation date will automatically have their data added to the database.

- UPDATE: /users/:userId/playlists/:id

- DELETE: /users/:userId/playlists/:id

Authentication:

- POST (User Login): /auth/login

Logging in can be done with sending the JSON data as: { "username": "enter username here", "password": "enter password here" }

- POST (Hash a password): /auth/hashpass

Hashing a password can be done with sending the JSON data as: { "password": "enter password here" }

**I purposely decided not to use the UPDATE method for songs, nor the GET and DELETE method for users.**



### Seeder

All of the users found inside the database were created through a seeder.



### Authentication

The first user inside the **users** table in the **music** database has admin rights. 
The password stored here was **ilovecats123**, before it got hashed and overwritten in the database.

The other users were all assigned the member role.
Registration of a new user will also automatically be given the member role.

The first **member** in the users table, with the username **Selmer77**, had their original password set as **oX2Oq0MLJ1hD4PL** before getting hashed.



### Testing

Multiple tests have been implemented, and were tested with jest and supertest:
- To see if there is an array of at least one song inside the songs table in the database
- To see if we get a token after successfully logging in.
- To see if we get all the songs after being authorized with the token

All 3 tests were successful.



### ESLint

ESLint was installed and the code was validated and fixed to the airbnb coding standards.



### Git Flow

Git Flow was used to develop this API. The steps followed were main -> develop -> feature -> develop -> release + main.
The hotfix branch was not used in this project.
