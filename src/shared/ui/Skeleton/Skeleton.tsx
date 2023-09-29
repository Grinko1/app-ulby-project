import { CSSProperties, memo } from 'react';
import style from './Skeleton.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface SkeletonProps {
    className?: string;
    height?:string | number
    width?:string | number
    border?:string
}

export const Skeleton = (props: SkeletonProps) => {
    const { className , height, width, border} = props
    const styles:CSSProperties = {
        width,
        height,
        borderRadius:border
    }
  return (
    <div className={classNames(style.Skeleton, {}, [className])} style={styles}>
    </div>
  );
};