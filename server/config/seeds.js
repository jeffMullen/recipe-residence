const db = require('./connection');
const { User, Recipe} = require('../models');

db.once('open', async () => {

  await Recipe.deleteMany();

  await Recipe.insertMany([
    {
      author: 'Branflakes',
      title: "Low Sodium Mashed Potatoes",
      ingredients: [
        'Russet Potatoes - 2.5 lbs',
        'Cream or Milk - 1/4 cup',
        'Unsalted Butter - 1/4 cup',
        'Nutritional Yeast -  3 tbsp',
        'Sour Cream - 1 cup'
      ],
      description: "a creamy, low sodium mashed potatoes recipe that is sure to be something you'll favorite!",
      instructions: "first, Peel, wash, and quarter the potatoes. Place the potatoes in a pot and cover with water.  Next, Bring potatoes to a boil over high heat. Reduce heat to medium and boil for about 20 minutes, or until potatoes are tender. Remove from water as soon as the potatoes are tender. (This prevents the potatoes from becoming water logged, which makes a huge difference in the creaminess of the potatoes.)  Then put the milk and butter in a microwave safe bowl or measuring cup. Heat until the mixture is warm and the butter is completely melted.  While the cream and butter are heating, mash the potatoes. (I used an old-school hand masher because overbeating potatoes can make them gummy.) Once mashed, add the hot cream and butter mixture and stir vigorously.  Finally, stir in the nutritional yeast and sour cream.",
      total_time: "45 minutes",
      dietary_restrictions: ['Low-Sodium'],
      link: "https://www.sodiumoptional.com/mashed-potatoes/"
    },
    {
      author: 'Marlandis',
      title: "Indiana Lasagna",
      ingredients: [
        'Ground Beef - 1 lb',
        'Sweet Italian Sausage - 1/2 lb',
        'Medium Onion, chopped - 1',
        'Garlic Gloves, minced - 2',
        'Tomato Sauce - 15 Oz',
        'Tomatoes, crushed - 15 Oz',
        'Tomato Paste - 12 Oz',
        'Water - 1/2 cup',
        'Sugar - 2 tbsp',
        'Salt - 3 tspn',
        'Italian Seasoning - 3 tspn',
        'Dried Basil Leaves - 1 1/2 tspn',
        'Black Pepper - 1/4 tspn',
        'Fresh Flat-Leaf Parsley, minced - 1/4 cup',
        'Mozzerella Cheese, shredded - 2 cups',
        'Whole Milk Ricotta Cheese - 15 Oz',
        'Parmesan Cheese, grated - 1/2 cup',
        'Large Egg - 1',
        'Lasagna Noodles, 12',
      ],
      description: "The best homemade lasagna with 200 years of refinement in Indiana!",
      instructions: "Preheat oven to 350 degrees F. Make the meat sauce. Add beef and sausage to a large skillet over medium-high heat, breaking it apart with a wooden spoon. Add the onion and garlic. Cook until meat is browned, about 6-8 minutes. Drain the fat from the meat. Return the meat to the skillet. Add the tomato sauce, crushed tomatoes, tomato paste, water, sugar, 2 teaspoons salt, 2 teaspoons Italian seasoning, 1 teaspoon basil, and the black pepper. Stir until well combined. Cover and reduce the heat to low. Simmer the sauce for 30 minutes. Stir in 2 tablespoons of the minced parsley. As the sauce cooks, make the ricotta mixture. In a large bowl, add 1 cup mozzarella, the ricotta, 1/4 cup parmesan, 2 tablespoons of the parsley, the egg, 1 teaspoon salt, 1 teaspoon Italian seasoning, and 1/2 teaspoon basil. Stir until well incorporated. Cook the pasta al dente, according to it’s package directions. Assemble the lasagna. In a 13x9 inch baking dish, add a very thin layer of meat sauce (about 1/4 cup). Layer 3 lasagna noodles, 1/3 of the ricotta mixture, and 1 1/2 (level) cups of meat sauce. Repeat the layers twice. Add a final layer of the remaining noodles, meat sauce, 1 cup mozzarella, and 1/4 cup parmesan. Cover with foil that has been sprayed with nonstick cooking spray. Bake for 45 minutes. Remove the foil. Bake 15 more minutes.  Let the lasagna cool for 15-20 minutes before cutting.",
      total_time: '100 minutes',
      link: "https://www.thewholesomedish.com/the-best-classic-lasagna/"
    },
    {
      author: 'Rala',
      title: 'Katsudon',
      indregients: [
        'Large Eggs - 4',
        'Flour - 40g',
        'Medium Onion - 1',
        'soy sauce - 1 tbsp',
        'pepper - 1 tspn',
        'salt - 1 tspn',
        'Pork Meat - 4 slices',
        'Basmati Rice - 250g',
        'Jalapeno bread or breadcrumbs - 20g',
        'Mirin - 1 tbsp',
        'Peanut Oil'
      ],
      description: "This is a bowl of rice served with crispy breaded pork slices with a half-cooked egg mixture. The peculiarity of this dish of Japanese cuisine is that it contains mirin, a kind of sake with a sweet taste and reserved for culinary uses. To your chopsticks!",
      instructions: "1. Bring salt water to a boil and cook the basmati rice for 20 minutes. 2. Salt and pepper the pork slices, pass them through the flour, 2 beaten eggs and then breadcrumbs. Fry them. When the slices are cooked, cut them into strips in width. 3. In a non-stick wok, sauté the minced onion, 1 dl of water, mirin, soy sauce and then add the breaded pork slices. Cover with the remaining 2 beaten whole eggs. Cover and simmer for a few minutes over low heat. 4. In large bowls, put the rice, place on top of the crispy breaded pork with the preparation based on beaten eggs.",
      total_time: '40 minutes',
      link: "https://www.cuisineaz.com/recettes/katsudon-102161.aspx"
    }
  ]);

  console.log("Recipes seeded");



  await User.deleteMany();

  await User.create({
    username: 'Marlandis',
    email: 'marlandis@testmail.com',
    password: 'password12345',
  });

  await User.create({
    username: 'Rala',
    email: 'rala@testmail.com',
    password: 'password12345'
  });

  await User.create({
    username: 'Branflakes',
    email: 'bran@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
