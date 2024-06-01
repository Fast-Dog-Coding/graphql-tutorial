import mongoose, { Document, Model, Schema } from 'mongoose';
import dbAdapter from '../interfaces/dbAdapter';
import {
  AddAuthorInput,
  AddGameInput,
  AddReviewInput,
  Author,
  EditAuthorInput,
  EditGameInput, EditReviewInput,
  Game,
  Review
} from '../../types';

interface BaseDocument extends Document {
  id: string;
}

interface AuthorDocument extends Author, BaseDocument {}
interface GameDocument extends Game, BaseDocument {}
interface ReviewDocument extends Review, BaseDocument {}

export default class MongoAdapter implements dbAdapter {
  private AuthorModel: Model<AuthorDocument>;
  private GameModel: Model<GameDocument>;
  private ReviewModel: Model<ReviewDocument>;

  constructor() {
    this.AuthorModel = this._createAuthorModel();
    this.GameModel = this._createGameModel();
    this.ReviewModel = this._createReviewModel();
  }

  _createAuthorModel() {
    const AuthorSchema: Schema = new Schema({
      name: { type: String, required: true },
      verified: { type: Boolean, required: true },
    });

    return mongoose.model<AuthorDocument>('Author', AuthorSchema);
  }

  _createGameModel() {
    const GameSchema: Schema = new Schema({
      title: { type: String, required: true },
      platform: { type: [String], required: true },
    });

    return mongoose.model<GameDocument>('Game', GameSchema);
  }

  _createReviewModel() {
    const ReviewSchema: Schema = new Schema({
      rating: { type: Number, required: true },
      content: { type: String, required: true },
      author_id: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
      game_id: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    });

    return mongoose.model<ReviewDocument>('Review', ReviewSchema);
  }

  async addAuthor(author: AddAuthorInput): Promise<Author> {
    return undefined;
  }

  async addGame(game: AddGameInput): Promise<Game> {
    return undefined;
  }

  async addReview(review: AddReviewInput): Promise<Review> {
    return Promise.resolve(undefined);
  }

  async connect(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async deleteAuthor(id: string): Promise<string> {
    return Promise.resolve('');
  }

  async deleteGame(id: string): Promise<string> {
    return Promise.resolve('');
  }

  deleteReview(id: string): Promise<string> {
    return Promise.resolve('');
  }

  fetchAuthor(id: string): Promise<Author> {
    return Promise.resolve(undefined);
  }

  fetchAuthors(): Promise<Author[]> {
    return Promise.resolve([]);
  }

  fetchGame(id: string): Promise<Game> {
    return Promise.resolve(undefined);
  }

  fetchGames(): Promise<Game[]> {
    return Promise.resolve([]);
  }

  fetchReview(id: string): Promise<Review> {
    return Promise.resolve(undefined);
  }

  fetchReviews(): Promise<Review[]> {
    return Promise.resolve([]);
  }

  fetchReviewsByAuthorId(id: string): Promise<Review[]> {
    return Promise.resolve([]);
  }

  fetchReviewsByGameId(id: string): Promise<Review[]> {
    return Promise.resolve([]);
  }

  updateAuthor(id: string, author: EditAuthorInput): Promise<Author> {
    return Promise.resolve(undefined);
  }

  updateGame(id: string, game: EditGameInput): Promise<Game> {
    return Promise.resolve(undefined);
  }

  updateReview(id: string, review: EditReviewInput): Promise<Review> {
    return Promise.resolve(undefined);
  }
}
