import { ReactNode, memo, useCallback } from 'react';
import style from './Tabs.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem {
  value: string;
  content: ReactNode;
}
interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value, onTabClick } = props;

  const handleClick = useCallback((tab: TabItem) => {
    return () => {
      onTabClick(tab);
    };
  }, []);
  return (
    <div className={classNames(style.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          className={style.Tab}
          key={tab.value}
          theme={tab.value === value ? CardTheme.OUTLINED : CardTheme.NORMAL}
          onClick={handleClick(tab)}>
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
