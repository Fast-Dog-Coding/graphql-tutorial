// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
    # Game
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
    }

    # Review
    type Review {
        id: ID!,
        rating: Int!
        content: String!
    }

    # Author
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }

    # Query
    type Query {
        authors: [Author]
        author(id: ID!): Author
        games: [Game]
        game(id: ID!): Game
        reviews: [Review]
        review(id: ID!): Review
    }
`;

export default typeDefs;
