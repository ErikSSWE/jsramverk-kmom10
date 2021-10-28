const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull
} = require('graphql');

const TextsType = new GraphQLObjectType({
    name: 'Texts',
    description: 'This represents a text',
    fields: () => ({
        title: { type: GraphQLNonNull(GraphQLString) },
        text: { type: GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLNonNull(GraphQLString) },
        updatedAt: { type: GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLNonNull(GraphQLString) }
    })
})

module.exports = TextsType;