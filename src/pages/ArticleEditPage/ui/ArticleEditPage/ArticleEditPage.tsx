import { memo } from 'react';
import style from './ArticleEditPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';

interface ArticleEditPageProps {
    className?: string;
}

 const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
  const {id} = useParams()
  const isEdit = Boolean(id)
  return (
    <Page className={classNames(style.ArticleEditPage, {}, [className])}>
      {isEdit ?  'edit': 'create'}
    </Page>
  );
});

export default ArticleEditPage