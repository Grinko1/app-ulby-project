import { memo } from 'react';
import style from './ArticleCodeBlockComponent.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleCodeBlock } from 'entities/Article/model/types/article';
import { Code } from 'shared/ui/Code/Code';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block:ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo(({ className , block}: ArticleCodeBlockComponentProps) => {
  return (
    <div className={classNames(style.ArticleCodeBlockComponent, {}, [className])}>
       <Code text={block.code} /> 
        
    
    </div>
  );
});