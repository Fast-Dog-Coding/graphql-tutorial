// Types
export interface Author {
  id: string;
  name: string;
  verified: boolean;
}

export interface Game {
  id: string;
  title: string;
  platform: string[];
}

export interface Review {
  id: string;
  rating: number;
  content: string;
  author_id: string;
  game_id: string;
}

// Inputs
export interface AddAuthorInput {
  name: string;
  verified: boolean;
}

export interface AddGameInput {
  title: string;
  platform: string[];
}

export interface AddReviewInput {
  rating: number;
  content: string;
  author_id: string;
  game_id: string;
}

export interface EditAuthorInput {
  name?: string;
  verified?: boolean;
}

export interface EditGameInput {
  title?: string;
  platform?: string[];
}

export interface EditReviewInput {
  rating?: number;
  content?: string;
  author_id?: string;
  game_id?: string;
}
