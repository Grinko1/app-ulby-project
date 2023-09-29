import { memo } from 'react';
import style from './Icon.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const Icon = memo(({ className , Svg}: IconProps) => {
  return (
    <Svg className={classNames(style.Icon, {}, [className])}/>
 
  );
});