import { Children, HTMLAttributes, ReactNode, memo } from 'react';
import style from './Card.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
}

export const Card = memo(({ className, children, theme = CardTheme.NORMAL, ...otherProps }: CardProps) => {
  return (
    <div className={classNames(style.Card, {}, [className, style[theme]])} {...otherProps}>
      {children}
    </div>
  );
});
