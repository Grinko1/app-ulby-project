import { useTranslation } from 'react-i18next';
import style from './ArticleDetailsPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articleDetailsCommentReducer,
  getArticleComments,
} from 'pages/ArticleDetailPage/model/slices/ArticleDetailsCommentSlice';
import { useSelector } from 'react-redux';
import {
  getArticleDetailsCommentsError,
  getArticleDetailsCommentsIsLoading,
} from 'pages/ArticleDetailPage/model/selectors/comments/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCommentByArticleId } from 'pages/ArticleDetailPage/model/services/fetchCommentByArticleId/fetchCommentByArticleId';

const reducers: ReducersList = {
  articleDetailsComment: articleDetailsCommentReducer,
};

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article');
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
  const commentsError = useSelector(getArticleDetailsCommentsError);

  const dispatch = useAppDispatch();
  useInitialEffect(() => {
    dispatch(fetchCommentByArticleId(id));
  });

  if (!id) {
    return (
      <div className={classNames(style.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    );
  }
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(style.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text title={t('Комментарии')} className={style.commentTitle} />
        <CommentList className={style.comment} comments={comments} isLoading={commentsIsLoading} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
