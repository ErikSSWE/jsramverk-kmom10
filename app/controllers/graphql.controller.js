const db = require("../models");
const dbUsers = db.dbUsers;
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

test2 = {
  test: "yey",
  test2: "no"
}


// Create and Save a new user
exports.test = (req, res) => {
  data = graphqlHTTP({
    schema: textEditors.findAll,
    rootValue: "yey",
    graphiql: true,
  })

  res.send(data)
};
