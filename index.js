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
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: http://localhost:4000`);



/*
{
test
students {
   id
   firstName
   lastName
}
studentById(id:"S1001") {
  id
  fullName
}

}
*/

//Fragments for reusing the fields
/*
{
  leftComparison: studentById(id:"S1001") {
    ...comparisonFields
  }
  rightComparison: studentById(id:"S1002") {
    ...comparisonFields
  }
}

 fragment comparisonFields on Student {
  fullName
  firstName
  college {
     name
  } 
}
*/

// Using variables inside fragments#
/*
query Compare($first: ID!,$second:ID!) 
{
  leftComparison: studentById(id:$first) {
    ...comparisonFields
  }
  rightComparison: studentById(id:$second) {
    ...comparisonFields
  }
}

 fragment comparisonFields on Student {
  fullName
  firstName
  college {
     name
  } 
}
//In variable box
{
  "first":"S1001",
  "second":"S1002"
}
*/

// using directives in query
/*
query Compare($first: ID!,$second:ID!,$ifPsw:Boolean!) 
{
  leftComparison: studentById(id:$first) {
    ...comparisonFields
  }
  rightComparison: studentById(id:$second) {
    ...comparisonFields
  }
}


 fragment comparisonFields on Student {
  firstName
  password @include(if: $ifPsw)
  college {
     name
  } 
}

{
  "first":"S1001",
   "second":"Byl_k0zXDi",
   "ifPsw":false
}
*/