import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getArticlePageHasMore,
  getArticlePageIsLoading,
  getArticlePageLimit,
  getArticlePageNum,
} from '../../selectors/getArticlesPage';
import { articlePageActions } from '../../slices/ArticlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlePage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlePage/fetchNextArticlePage ',
  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;
    const hasMore = getArticlePageHasMore(getState());
    const limit = getArticlePageLimit(getState());
    const page = getArticlePageNum(getState());
    const isLoading = getArticlePageIsLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(articlePageActions.setPage(page + 1));
      dispatch(fetchArticlesList({ page: page + 1 }));
    }
  },
);
