import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';


export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  'articlePage/fetchArticlesList',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<Article[]>(`/articles`,{
        params:{
            _expand:'user'
      }});

      if (!response.data) {
        throw new Error('No data');
      }
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
