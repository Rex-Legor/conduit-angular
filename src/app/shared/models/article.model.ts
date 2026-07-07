import { UserProfile } from './user.model';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: UserProfile;
}

export interface ArticleQueryParams {
  tag: string;
  author: string;
  favorited: string;
  limit: number;
  offset: number;
}
