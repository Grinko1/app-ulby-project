import { useTranslation } from 'react-i18next';
import style from './ArticleDetailsPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';

interface ArticleDetailsPageProps {
    className?: string;
}

 const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const {t} = useTranslation('article')
  return (
    <div className={classNames(style.ArticleDetailsPage, {}, [className])}>
        ArticleDetailsPage
    </div>
  );
};

export default memo(ArticleDetailsPage)