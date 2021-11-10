const db = require('./connection');
const { User, Recipe } = require('../models');

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
      instructions: ["first, Peel, wash, and quarter the potatoes. Place the potatoes in a pot and cover with water.  Next, Bring potatoes to a boil over high heat. Reduce heat to medium and boil for about 20 minutes, or until potatoes are tender. Remove from water as soon as the potatoes are tender. (This prevents the potatoes from becoming water logged, which makes a huge difference in the creaminess of the potatoes.)  Then put the milk and butter in a microwave safe bowl or measuring cup. Heat until the mixture is warm and the butter is completely melted.  While the cream and butter are heating, mash the potatoes. (I used an old-school hand masher because overbeating potatoes can make them gummy.) Once mashed, add the hot cream and butter mixture and stir vigorously.  Finally, stir in the nutritional yeast and sour cream."],
      total_time: "45 minutes",
      dietary_restrictions: ['Low-Sodium'],
      link: "https://www.sodiumoptional.com/mashed-potatoes/"
    },
    {
      author: 'Marlandis',
      title: "Indiana Lasagna",
      dietary_restrictions: ['Halal', 'Vegetarian'],
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
      instructions: ["Preheat oven to 350 degrees F. Make the meat sauce.", "Add beef and sausage to a large skillet over medium-high heat, breaking it apart with a wooden spoon. Add the onion and garlic. Cook until meat is browned, about 6-8 minutes.", "Drain the fat from the meat. Return the meat to the skillet. Add the tomato sauce, crushed tomatoes, tomato paste, water, sugar, 2 teaspoons salt, 2 teaspoons Italian seasoning, 1 teaspoon basil, and the black pepper. Stir until well combined.", "Cover and reduce the heat to low. Simmer the sauce for 30 minutes.", "Stir in 2 tablespoons of the minced parsley. As the sauce cooks, make the ricotta mixture. In a large bowl, add 1 cup mozzarella, the ricotta, 1/4 cup parmesan, 2 tablespoons of the parsley, the egg, 1 teaspoon salt, 1 teaspoon Italian seasoning, and 1/2 teaspoon basil. Stir until well incorporated.", "Cook the pasta al dente, according to it’s package directions.", "Assemble the lasagna. In a 13x9 inch baking dish, add a very thin layer of meat sauce (about 1/4 cup). Layer 3 lasagna noodles, 1/3 of the ricotta mixture, and 1 1/2 (level) cups of meat sauce. Repeat the layers twice. Add a final layer of the remaining noodles, meat sauce, 1 cup mozzarella, and 1/4 cup parmesan. Cover with foil that has been sprayed with nonstick cooking spray. Bake for 45 minutes. Remove the foil. Bake 15 more minutes.  Let the lasagna cool for 15-20 minutes before cutting."],
      total_time: '100 minutes',
      link: "https://www.thewholesomedish.com/the-best-classic-lasagna/"
    },
    {
      author: 'Rala',
      title: 'Katsudon',
      ingredients: [
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
      instructions: ["1. Bring salt water to a boil and cook the basmati rice for 20 minutes. 2. Salt and pepper the pork slices, pass them through the flour, 2 beaten eggs and then breadcrumbs. Fry them. When the slices are cooked, cut them into strips in width. 3. In a non-stick wok, sauté the minced onion, 1 dl of water, mirin, soy sauce and then add the breaded pork slices. Cover with the remaining 2 beaten whole eggs. Cover and simmer for a few minutes over low heat. 4. In large bowls, put the rice, place on top of the crispy breaded pork with the preparation based on beaten eggs."],
      total_time: '40 minutes',
      link: "https://www.cuisineaz.com/recettes/katsudon-102161.aspx"
    },
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
      author: "Marlandis",
      title: "Inspiration Pizza",
      ingredients: [
        'Dry Yeast - 2 tspn',
        'Lukewarm Water - 1/2 cup',
        "All-Purpose Flour - 3 1/2 cups",
        'Semolina Flour - 1/2 cup',
        'Black Pepper - 1/4 tspn',
        'Salt-Free Garlic Powder - 1/4 tspn',
        'Dried Oregano - 1/4 tspn',
        'Cold Water - 3/4 cup',
        'Olive Oil - 1/4 cup'
      ],
      description: "An alternative take on a flat-bread pizza that allows you to enjoy your food without any of the guilt.",
      instructions: "You can make this recipe in a large bowl. But I like using my stand-up mixer with the dough hook for more manpower. Either way, begin the dough by stirring yeast and lukewarm water together in a bowl (or directly in your mixer). Add ¼ cup of the all-purpose flour and ¼ cup of semolina. Mix well with a whisk and let it sit until bubbly, about 15 minutes.  Combine the remaining flour, semolina, black pepper, garlic powder, and dried oregano in another bowl. Add to the yeast mixture and add in the cold water and olive oil as well. Stir (or turn on that mixer) and combine all the ingredients until it forms a dough. It will take a few minutes to come together, so be patient! And as for the right, dough texture, it shouldn’t be dry but not too sticky either…somewhere right in between. Add a little extra flour if needed. Then, cover with plastic wrap and let it rise in a warm corner of your kitchen until doubled in size, about an hour.  At this point, you can refrigerate or freeze your dough for later use. But if you’re ready for some pizza pie…  Preheat the oven to 425dg F.  On a lightly floured work surface, divide the dough into 2 equal disks (or 4 if you want smaller pizzas–just watch your baking time carefully as you’ll probably need to cook them for half the normal time). Let the doughy disks rest for 20 minutes and then use your hand or a rolling pin to stretch out the dough into 10” crusts. The dough is pretty elastic, so it will probably shrink back on itself. Just keep rolling.  When the size is right, put it on a pizza stone or baking tray on the middle rack and cook for 5 minutes. Take out the crust and put on your choice of sauce and toppings. Place the pie back in the oven until crust is golden brown, another 8 to 10 minutes.  Let it cool, slice, and serve.",
      total_time: "90 minutes",
      dietary_restrictions: [
        'Low-Sodium',
        'Low-Fat'
      ],
      link: 'http://www.sodiumgirl.com/low-sodium-inspiration-pizza/'
    },
    {
      author: "Branflakes",
      title: "Passover Rolls",
      ingredients: [
        "Matzo Meal - 2 cups",
        "Salt - 1/2 tspn",
        "Sugar -  1/2 tspn",
        "Water - 1 cup",
        'Vegetable Oil - 1/2 cup',
        'Medium Egg - 4'
      ],
      description: 'Matzo rolls that my grandmother used to make for Passover dinner',
      instructions: 'Step 1: Preheat oven to 375 degrees F (190 degrees C). Lightly grease a cookie sheet.  Step 2: In a large mixing bowl, combine matzo meal, salt, and sugar. Mix well.  Step 3: Bring water and oil to a boil. Pour the boiling water over the matzo meal mixture, and stir until blended. Beat one egg at a time into the mixture. Let stand 15 minutes.  Step 4: Shape the dough into rolls with oiled hands. Arrange rolls on the prepared cookie sheet.  Step 5: Bake at 375 degrees F (190 degrees C) for 50 minutes.',
      total_time: '70 minutes',
      dietary_restrictions: [
        'Low-Sodium',
        'Low-Fat',
        'Vegetarian',
        'Dairy-Free',
        'Lactose-Intolerant',
        'Peanut-Free',
        'Shellfish-Free',
      ],
      link: "https://www.allrecipes.com/recipe/16158/passover-rolls-i/"
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
