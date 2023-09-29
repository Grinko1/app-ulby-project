import { memo } from 'react';
import style from './ArticleImageBlockComponent.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleImageBlock } from 'entities/Article/model/types/article';
import { Text, TextAlign } from 'shared/ui/Text/Text';

interface ArticleImageBlockComponentProps {
    className?: string;
    block:ArticleImageBlock
}

export const ArticleImageBlockComponent = memo(({ className, block }: ArticleImageBlockComponentProps) => {
  return (
    <div className={classNames(style.ArticleImageBlockComponent, {}, [className])}>
        <img src={block.src} className={style.img}/>
        {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
    </div>
  );
});