import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleDetailsSchema } from '../types/ArticleDetailsSchema';
import { Article } from '../types/article';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';

const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: '',
  data: undefined,
};

export const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Article>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleDeatilsActions } = articleDetailsSlice;
export const { reducer: articleDeatilsReducer } = articleDetailsSlice;
