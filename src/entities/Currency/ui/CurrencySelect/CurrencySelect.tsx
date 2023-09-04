import { useTranslation } from 'react-i18next';
import style from './CurrencySelect.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Currency } from 'entities/Currency/model/types/currency';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback, useMemo } from 'react';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?:boolean
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR },

];
export const CurrencySelect = memo(({className,  value, onChange, readonly }: CurrencySelectProps) => {
  const { t } = useTranslation();
  const onChangeHandler = useCallback((value:string) => {
    onChange?.(value as Currency)
  }, [onChange]);

  return <Select label={t('Валюта')} options={options} value={value} onChange={onChangeHandler}  readonly={readonly}/>;
});
