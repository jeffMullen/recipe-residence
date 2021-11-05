const { AuthenticationError } = require('apollo-server-express');
const { User, Recipe } = require('../models');
const { signToken } = require('../utils/auth');
//  const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');  add back if we want to use donations

const resolvers = {
  Query: {
    recipes: async (parent, { dietary_restrictions, title }) => {
      const params = {};

      if (dietary_restrictions) {
        params.dietary_restrictions = dietary_restrictions;
      }

      if (title) {
        params.title = {
          $regex: title
        };
      }

      return await Recipe.find(params).populate('dietary_restrictions');
    },


    recipe: async (parent, { _id }) => {
      return await Recipe.findById(_id).populate('dietary_restrictions');
    },

    getRecipeTitle: async (_, args) => {

      // destrcture search, page, limit, and set default values
      const { search = null, page = 1, limit = 20 } = args;

      let searchQuery = {};

      // run if search is provided
      if (search) {
        // update the search query
        searchQuery = {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            // { lastName: { $regex: search, $options: 'i' } },
            // { userName: { $regex: search, $options: 'i' } },
            // { email: { $regex: search, $options: 'i' } },
            // { jobTitle: { $regex: search, $options: 'i' } }
          ]
        }
      }

      // execute query to search users
      const recipes = await Recipe.find(searchQuery)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean();

      // get total documents
      const count = await Recipe.countDocuments(searchQuery);

      return {
        recipes,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      }
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('Recipe');

        // user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
        //above is an idea for sorting recipes belonging to a user

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    addRecipe: async (parent, { recipe }, context) => {
      console.log(context);
      if (context.user) {
        const recipe = new Recipe({ recipe });

        await User.findByIdAndUpdate(context.user._id, { $push: { savedRecipes: recipe } });

        return recipe;
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;
