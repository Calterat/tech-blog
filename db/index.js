const sequelize = require('../config/connection');

const seedUser = require('./seed-users');
const seedBlog = require('./seed-blogs');
const seedComment = require('./seed-comments');


const seed = async () => {
  console.log("Let's load in the test data...");
  await sequelize.sync({ force: true });
  await seedUser();
  await seedBlog();
  await seedComment();
  process.exit(0);
}

seed();