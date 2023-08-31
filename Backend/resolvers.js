const { users, quotes } = require("./data/fakedb");
const { randomBytes } = require("crypt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "token";
const User = require("./models/User");
const Quote = require("./models/Quotes");
const resolvers = {
  Query: {
    users: () => users,
    user: (parent, arg) => users.find((user) => user._id == arg._id),
    quotes: () => quotes,
    iquote: (parent, arg) => quotes.filter((quote) => quote.by == arg.by),
  },
  User: {
    quotes: (user) => quotes.filter((quote) => quote.by === user._id),
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const emailexists = await User.findOne({ email: userNew.email });
      if (emailexists) {
        throw new Error("User already exists with that email");
      }
      const salt = 10;
      const hashPassword = await bcrypt.hash(userNew.password, salt);

      const newUser = new User({ ...userNew, password: hashPassword });

      return await newUser.save();
    },
    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User dosent exists with that email");
      }
      const passwordMatch = await bcrypt.compare(
        userSignin.password,
        user.password
      );
      if (!passwordMatch) {
        throw new Error("email or password in invalid");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) throw new Error("You must be logged in");

      const newQuote = new Quote({
        name,
        by: userId,
      });
      const data = await newQuote.save();
      return "Quote saved successfully";
    },
  },
};

module.exports = resolvers;
