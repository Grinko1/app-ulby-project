import style from './ArticlePage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articlePageActions,
  articlePageReducer,
  getArticles,
} from '../../model/slices/ArticlePageSlice';
import { useInitialEffect } from '../../../../shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getArticlePageHasMore,
  getArticlePageIsLoading,
  getArticlePageView,
} from 'pages/ArticlePage/model/selectors/getArticlesPage';
import { Page } from 'widgets/Page/Page';
import { fetchNextArticlePage } from 'pages/ArticlePage/model/services/fetchNextArticlePage/fetchNextArticlePage';
import { initArticlesPage } from 'pages/ArticlePage/model/services/initArticlesPage/initArticlesPage';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';
import { useSearchParams } from 'react-router-dom';

interface ArticlePageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlePageReducer,
};

const ArticlePage = ({ className }: ArticlePageProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticlePageIsLoading);

  const [searchParams] = useSearchParams()


  const onLoadNextPart = useCallback(() => {
    if(!isLoading)
    dispatch(fetchNextArticlePage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  const articles = useSelector(getArticles.selectAll);
  const view = useSelector(getArticlePageView);




  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page className={classNames(style.ArticlePage, {}, [className])} onScrollEnd={onLoadNextPart}>
        <ArticlePageFilters />

        <ArticleList isLoading={isLoading} articles={articles} view={view} className={style.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlePage);
