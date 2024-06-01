import {
  Author,
  Game,
  Review,
  AddAuthorInput,
  AddGameInput,
  AddReviewInput,
  EditAuthorInput,
  EditGameInput,
  EditReviewInput
} from '../../types';

interface DBAdapter {
  connect(): Promise<void>;

  // Author
  addAuthor(author: AddAuthorInput): Promise<Author>;
  deleteAuthor(id: string): Promise<string>;
  fetchAuthor(id: string): Promise<Author>;
  fetchAuthors(): Promise<Author[]>;
  updateAuthor(id: string, author: EditAuthorInput): Promise<Author>;

  // Game
  addGame(game: AddGameInput): Promise<Game>;
  deleteGame(id: string): Promise<string>;
  fetchGame(id: string): Promise<Game>;
  fetchGames(): Promise<Game[]>;
  updateGame(id: string, game: EditGameInput): Promise<Game>

  // Review
  addReview(review: AddReviewInput): Promise<Review>;
  deleteReview(id: string): Promise<string>;
  fetchReview(id: string): Promise<Review>;
  fetchReviews(): Promise<Review[]>;
  fetchReviewsByAuthorId(id: string): Promise<Review[]>;
  fetchReviewsByGameId(id: string): Promise<Review[]>;
  updateReview(id: string, review: EditReviewInput): Promise<Review>;
}

export default DBAdapter;
