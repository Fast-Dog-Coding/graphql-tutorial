import { Author, BaseEntity, Game, Review } from '../types';
import data from '../data/index.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates and returns unique ID
 */
const generateId = (): string => uuidv4();

/**
 * Adds an entity to the collection.
 *
 * @param collection
 * @param entity
 * @return The new entity
 */
const addEntity = <T extends BaseEntity>(collection: T[], entity: Omit<T, 'id'>): T => {
  const newEntity: T = { id: generateId(), ...entity } as T;
  collection.push(newEntity);

  return newEntity;
};

/**
 * Removes an entity from the collection and returns the new collection.
 *
 * @param collection
 * @param id
 * @return The new collection
 */
const deleteEntity = <T extends BaseEntity>(collection: T[], id: string): T[] => {
  const entityIndex = collection.findIndex(item => item.id === id);
  if (entityIndex === -1) {
    throw new Error(`Entity with ID ${id} not found`);
  }
  collection.splice(entityIndex, 1);
  return collection;
};

/**
 * Updates an entity in the collection and returns the new collection and updated entity.
 *
 * @param collection
 * @param id
 * @param updates
 */
const updateEntity = <T extends BaseEntity>(collection: T[], id: string, updates: Partial<Omit<T, 'id'>>): {
  updatedCollection: T[],
  updatedEntity: T | null
} => {
  let updatedEntity: T | null = null;
  const updatedCollection = collection.map(item => {
    if (item.id === id) {
      updatedEntity = { ...item, ...updates } as T;
      return updatedEntity;
    }
    return item;
  });
  if (!updatedEntity) {
    throw new Error(`Entity with ID ${id} not found`);
  }
  return { updatedCollection, updatedEntity };
};

const resolvers = {
  Query: {
    /**
     * Retrieves the list of all `authors`.
     *
     * @returns An array of `authors`.
     */
    authors(): Author[] {
      return data.authors;
    },

    /**
     * Retrieves a specific `author` by `id`.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `author` to retrieve.
     * @returns The `author` with the specified `id`.
     */
    author(_: any, args: { id: string; }): Author {
      const foundAuthor: Author = data.authors.find(a => a.id === args.id);
      if (!foundAuthor) {
        throw new Error(`Author with ID ${args.id} not found`);
      }
      return foundAuthor;
    },

    /**
     * Retrieves the list of all `games`.
     *
     * @returns An array of `games`.
     */
    games(): Game[] {
      return data.games;
    },

    /**
     * Retrieves a specific `game` by `id`.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `game` to retrieve.
     * @returns The `game` with the specified `id`.
     */
    game(_: any, args: { id: string; }): Game {
      const foundGame: Game = data.games.find(g => g.id === args.id);
      if (!foundGame) {
        throw new Error(`Game with ID ${args.id} not found`);
      }
      return foundGame;
    },

    /**
     * Retrieves the list of all `reviews`.
     *
     * @returns An array of `reviews`.
     */
    reviews(): Review[] {
      return data.reviews;
    },

    /**
     * Retrieves a specific review by id.
     * @param _ - Unused parent argument.
     * @param args - Arguments containing the id of the review to retrieve.
     * @returns The review with the specified id.
     */
    review(_: any, args: { id: string; }): Review {
      const foundReview: Review = data.reviews.find(g => g.id === args.id);
      if (!foundReview) {
        throw new Error(`Review with ID ${args.id} not found`);
      }
      return foundReview;
    },
  },

  Mutation: {
    /**
     * Adds a new `author` to the `authors` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `author` data (without `id`).
     * @returns The newly added `author`.
     */
    addAuthor(_: any, args: { author: Omit<Author, 'id'> }): Author {
      return addEntity(data.authors, args.author);
    },

    /**
     * Deletes an `author` by `id` from the `authors` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `author` to delete.
     * @returns The updated `authors` collection.
     */
    deleteAuthor(_: any, args: { id: string; }): Author[] {
      data.authors = deleteEntity(data.authors, args.id);
      return data.authors;
    },

    /**
     * Updates an existing `author` in the `authors` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `author` to update and the updated `author` data.
     * @returns The updated `author`.
     */
    updateAuthor(_: any, args: { id: string; author: Partial<Omit<Author, 'id'>> }): Author {
      const { updatedCollection, updatedEntity } = updateEntity(data.authors, args.id, args.author);
      data.authors = updatedCollection;
      return updatedEntity;
    },

    /**
     * Adds a new `game` to the `games` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `game` data (without `id`).
     * @returns The newly added `game`.
     */
    addGame(_: any, args: { game: Omit<Game, 'id'> }): Game {
      return addEntity(data.games, args.game);
    },

    /**
     * Deletes a `game` by `id` from the `games` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `game` to delete.
     * @returns The updated `games` collection.
     */
    deleteGame(_: any, args: { id: string; }): Game[] {
      data.games = deleteEntity(data.games, args.id);
      return data.games;
    },

    /**
     * Updates an existing `game` in the `games` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `game` to update and the updated `game` data.
     * @returns The updated `game`.
     */
    updateGame(_: any, args: { id: string; game: Partial<Omit<Game, 'id'>> }): Game {
      const { updatedCollection, updatedEntity } = updateEntity(data.games, args.id, args.game);
      data.games = updatedCollection;
      return updatedEntity;
    },

    /**
     * Adds a new `review` to the `reviews` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `review` data (without `id`).
     * @returns The newly added `review`.
     */
    addReview(_: any, args: { review: Omit<Review, 'id'> }): Review {
      return addEntity(data.reviews, args.review);
    },

    /**
     * Deletes a `review` by `id` from the `reviews` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `review` to delete.
     * @returns The updated `reviews` collection.
     */
    deleteReview(_: any, args: { id: string; }): Review[] {
      data.reviews = deleteEntity(data.reviews, args.id);
      return data.reviews;
    },

    /**
     * Updates an existing `review` in the `reviews` collection.
     *
     * @param _ - Unused `parent` argument.
     * @param args - Arguments containing the `id` of the `review` to update and the updated `review` data.
     * @returns The updated `review`.
     */
    updateReview(_: any, args: { id: string; review: Partial<Omit<Review, 'id'>> }): Review {
      const { updatedCollection, updatedEntity } = updateEntity(data.reviews, args.id, args.review);
      data.reviews = updatedCollection;
      return updatedEntity;
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
    author(review: Review): Author {
      return data.authors.find(a => a.id === review.author_id);
    },

    /**
     * Resolves the `game` of a specific `review`.
     *
     * @param review - The `review` object.
     * @returns The `game` of the specified `review`.
     */
    game(review: Review): Game {
      return data.games.find(g => g.id === review.game_id);
    }
  }
}

export default resolvers;
