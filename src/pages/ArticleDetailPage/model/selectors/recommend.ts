import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsRecommendIsLoading = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations.isLoading;
export const getArticleDetailsRecommendError = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations?.error;
