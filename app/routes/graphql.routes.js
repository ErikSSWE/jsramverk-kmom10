const graphqlController = require("../controllers/graphql.controller.js");
var { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema
} = require("graphql");

const RootQueryType = require('../graphql/root');

const schema = new GraphQLSchema({
    query: RootQueryType
});

module.exports = app => {
    var { graphqlHTTP } = require('express-graphql');

    app.use('/api/graphql/test', graphqlHTTP({
        schema: schema,
        graphiql: false,
    }));
};
