const { User } = require('../models');

const userData = [
  {
    username: 'testUser1',
    email: 'testuser1@email.com',
    password: 'password1234'
  },
  {
    username: 'testUser2',
    email: 'testuser2@email.com',
    password: 'password5678'
  }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;


