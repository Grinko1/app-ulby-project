import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlePageInited } from '../../selectors/getArticlesPage';
import { articlePageActions } from '../../slices/ArticlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlePage/initArticlesPage ',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    const inited = getArticlePageInited(getState());

    if (!inited) {
      dispatch(articlePageActions.initState());
      dispatch(fetchArticlesList({ page: 1 }));
    }
  },
);
