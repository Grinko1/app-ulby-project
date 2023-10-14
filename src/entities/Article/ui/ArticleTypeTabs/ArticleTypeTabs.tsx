import { memo, useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article/model/types/article';
import { useTranslation } from 'react-i18next';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType:(type:ArticleType) =>void

}

export const ArticleTypeTabs = memo(({ className, value, onChangeType }: ArticleTypeTabsProps) => {
  const { t } = useTranslation();

  const tabs = useMemo<TabItem[]>(() => {
    return [
      {
        value: ArticleType.ECONOMICS,
        content: t('Экономика'),
      },
      {
        value: ArticleType.IT,
        content: t('Айти'),
      },
      {
        value: ArticleType.SCIENCE,
        content: t('Наука'),
      },
      {
        value: ArticleType.ALL,
        content: t('Все'),
      },
    ];
  }, [t]);
      const onTabClick = useCallback(
    (tab: TabItem) => {
     onChangeType(tab.value as ArticleType)
    },
    [],
  );

  return <Tabs tabs={tabs} onTabClick={onTabClick} value={value} className={classNames('', {}, [className])} />;
});
