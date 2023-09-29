import { memo } from 'react';
import style from './ArticleTextBlockComponent.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleTextBlock } from 'entities/Article/model/types/article';
import { Text } from 'shared/ui/Text/Text';

interface ArticleTextBlockComponentProps {
    className?: string;
    block:ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(({ className, block }: ArticleTextBlockComponentProps) => {
  return (
    <div className={classNames(style.ArticleTextBlockComponent, {}, [className])}>
        {block.title && (
          <Text title={block.title} className={style.title}/>
        )}
        {block.paragraphs.map((item,index) =>(
          <Text key={index} text={item} className={style.paragraph} />
        ))}
    </div>
  );
});