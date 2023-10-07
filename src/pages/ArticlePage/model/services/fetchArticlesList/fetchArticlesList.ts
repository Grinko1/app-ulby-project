import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlePageLimit } from '../../selectors/getArticlesPage';

interface FetchArticlesListProps {
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlePage/fetchArticlesList', async (args, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  const { page =1 } = args;
const limit = getArticlePageLimit(getState())
  try {
    const response = await extra.api.get<Article[]>(`/articles`, {
      params: {
        _expand: 'user',
        _limit: limit,
        _page:page
      },
    });

    if (!response.data) {
      throw new Error('No data');
    }
    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
