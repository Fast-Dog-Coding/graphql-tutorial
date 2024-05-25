import data from '../data/index.js'

const resolvers = {
  Query: {
    authors() {
      return data.authors;
    },
    author(_: any, args: { id: string; }) {
      return data.authors.find(a => a.id === args.id);
    },
    games() {
      return data.games;
    },
    game(_: any, args: { id: string; }) {
      return data.games.find(a => a.id === args.id);
    },
    reviews() {
      return data.reviews;
    },
    review(_: any, args: { id: string; }) {
      return data.reviews.find(a => a.id === args.id);
    },
  }
}

export default resolvers;
