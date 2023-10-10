import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlePageInited } from '../../selectors/getArticlesPage';
import { articlePageActions } from '../../slices/ArticlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { ArticleSortField } from 'entities/Article';
import { SortOrder } from 'shared/types';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  'articlePage/initArticlesPage ',
  async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    const inited = getArticlePageInited(getState());

    if (!inited) {
      const orderFromUrl = searchParams.get('order')  as SortOrder
      const sortFromUrl = searchParams.get('sort') as ArticleSortField
      const searchFromUrl = searchParams.get('search')

      if(orderFromUrl){
        dispatch(articlePageActions.setOrder(orderFromUrl))
      }
       if(sortFromUrl){
        dispatch(articlePageActions.setSort(sortFromUrl ))
      }
       if(searchFromUrl){
        dispatch(articlePageActions.setSearch(searchFromUrl))
      }

      dispatch(articlePageActions.initState());
      dispatch(fetchArticlesList({}));
    }
  },
);
