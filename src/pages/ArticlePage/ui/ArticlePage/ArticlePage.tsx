import { useTranslation } from 'react-i18next';
import style from './ArticlePage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
// @ts-ignore
import {
  articlePageActions,
  articlePageReducer,
  getArticles,
} from '../../model/slices/ArticlePageSlice';
import { useInitialEffect } from '../../../../shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticlesList } from 'pages/ArticlePage/model/services/fetchArticlesList/fetchArticlesList';
import { useSelector } from 'react-redux';
import {
  getArticlePageError,
  getArticlePageHasMore,
  getArticlePageIsLoading,
  getArticlePageNum,
  getArticlePageView,
} from 'pages/ArticlePage/model/selectors/getArticlesPage';
import { Page } from 'shared/ui/Page/Page';
import { fetchNextArticlePage } from 'pages/ArticlePage/model/services/fetchNextArticlePage/fetchNextArticlePage';

interface ArticlePageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlePageReducer,
};

const ArticlePage = ({ className }: ArticlePageProps) => {
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticlePageIsLoading);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlePage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(articlePageActions.initState());
    dispatch(fetchArticlesList({ page: 1 }));
  });
  const articles = useSelector(getArticles.selectAll);

  const error = useSelector(getArticlePageError);
  const view = useSelector(getArticlePageView);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageActions.setView(view));
    },
    [view],
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(style.ArticlePage, {}, [className])} onScrollEnd={onLoadNextPart}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList isLoading={isLoading} articles={articles} view={view} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlePage);
