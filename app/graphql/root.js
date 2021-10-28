const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const db = require("../models");
const TextEditor = db.textEditors;
console.log("texteditors: ", TextEditor);
const TextsType = require("./texts.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        texts: {
            type: GraphQLList(TextsType),
            description: 'List of all texts',
            resolve: async function() {
                return await TextEditor.find({});
            }
        }
    })
});

module.exports = RootQueryType;