import { useTranslation } from 'react-i18next';
import style from './ArticlePage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';

interface ArticlePageProps {
    className?: string;
}

 const ArticlePage = ({ className }: ArticlePageProps) => {
    const {t} = useTranslation('article')
  return (
    <div className={classNames(style.ArticlePage, {}, [className])}>
        ArticlePage
    </div>
  );
};

export default memo(ArticlePage)