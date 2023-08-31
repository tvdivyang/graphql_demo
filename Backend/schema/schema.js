const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID): User
    quotes: [Quote]
    iquote(by: ID): [Quote]
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    quotes: [Quote]
  }

  type Quote {
    Name: String!
    by: ID
  }
  type Token {
    token: String!
  }

  type Mutation {
    signupUser(userNew: UserInput): User
    signinUser(userSignin: UserSigninInput): Token
    createQuote(name: String): String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSigninInput {
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
