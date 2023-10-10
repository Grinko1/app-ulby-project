import { memo, useCallback, useMemo } from 'react';
import style from './ArticleSortSelector.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, sort, order, onChangeOrder, onChangeSort } = props;
  const { t } = useTranslation('article');
  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('возрастанию'),
      },
      {
        value: 'desc',
        content: t('убыванию'),
      },
    ],
    [],
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('дате создания'),
      },
      {
        value: ArticleSortField.TITLE,
        content: t('названию'),
      },
      {
        value: ArticleSortField.VIEW,
        content: t('просмотрам'),
      },
    ],
    [],
  );



  return (
    <div className={classNames(style.ArticleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        onChange={onChangeSort}
        value={sort}
        label={t('Сортировать По')}
        options={sortFieldOptions}
      />

      <Select
        value={order}
        onChange={onChangeOrder}
        options={orderOptions}
        label={t('По')}
        className={style.order}
      />
    </div>
  );
});
