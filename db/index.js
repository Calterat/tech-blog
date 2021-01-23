const sequelize = require('../config/connection');

const seedUser = require('./seed-users');


const seed = async () => {
  console.log("Let's load in the test data...");
  await sequelize.sync({ force: true });
  await seedUser();
  process.exit(0);
}

seed();