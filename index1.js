// const { ApolloServer } = require('@apollo/server')
// const { startStandaloneServer } = require('@apollo/server/standalone')

// const fs = require('fs')
// const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
// const resolvers = require('./resolvers')
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const express = require('express');
// const expressJwt = require('express-jwt');
// const jwt = require('jsonwebtoken');
// const app = express();
// const db = require('./db');
// //private key
// const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

// app.post('/login', (req, res) => {
//    const {email, password} = req.body;
   
//    //check database
//    const user = db.students.list().find((user) =>  user.email === email);
//    if (!(user && user.password === password)) {
//       res.sendStatus(401);
//       return;
//    }
   
//    //generate a token based on private key, token doesn't have an expiry
//    const token = jwt.sign({sub: user.id}, jwtSecret);
//    res.send({token});
// });
// app.use(expressJwt({
//     secret: jwtSecret,
//     algorithms: ['RS256'],
//     credentialsRequired: false
//  }));
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: {user: req.user && db.students.get(req.user.sub)}
// });
// const { url } = startStandaloneServer(server, {
//     listen: { port: 6000 },
// });
// console.log(`🚀  Server ready at: http://localhost:6000`);


const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt'); //auth
const jwt = require('jsonwebtoken'); //auth
const db = require('./db');

var port = process.env.PORT || 9000
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const app = express();

const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')
const {makeExecutableSchema} = require('graphql-tools')

const schema = makeExecutableSchema({typeDefs, resolvers})
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cors(), bodyParser.json(), expressJwt({
   secret: jwtSecret,
   algorithms: ['HS256'],
   credentialsRequired: false
}));

// const  graphiqlExpress = require('apollo-server-express').graphiqlExpress
const { graphqlHTTP } = require("express-graphql");
// app.use('/graphql', graphqlHTTP((req) => ({
//    schema:schema,
//    context: {user: req.user && db.students.get(req.user.sub)}
// })));
// app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

app.use('/graphql', graphqlHTTP((req)=>({
    schema: schema,
    graphiql: true,
    context: {user: req.user && db.students.get(req.user.sub)}
})));

//authenticate students
app.post('/login', (req, res) => {
    const email = req.body.email;
   const password = req.body.password;

   const user = db.students.list().find((user) =>  user.email === email);
   if (!(user && user.password === password)) {
      res.sendStatus(401);
      return;
   }
   const token = jwt.sign({sub: user.id}, jwtSecret);
   res.send({token});
});

app.listen(port, () => console.info(`Server started on port ${port}`));