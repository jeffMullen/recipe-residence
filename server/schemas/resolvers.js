const { AuthenticationError } = require('apollo-server-express');
const { User, Recipe } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');
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

      return await Recipe.find();
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

    getSingleRecipe: async (_, args) => {
      const { recipeId } = args;

      return Recipe.findById(recipeId);

    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    addRecipe: async (parent, { title, ingredients, description, instructions, total_time, dietary_restrictions, author }, context) => {
      console.log('IN ADD RECIPE RESOLVER')
      const recipe = { title, ingredients, description, instructions, total_time, dietary_restrictions, author };
      console.log(recipe);

      if (context.user) {
        const newRecipe = await Recipe.create({ ...recipe });
        console.log('AFTER RECIPE CREATE')

        await User.findByIdAndUpdate(context.user._id, { $push: { saved_recipes: newRecipe } });

        return recipe;
      }

      throw new AuthenticationError('Not logged in');
    },

    updateRecipe: async (parent, { _id, title, total_time, description, ingredients, instructions, dietary_restrictions, author }, context) => {
      const recipe = { title, ingredients, description, instructions, total_time, dietary_restrictions, author };


      if (context.user) {
        const updatedRecipe = await Recipe.findOneAndUpdate(
          { _id },
          { ...recipe },
          { new: true }
        );

        console.log("RECIPE UPDATED -- BEFORE USER UPDATE")


        return updatedRecipe;

      }
      throw new AuthenticationError('Not logged in');
    },

    saveRecipe: async (parent, { _id, title, description, ingredients, instructions, total_time, dietary_restrictions, link }, context) => {
      const recipe = { _id, title, description, ingredients, instructions, total_time, dietary_restrictions, link };
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { saved_recipes: recipe }
          }
        );
      }
      throw new AuthenticationError('Please log in to add a favorite recipe');
    },

    removeRecipe: async (parent, temp, context) => {
      const { _id } = temp;
      if (context.user) {
        return User.findOneAndUpdate(
          {
            _id: context.user._id
          },
          {
            $pull: {
              saved_recipes: { _id: mongoose.Types.ObjectId(_id) }
            }
          },
          { new: true }
        );
      }
      throw new AuthenticationError('Please log in to remove a favorite recipe');
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

//UNUSED QUERIES

// recipe: async (parent, { _id }) => {
  //   return await Recipe.findById(_id).populate('dietary_restrictions');
  // },

  // user: async (parent, args, context) => {
  //   if (context.user) {
  //     const user = await User.findById(context.user._id).populate('Recipe');

  //     // user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  //     //above is an idea for sorting recipes belonging to a user

  //     return user;
  //   }

  //   throw new AuthenticationError('Not logged in');
  // },