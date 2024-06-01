import { v4 as uuidv4 } from 'uuid';
import data from '../../data/index.js';
import dbAdapter from '../interfaces/dbAdapter';
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
} from '../../types';

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
const addEntity = <T extends Author | Game | Review, A extends AddAuthorInput | AddGameInput | AddReviewInput>(collection: T[], entity: A): T => {
  const newEntity: T = { id: generateId(), ...entity } as unknown as T;
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
const deleteEntity = <T extends Author | Game | Review>(collection: T[], id: string): string => {
  const entityIndex = collection.findIndex(entity => entity.id === id);
  if (entityIndex === -1) {
    throw new Error(`Entity with ID ${id} not found`);
  }
  collection.splice(entityIndex, 1);
  return id;
};

const fetchAllEntities = <T extends Author | Game | Review>(collection: T[]) => {
  return collection;
};

const fetchEntity = <T extends Author | Game | Review>(collection: T[], id: string) => {
  const foundEntity: T = collection.find(e => e.id === id);
  if (!foundEntity) {
    throw new Error(`Entity with ID ${id} not found`);
  }
  return foundEntity;
};

/**
 * Updates an entity in the collection and returns the new collection and updated entity.
 *
 * @param collection
 * @param id
 * @param updates
 */
const updateEntity = <T extends Author | Game | Review, U extends EditAuthorInput | EditGameInput | EditReviewInput>(collection: T[], id: string, updates: U): {
  updatedCollection: T[],
  updatedEntity: T | null
} => {
  let updatedEntity: T | null = null;
  const updatedCollection = collection.map(entity => {
    if (entity.id === id) {
      updatedEntity = { ...entity, ...updates } as T;
      return updatedEntity;
    }
    return entity;
  });

  if (!updatedEntity) {
    throw new Error(`Entity with ID ${id} not found`);
  }

  return { updatedCollection, updatedEntity };
};

export default class FileAdapter implements dbAdapter {
  async addAuthor(author: AddAuthorInput): Promise<Author> {
    return addEntity(data.authors, author);
  }

  async addGame(game: AddGameInput): Promise<Game> {
    return addEntity(data.games, game);
  }

  async addReview(review: AddReviewInput): Promise<Review> {
    return addEntity(data.reviews, review);
  }

  async connect(): Promise<void> {}

  async deleteAuthor(id: string): Promise<string> {
    return deleteEntity(data.authors, id);
  }

  async deleteGame(id: string): Promise<string> {
    return deleteEntity(data.games, id);
  }

  async deleteReview(id: string): Promise<string> {
    return deleteEntity(data.reviews, id);
  }

  async fetchAuthor(id: string): Promise<Author> {
    return fetchEntity(data.authors, id);
  }

  async fetchAuthors(): Promise<Author[]> {
    return fetchAllEntities(data.authors);
  }

  async fetchGame(id: string): Promise<Game> {
    return fetchEntity(data.games, id);
  }

  async fetchGames(): Promise<Game[]> {
    return fetchAllEntities(data.games);
  }

  async fetchReview(id: string): Promise<Review> {
    return fetchEntity(data.reviews, id);
  }

  async fetchReviews(): Promise<Review[]> {
    return fetchAllEntities(data.reviews);
  }

  async fetchReviewsByAuthorId(id: string): Promise<Review[]> {
    return data.reviews.filter(r => r.author_id === id);
  }

  async fetchReviewsByGameId(id: string): Promise<Review[]> {
    return data.reviews.filter(r => r.game_id === id);
  }

  async updateAuthor(id: string, author: EditAuthorInput): Promise<Author> {
    const { updatedCollection, updatedEntity } = updateEntity(data.authors, id, author);
    data.authors = updatedCollection;

    return updatedEntity;
  }

  async updateGame(id: string, game: EditGameInput): Promise<Game> {
    const { updatedCollection, updatedEntity } = updateEntity(data.games, id, game);
    data.games = updatedCollection;

    return updatedEntity;
  }

  async updateReview(id: string, review: EditReviewInput): Promise<Review> {
    const { updatedCollection, updatedEntity } = updateEntity(data.reviews, id, review);
    data.reviews = updatedCollection;

    return updatedEntity;
  }
}
