import { MutableRefObject, ReactNode, UIEventHandler, memo, useRef } from 'react';
import style from './Page.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getScroll, getScrollByPath, scrollActions } from 'features/scrollSave';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });
  // const scrollPosition = useSelector(
  //   (state: StateSchema) => getScrollByPath(state, pathname));

  const scrollPosition = useSelector(getScroll);

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition[pathname];
  });
  //@ts-ignore

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      scrollActions.setScrollPosition({ path: pathname, position: e.currentTarget.scrollTop }),
    );
  }, 500);

  return (
    <section
      className={classNames(style.Page, {}, [className])}
      ref={wrapperRef}
      onScroll={onScroll}>
      {children}
      <div ref={triggerRef} />
    </section>
  );
});
