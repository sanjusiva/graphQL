//Run an Express GraphQL Server to execute query
var express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');
// Construct a schema, using GraphQL schema language  
var schema = buildSchema(`
type Query{
hello:String
}
`);
var schemas = buildSchema(`
type Query{
world:String
}
`);

// The root provides a resolver function for each API endpoint  
var root = {
    hello: () => {
        return 'Hello world!';
    },
};
var tree={
    world:()=>{
        return 'Hi everyone';
    }
}
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.use('/world', graphqlHTTP({
    schema: schemas,
    rootValue: tree,
    graphiql: true,
}));
app.listen(3000);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');







// const { ApolloServer } = require('@apollo/server')
// const { startStandaloneServer } = require('@apollo/server/standalone')

// const typeDefs = `
//   type Book {
//     title: String
//     author: String
//   }
//   type Query {
//     books: [Book]
//   }
// `;

// const books = [
//     {
//         title: 'The Awakening',
//         author: 'Kate Chopin',
//     },
//     {
//         title: 'City of Glass',
//         author: 'Paul Auster',
//     },
// ];
// const resolvers = {
//     Query: {
//         books: () => books,
//     },
// };
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
// });
// const { url } = startStandaloneServer(server, {
//     listen: { port: 4000 },
// });
// console.log(`🚀  Server ready at: http:localhost:4000`);