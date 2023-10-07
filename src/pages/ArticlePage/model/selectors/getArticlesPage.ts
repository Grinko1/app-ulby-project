import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const getArticlePageView = (state: StateSchema) => state.articlesPage?.view || ArticleView.SMALL;

export const getArticlePageError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlePageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading;

//pagination

export const getArticlePageNum = (state: StateSchema) => state.articlesPage?.page || 1;
export const getArticlePageLimit = (state: StateSchema) => state.articlesPage?.limit || 9;
export const getArticlePageHasMore = (state: StateSchema) => state.articlesPage?.hasMore || true;
