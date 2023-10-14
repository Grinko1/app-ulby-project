import { memo, useCallback } from 'react';
import style from './ArticleDetailsPageHeader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCanEditArticle } from 'pages/ArticleDetailPage/model/selectors/article';
import { getArticleDetailsData } from 'entities/Article';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(({ className }: ArticleDetailsPageHeaderProps) => {


  const { t } = useTranslation('article');

  const canEdit = useSelector(getCanEditArticle)
  const article = useSelector(getArticleDetailsData)

  console.log(article)
  const navigate = useNavigate();

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, []);
  const onEdit = useCallback(()=>{
    navigate(RoutePath.article_details + article?.id + '/edit')
  },[article])
  return (
    <div className={classNames(style.ArticleDetailsPageHeader, {}, [className])}>
      <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
        {t('Назад к списку')}
      </Button>

       {canEdit &&  <Button className={style.editBtn} theme={ButtonTheme.OUTLINE} onClick={onEdit}>
        {t('Редактировать')}
      </Button>}
    </div>
  );
});
