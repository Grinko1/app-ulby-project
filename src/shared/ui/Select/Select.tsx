import { ChangeEvent, memo, useMemo } from 'react';
import style from './Select.module.scss';
import { Mods, classNames } from 'shared/lib/classNames/classNames';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}
interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?:boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, label, options, value, onChange, readonly } = props;
  const mods: Mods = {};
  const onChangeHandler =(e:ChangeEvent<HTMLSelectElement> ) => {
    onChange?.(e.target.value as T)
  }
  const optionList = useMemo(() => {
    return options?.map((option) => (
      <option className={style.option} value={option.value} key={option.value}>
        {option.content}
      </option>
    ));
  }, [options]);
  

  return (
    <div className={classNames(style.Wrapper, mods, [className])}>
      {label && <span className={style.label}>{label + '>'}</span>}
      <select className={style.select} value={value} onChange={onChangeHandler} disabled={readonly}>
        {optionList}
      </select>
    </div>
  );
};
