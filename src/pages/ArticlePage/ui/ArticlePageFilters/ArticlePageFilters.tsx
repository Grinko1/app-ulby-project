import { memo, useCallback, useMemo } from 'react';
import style from './ArticlePageFilters.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  ArticleSortField,
  ArticleSortSelector,
  ArticleView,
  ArticleViewSelector,
} from 'entities/Article';
import { articlePageActions } from 'pages/ArticlePage/model/slices/ArticlePageSlice';
import { useSelector } from 'react-redux';
import {
  getArticleOrder,
  getArticlePageView,
  getArticleSearch,
  getArticleSort,
} from 'pages/ArticlePage/model/selectors/getArticlesPage';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { SortOrder } from 'shared/types';
import { fetchArticlesList } from 'pages/ArticlePage/model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article/model/types/article';

interface ArticlePageFiltersProps {
  className?: string;
}

export const ArticlePageFilters = memo(({ className }: ArticlePageFiltersProps) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const sort = useSelector(getArticleSort);
  const order = useSelector(getArticleOrder);
  const search = useSelector(getArticleSearch);
  const view = useSelector(getArticlePageView);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, []);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageActions.setView(view));
      dispatch(articlePageActions.setPage(1));
    },
    [view],
  );
  const onChangeOrder = useCallback(
    (order: SortOrder) => {
      dispatch(articlePageActions.setOrder(order));
      dispatch(articlePageActions.setPage(1));
      fetchData();
    },
    [view, fetchData],
  );
  const onChangeSort = useCallback(
    (sort: ArticleSortField) => {
      dispatch(articlePageActions.setSort(sort));
      dispatch(articlePageActions.setPage(1));
      fetchData();
    },
    [view, fetchData],
  );

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlePageActions.setSearch(search));
      dispatch(articlePageActions.setPage(1));
      debouncedFetchData();
    },
    [view, fetchData],
  );

  const tabs = useMemo<TabItem[]>(() => {

    return [
      {
        value: ArticleType.ECONOMICS,
        content: t('Экономика'),
      },
      {
        value: ArticleType.IT,
        content: t('Айти'),
      },
      {
        value: ArticleType.SCIENCE,
        content: t('Наука'),
      },
      {
        value: ArticleType.ALL,
        content: t('Все'),
      },
    ];
  }, []);

  return (
    <div className={classNames(style.ArticlePageFilters, {}, [className])}>
      <div className={style.sortWrapper}>
        <ArticleSortSelector
          sort={sort}
          order={order}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
          className={style.order}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={style.search}>
        <Input placeholder={t('Поиск')} value={search} onChange={onChangeSearch} />
      </Card>
      <Tabs tabs={tabs} value={ArticleType.ALL} onTabClick={()=>{}} />
    </div>
  );
});
