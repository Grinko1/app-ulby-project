import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import style from './ArticleDetails.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { articleDeatilsReducer } from 'entities/Article/model/slice/ArticleDetailsSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { memo, useCallback, useEffect } from 'react';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById';
import { useSelector } from 'react-redux';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from 'entities/Article/model/selectors/articleDetails';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import EyeSvg from 'shared/assets/icons/eye.svg';
import CalendarSvg from 'shared/assets/icons/calendar.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleBlock, ArticleBlockType } from 'entities/Article/model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const reducers: ReducersList = {
    articleDetails: articleDeatilsReducer,
  };

  const { t } = useTranslation();
  const dispath = useAppDispatch();
  useEffect(() => {
    if(__PROJECT__ !== 'storybook'){
       dispath(fetchArticleById(id));
    }
   
  }, [id]);

  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);
  const article = useSelector(getArticleDetailsData);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent key={block.id} block={block} className={style.block} />;
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent key={block.id} block={block} className={style.block} />;
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent key={block.id} className={style.block} block={block} />;
      default:
        return null;
    }
  }, []);
  let content;
  if (isLoading) {
    content = (
      <>
        <Skeleton className={style.avatar} width={200} height={200} border='50%' />
        <Skeleton className={style.title} width={300} height={32} />
        <Skeleton className={style.skeleton} width={600} height={24} />
        <Skeleton className={style.skeleton} width='100%' height={200} />
        <Skeleton className={style.skeleton} width='100%' height={200} />
      </>
    );
  } else if (error) {
    content = <Text align={TextAlign.CENTER} title={t('Произошла ошибка')}></Text>;
  } else {
    content = (
      <>
        <div className={style.avatarWrapper}>
          <Avatar size={200} src={article?.img} className={style.avatar} />
        </div>
        <Text
          className={style.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <div className={style.articleInfo}>
          <Icon className={style.icon} Svg={EyeSvg} />
          <Text text={String(article?.views)} />
        </div>
        <div className={style.articleInfo}>
          <Icon className={style.icon} Svg={CalendarSvg} />
          <Text text={article?.createdAt} />
        </div>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      {content}
    </DynamicModuleLoader>
  );
});
