import { memo } from 'react';
import style from './CommentList.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Comment } from 'entities/Comment/model/types/comment';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { title } from 'process';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation();
  if(isLoading){
    <div className={classNames(style.CommentList, {}, [className, style.loading])}>
      <CommentCard isLoading />
       <CommentCard isLoading />
    </div>
  }
  return (
    <div className={classNames(style.CommentList, {}, [className])}>
      {comments?.length 
      ? comments.map(item => <CommentCard key={item.id} comment={item} isLoading={isLoading} />)
      : <Text title={t('Комментарии отсутствуют')} />}
    </div>
  );
});
