import { memo, useCallback } from 'react';
import style from './ArticleListItem.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleBlockType, ArticleTextBlock, ArticleView } from 'entities/Article/model/types/article';
import { Text } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view?: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
   const { className, article, view=ArticleView.BIG } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id);
    }, [article.id, navigate]);

    const types = <Text text={article.type.join(', ')} className={style.types} />;
    const views = (
        <>
            <Text text={String(article.views)} className={style.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div className={classNames(style.ArticleListItem, {}, [className, style[view]])}>
                <Card className={style.card}>
                    <div className={style.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={style.username} />
                        <Text text={article.createdAt} className={style.date} />
                    </div>
                    <Text title={article.title} className={style.title} />
                    {types}
                    <img src={article.img} className={style.img} alt={article.title} />
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={style.textBlock} />
                    )}
                    <div className={style.footer}>
                        <Button onClick={onOpenArticle} theme={ButtonTheme.OUTLINE}>
                            {t('Читать далее...')}
                        </Button>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className={classNames(style.ArticleListItem, {}, [className, style[view]])}>
            <Card className={style.card} onClick={onOpenArticle}>
                <div className={style.imageWrapper}>
                    <img alt={article.title} src={article.img} className={style.img} />
                    <Text text={article.createdAt} className={style.date} />
                </div>
                <div className={style.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={style.title} />
            </Card>
        </div>
    );
});
