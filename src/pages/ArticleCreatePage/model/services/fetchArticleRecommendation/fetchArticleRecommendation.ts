
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';


export const fetchArticleRecommendation = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  'articleDetailsPage/fetchArticleRecommendation',
  async (args, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;


    try {
      const response = await extra.api.get<Article[]>(`/articles`, {
        params: {
          _expand: 'user',
          _limit:4
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
