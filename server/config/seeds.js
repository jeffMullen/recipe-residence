const db = require('./connection');
const { User, Recipe, DietaryRestrictions} = require('../models');

db.once('open', async () => {
  await DietaryRestrictions.deleteMany();

  await DietaryRestrictions.insertMany([
    { type: 'Vegan' },
    { type: 'Vegetarian' },
    { type: 'Dairy-Free' },
    { type: 'Egg-Free' },
    { type: 'Kosher' },
    { type: 'Halal' },
    { type: 'Keto' },
    { type: 'Paleo' },
    { type: 'Diabetic' },
    { type: 'Lactose-Intolerant' },
    { type: 'Low-Carb' },
    { type: 'Low-Fat' },
    { type: 'Fat-Free' },
    { type: 'Gluten-Free' },
    { type: 'Peanut-Free' },
    { type: 'Nut-Free' },
    { type: 'Shellfish-Free' },
    { type: 'Soy-Free' },
  ]);

  console.log('dietary seeded seeded');

  //no recipe seeds exist, if we want some, we can add them
  console.log("no recipe seeds exist, can add them if we desire");



  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
