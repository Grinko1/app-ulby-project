import { memo } from 'react';
import style from './ArticleCreatePage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface ArticleCreatePageProps {
    className?: string;
}

 const ArticleCreatePage = memo(({ className }: ArticleCreatePageProps) => {
  return (
    <div className={classNames(style.ArticleCreatePage, {}, [className])}>
    </div>
  );
});

export default ArticleCreatePage