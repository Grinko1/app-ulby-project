import { Children, HTMLAttributes, ReactNode, memo } from 'react';
import style from './Card.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface CardProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
    children:ReactNode
}

export const Card = memo(({ className,children, ...otherProps }: CardProps) => {
  return (
    <div className={classNames(style.Card, {}, [className])} {...otherProps}>
        {children}
    </div>
  );
});