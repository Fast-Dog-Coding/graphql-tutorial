// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql

type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]!
}

type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]!
}

type Review {
    id: ID!
    rating: Int!
    content: String!
    author: Author!
    game: Game!
}

type Query {
    authors: [Author!]!
    author(id: ID!): Author
    games: [Game!]!
    game(id: ID!): Game
    reviews: [Review!]!
    review(id: ID!): Review
}

type Mutation {
    addAuthor(author: AddAuthorInput!): Author!
    deleteAuthor(id: ID!): [Author!]!
    updateAuthor(id: ID!, author: EditAuthorInput!): Author!
    addGame(game: AddGameInput!): Game!
    deleteGame(id: ID!): [Game!]!
    updateGame(id: ID!, game: EditGameInput!): Game!
    addReview(review: AddReviewInput!): Review!
    deleteReview(id: ID!): [Review!]!
    updateReview(id: ID!, review: EditReviewInput!): Review!
}

input AddAuthorInput {
    name: String!
    verified: Boolean!
}

input AddGameInput {
    title: String!
    platform: [String!]!
}

input AddReviewInput {
    rating: Int!
    content: String!
    author_id: ID!
    game_id: ID!
}

input EditAuthorInput {
    name: String
    verified: Boolean
}

input EditGameInput {
    title: String
    platform: [String!]
}

input EditReviewInput {
    rating: Int
    content: String
    author_id: ID
    game_id: ID
}
`;

export default typeDefs;
