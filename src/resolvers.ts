import {
  AddAuthorInput,
  AddGameInput,
  AddReviewInput,
  Author,
  EditAuthorInput,
  EditGameInput,
  EditReviewInput,
  Game,
  Review
} from '../types';
import data from '../data/index.js';
import FileAdapter from './adapters/fileAdapter.js';

// INFO: dbAdapter can be swapped out for a different `dbAdapter` (Data Source)
// import { MongoAdapter } from './adapters/mongoAdapter';
// const dbAdapter = new MongoAdapter();

const dbAdapter = new FileAdapter();
await dbAdapter.connect();

const resolvers = {
  Query: {
    /**
     * Retrieves the list of all `authors`.
     *
     * @returns An array of `authors`.
     */
    authors(): Promise<Author[]> {
      return dbAdapter.fetchAuthors();
    },

    /**
     * Retrieves a specific `author` by `id`.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `author` to retrieve.
     * @returns The `author` with the specified `id`.
     */
    author(_: any, args: { id: string; }): Promise<Author> {
      return dbAdapter.fetchAuthor(args.id);
    },

    /**
     * Retrieves the list of all `games`.
     *
     * @returns An array of `games`.
     */
    games(): Promise<Game[]> {
      return dbAdapter.fetchGames();
    },

    /**
     * Retrieves a specific `game` by `id`.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `game` to retrieve.
     * @returns The `game` with the specified `id`.
     */
    game(_: any, args: { id: string; }): Promise<Game> {
      return dbAdapter.fetchGame(args.id);
    },

    /**
     * Retrieves the list of all `reviews`.
     *
     * @returns An array of `reviews`.
     */
    reviews(): Promise<Review[]> {
      return dbAdapter.fetchReviews();
    },

    /**
     * Retrieves a specific review by id.
     * @param _ - Unused parent argument.
     * @param args - Arguments containing the id of the review to retrieve.
     * @returns The review with the specified id.
     */
    review(_: any, args: { id: string; }): Promise<Review> {
      return dbAdapter.fetchReview(args.id);
    }
  },

  Mutation: {
    /**
     * Adds a new `author` to the `authors` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `author` data (without `id`).
     * @returns The newly added `author`.
     */
    addAuthor(_: any, args: { author: AddAuthorInput }): Promise<Author> {
      return dbAdapter.addAuthor(args.author);
    },

    /**
     * Deletes an `author` by `id` from the `authors` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `author` to delete.
     * @returns The `id` of the deleted `author`.
     */
    deleteAuthor(_: any, args: { id: string; }): Promise<string> {
      return dbAdapter.deleteAuthor(args.id);
    },

    /**
     * Updates an existing `author` in the `authors` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `author` to update and the updated `author` data.
     * @returns The updated `author`.
     */
    updateAuthor(_: any, args: { id: string; author: EditAuthorInput }): Promise<Author> {
      return dbAdapter.updateAuthor(args.id, args.author);
    },

    /**
     * Adds a new `game` to the `games` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `game` data (without `id`).
     * @returns The newly added `game`.
     */
    addGame(_: any, args: { game: AddGameInput }): Promise<Game> {
      return dbAdapter.addGame(args.game);
    },

    /**
     * Deletes a `game` by `id` from the `games` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `game` to delete.
     * @returns The `id` of the deleted `game`.
     */
    deleteGame(_: any, args: { id: string; }): Promise<string> {
      return dbAdapter.deleteGame(args.id);
    },

    /**
     * Updates an existing `game` in the `games` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `game` to update and the updated `game` data.
     * @returns The updated `game`.
     */
    updateGame(_: any, args: { id: string; game: EditGameInput }): Promise<Game> {
      return dbAdapter.updateGame(args.id, args.game);
    },

    /**
     * Adds a new `review` to the `reviews` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `review` data (without `id`).
     * @returns The newly added `review`.
     */
    addReview(_: any, args: { review: AddReviewInput }): Promise<Review> {
      return dbAdapter.addReview(args.review);
    },

    /**
     * Deletes a `review` by `id` from the `reviews` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `review` to delete.
     * @returns The `id` of the deleted `review`.
     */
    deleteReview(_: any, args: { id: string; }): Promise<string> {
      return dbAdapter.deleteReview(args.id);
    },

    /**
     * Updates an existing `review` in the `reviews` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `review` to update and the updated `review` data.
     * @returns The updated `review`.
     */
    updateReview(_: any, args: { id: string; review: EditReviewInput }): Promise<Review> {
      return dbAdapter.updateReview(args.id, args.review);
    }
  },

  Game: {
    /**
     * Resolves the `reviews` for a specific `game`.
     *
     * @param game - The `game` object.
     * @returns An array of `reviews` for the specified `game`.
     */
    reviews(game: Game): Review[] {
      return data.reviews.filter(r => r.game_id === game.id);
    }
  },

  Author: {
    /**
     * Resolves the `reviews` written by a specific `author`.
     *
     * @param author - The `author` object.
     * @returns An array of `reviews` written by the specified `author`.
     */
    reviews(author: Author): Review[] {
      return data.reviews.filter(r => r.author_id === author.id);
    }
  },

  Review: {
    /**
     * Resolves the `author` of a specific `review`.
     *
     * @param review - The `review` object.
     * @returns The `author` of the specified `review`.
     */
    author(review: Review): Promise<Author> {
      return dbAdapter.fetchAuthor(review.author_id);
    },

    /**
     * Resolves the `game` of a specific `review`.
     *
     * @param review - The `review` object.
     * @returns The `game` of the specified `review`.
     */
    game(review: Review): Promise<Game> {
      return dbAdapter.fetchGame(review.game_id);
    }
  }
}

export default resolvers;
