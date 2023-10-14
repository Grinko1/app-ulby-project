import { useTranslation } from 'react-i18next';
import style from './ArticleDetailsPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { Text, TextSize } from 'shared/ui/Text/Text';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getArticleComments } from 'pages/ArticleDetailPage/model/slices/ArticleDetailsCommentSlice';
import { useSelector } from 'react-redux';
import {
  getArticleDetailsCommentsError,
  getArticleDetailsCommentsIsLoading,
} from 'pages/ArticleDetailPage/model/selectors/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCommentByArticleId } from 'pages/ArticleDetailPage/model/services/fetchCommentByArticleId/fetchCommentByArticleId';
import { AddCommentForm } from 'features/addNewComment';
import { addCommentForArticle } from 'pages/ArticleDetailPage/model/services/addCommentForArticle/addCommentForArticle';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';
import { getArticleRecommendations } from 'pages/ArticleDetailPage/model/slices/ArticleDetailsRecommendSlice';
import {
  getArticleDetailsRecommendError,
  getArticleDetailsRecommendIsLoading,
} from 'pages/ArticleDetailPage/model/selectors/recommend';
import { fetchArticleRecommendation } from 'pages/ArticleDetailPage/model/services/fetchArticleRecommendation/fetchArticleRecommendation';
import { articleDetailsPageReducer } from 'pages/ArticleDetailPage/model/slices';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader/ArticleDetailsPageHeader';

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article');
  const { id } = useParams<{ id: string }>();
  //comments
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
  const commentsError = useSelector(getArticleDetailsCommentsError);

  //recommendations
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(getArticleDetailsRecommendIsLoading);
  const recommendationsError = useSelector(getArticleDetailsRecommendError);


  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(fetchCommentByArticleId(id));
    dispatch(fetchArticleRecommendation());
  });

  const onSentComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
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
     <ArticleDetailsPageHeader/>
        <ArticleDetails id={id} />
        <Text title={t('Рекоммендуем')} className={style.recommendTitle} size={TextSize.L} />
        <ArticleList
          target='_blank'
          articles={recommendations}
          isLoading={recommendationsIsLoading}
          className={style.recommendations}
        />
        <Text title={t('Комментарии')} className={style.commentTitle} size={TextSize.L} />
        <AddCommentForm onSentComment={onSentComment} />
        <CommentList className={style.comment} comments={comments} isLoading={commentsIsLoading} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
