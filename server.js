const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = readFileSync('./schema.graphql', 'utf8');
const physicians = [
  {
    id: 1,
    firstName: 'Julius',
    lastName: 'Hibert',
    email: 'hibert@notablehealth.com',
    patients: []
  },
  {
    id: 2,
    firstName: 'Algernop',
    lastName: 'Krieger',
    email: 'krieger@notablehealth.com',
    patients: [
      {
        id: 1,
        name: "Sterling Archer",
        time: "8:00AM",
        kind: "NewPatient"
      }
    ]
  },
  {
    id: 3,
    firstName: 'Nick',
    lastName: 'Riviera',
    email: 'riviera@notablehealth.com',
    patients: []
  },
];

  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    physicians: () => physicians,
    physician: (_, {id}) => physicians.find(p => p.id === id)
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});