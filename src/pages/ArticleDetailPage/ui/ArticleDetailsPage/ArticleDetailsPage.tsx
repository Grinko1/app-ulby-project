import { useTranslation } from 'react-i18next';
import style from './ArticleDetailsPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
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
import { AddCommentForm } from 'features/addNewComment';
import { addCommentForArticle } from 'pages/ArticleDetailPage/model/services/addCommentForArticle/addCommentForArticle';
import { getCommentFormText } from 'features/addNewComment/model/selectors/getCommentFormState';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';

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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useInitialEffect(() => {
    dispatch(fetchCommentByArticleId(id));
  });

  const onSentComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, []);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, []);

  if (!id) {
    return (
      <div className={classNames(style.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    );
  }
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(style.ArticleDetailsPage, {}, [className])}>
        <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
          {t('Назад к списку')}
        </Button>
        <ArticleDetails id={id} />
        <Text
          title={t('Комментарии')}
          className={style.commentTitle}
        />
        <AddCommentForm onSentComment={onSentComment} />
        <CommentList className={style.comment} comments={comments} isLoading={commentsIsLoading} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
