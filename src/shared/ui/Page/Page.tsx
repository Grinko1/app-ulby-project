import { MutableRefObject, ReactNode, memo, useRef } from 'react';
import style from './Page.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';

interface PageProps {
    className?: string;
    children:ReactNode;
    onScrollEnd?:()=>void
}

export const Page = memo(({ className, children , onScrollEnd}: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    useInfiniteScroll({triggerRef, wrapperRef, callback:onScrollEnd })
  return (
    <section className={classNames(style.Page, {}, [className])} ref={wrapperRef} >
        {children}
        <div ref={triggerRef}/>
    </section>
  );
});