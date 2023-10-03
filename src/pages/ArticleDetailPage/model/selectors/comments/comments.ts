import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsCommentsIsLoading = (state: StateSchema) =>
  state.articleDetailsComment?.isLoading;
export const getArticleDetailsCommentsError = (state: StateSchema) =>
  state.articleDetailsComment?.error;
