import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getArticlePageError,
  getArticlePageHasMore,
  getArticlePageIsLoading,
  getArticlePageNum,
} from '../../selectors/getArticlesPage';
import { articlePageActions } from '../../slices/ArticlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlePage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlePage/fetchNextArticlePage ',
  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;
    const hasMore = getArticlePageHasMore(getState());
    const page = getArticlePageNum(getState());
    const isLoading = getArticlePageIsLoading(getState());
     const error = getArticlePageError(getState());

    if (hasMore && !isLoading && !error) {
      dispatch(articlePageActions.setPage(page + 1));

      dispatch(fetchArticlesList({}));
    }
  },
);
