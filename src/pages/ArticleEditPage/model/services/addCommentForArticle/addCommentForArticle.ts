import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';
import { fetchCommentByArticleId } from '../fetchCommentByArticleId/fetchCommentByArticleId';


export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
  'articleDetails/addCommentForArticle',
  async (text, thunkApi) => {
    const { extra, rejectWithValue, getState , dispatch} = thunkApi;
    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
      return rejectWithValue('error no data');
    }
    try {
      const response = await extra.api.post<Comment>('/comments', {
        articleId:article?.id,
        text,
        userId: userData.id,
      });
      if (!response.data) {
        throw new Error();
      }
      dispatch(fetchCommentByArticleId(article.id))
      return response.data;
    } catch (e) {
      return rejectWithValue('failed add comment');
    }
  },
);
