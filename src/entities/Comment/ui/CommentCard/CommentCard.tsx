import { memo } from 'react';
import style from './CommentCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Comment } from 'entities/Comment/model/types/comment';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';

interface CommentCardProps {
    className?: string;
    comment:Comment;
    isLoading?:boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props
  if(isLoading) {
    return   <div className={classNames(style.CommentCard, {}, [className])}>
         <div className={style.header}>
            <Skeleton width={30} height={30} border='50%'/>
              <Skeleton height={16} width={100}  className={style.username}/>
         </div>
      <Skeleton height={50} className={style.text}/>
    </div>
  }
  return (
    <div className={classNames(style.CommentCard, {}, [className])}>
     <div className={style.header}>
      {comment.user.avatar ?  <Avatar size={30} src={comment.user.avatar}/> : null}
      <Text title={comment.user.username} className={style.username} />
     </div>
    <Text text={comment.text} />
    </div>
  );
});