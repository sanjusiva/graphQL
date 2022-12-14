const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = startStandaloneServer(server, {
    listen: { port: 5000 },
});
console.log(`🚀  Server ready at: http://localhost:5000`);