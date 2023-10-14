import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article, ArticleType } from 'entities/Article';
import {
  getArticleOrder,
  getArticlePageLimit,
  getArticlePageNum,
  getArticlePageType,
  getArticleSearch,
  getArticleSort,
} from '../../selectors/getArticlesPage';
import { addQuaryParams } from 'shared/lib/addQuaryParams/addQuaryParams';

interface fetchArticlesListProps {
  replace?:boolean
}

export const fetchArticlesList = createAsyncThunk<Article[], fetchArticlesListProps, ThunkConfig<string>>(
  'articlePage/fetchArticlesList',
  async (args, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const limit = getArticlePageLimit(getState());
    const sort = getArticleSort(getState());
    const search = getArticleSearch(getState());
    const order = getArticleOrder(getState());
    const page = getArticlePageNum(getState());
    const type = getArticlePageType(getState())

    try {
     addQuaryParams({sort, order, search, type})
      const response = await extra.api.get<Article[]>(`/articles`, {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          type: type ===  ArticleType.ALL ? undefined : type,

          q: search,
        },
      });

      if (!response.data || response.data.length === 0) {
        throw new Error('No data');
      }
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
