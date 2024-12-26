const { User, Book, Auth } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);  // Assuming context contains the user info
      }
      throw new AuthenticationError('Not logged in');
    },
    books: async () => {
      return Book.find({});
    },
    users: async () => {
      return User.find();
    },
    user: async (_, { username }) => {
      return User.findOne({ username }).populate('savedBooks');
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);  // Ensure signToken function is correctly implemented
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);  // Ensure isCorrectPassword is implemented in the User model
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);  // Ensure signToken function is correctly implemented
      return { token, user };
    },
    saveBook: async (_, { username, book }) => {
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    removeBook: async (_, { username, content }) => {
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { $pull: { savedBooks: { bookId: content } } },
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
