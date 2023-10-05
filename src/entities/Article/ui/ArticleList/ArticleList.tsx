import { memo } from 'react';
import style from './ArticleList.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from 'entities/Article/model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view = ArticleView.SMALL } = props;

  const renderArticle = (article: Article) => {
    return <ArticleListItem key={article.id} article={article} view={view} />;
  };
  return (
    <div className={classNames(style.ArticleList, {}, [className])}>
      {!!articles.length ? articles.map(renderArticle) : null}
    </div>
  );
});
