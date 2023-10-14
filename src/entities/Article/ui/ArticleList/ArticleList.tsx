import { HTMLAttributeAnchorTarget, memo } from 'react';
import style from './ArticleList.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from 'entities/Article/model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => <ArticleListItemSkeleton view={view} key={index} />);
};

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view = ArticleView.SMALL, target } = props;

  const {t} =useTranslation('article')
  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem
        key={article.id}
        article={article}
        view={view}
        className={style.ArticleList}
        target={target}
      />
    );
  };
  if(!isLoading && !articles.length){
    return (
        <div className={classNames(style.ArticleList, {}, [className, style[view]])}>
          <Text title={t('Статьи не найдены')} size={TextSize.L} />
        </div>
    )
      
  }
  return (
    <div className={classNames(style.ArticleList, {}, [className, style[view]])}>
      {!!articles.length ? articles.map(renderArticle) : null}
       { isLoading&& getSkeletons(view)}
    </div>
  );
});
