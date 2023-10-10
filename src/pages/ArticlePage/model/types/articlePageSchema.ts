import { EntityState } from '@reduxjs/toolkit';
import { ArticleView } from 'entities/Article';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { Article } from 'entities/Comment/model/types/article';
import { SortOrder } from 'shared/types';

export interface ArticlePageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;

  //filter
  view: ArticleView;
  order: SortOrder;
  sort: ArticleSortField;
  search:string;

  //pagination
  page: number;
  limit: number;
  hasMore: boolean;

  _inited?: boolean;
}
