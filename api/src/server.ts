import { resolve } from "path";
import { GraphQLServer } from "graphql-yoga";

const USERS = [
  { id: 1, name: "Tony Stark", email: "tony@stark.com" },
  { id: 2, name: "Spider Man", email: "spider@man.com" }
];

const typeDefs = resolve(__dirname, "schema.graphql");
const resolvers = {
  Query: {
    users: (): typeof USERS => USERS
  },
  Mutation: {
    createUser: async (parent, { data }, ctx, info) => {
      const user = {
        id: USERS.length + 1,
        ...data
      };

      USERS.push(user);

      return user;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

export default server;
