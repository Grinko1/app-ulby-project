import { memo } from 'react';
import style from './ArticleListItem.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from 'entities/Article/model/types/article';
import { Text } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { useHover, UseHoverBind } from 'shared/lib/hooks/useHover/useHover';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view?: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view = ArticleView.SMALL } = props;



  if (view === ArticleView.BIG) {
    return (
      <div className={classNames(style.ArticleListItem, {}, [className, style[view]])}>
        {article.title}
      </div>
    );
  }
  return (
    <div className={classNames(style.ArticleListItem, {}, [className, style[view]])}>
      {/* <div className={style.card}> */}
      <Card>
        <div className={style.imageWrapper}>
          <img src={article.img} alt='' className={style.img} />
          <Text text={article.createdAt} className={style.date} />
        </div>
        <div className={style.infoWrapper}>
          <Text text={article.type.join(', ')} className={style.types} />
          <Text text={String(article.views)} className={style.views} />
          <Icon Svg={EyeIcon} />
        </div>
        <Text text={article.title} className={style.title} />
      {/* </div> */}
      </Card>
    </div>
  );
});
