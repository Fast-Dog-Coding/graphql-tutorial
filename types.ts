export interface BaseEntity {
  id: string;
}

export interface Game extends BaseEntity {
  title: string;
  platform: string[];
}

export interface Author extends BaseEntity {
  name: string;
  verified: boolean;
}

export interface Review extends BaseEntity {
  rating: number;
  content: string;
  author_id: string;
  game_id: string;
}
