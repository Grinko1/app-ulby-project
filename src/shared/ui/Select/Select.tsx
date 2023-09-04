import { ChangeEvent, memo, useMemo } from 'react';
import style from './Select.module.scss';
import { Mods, classNames } from 'shared/lib/classNames/classNames';

export interface SelectOption {
  value: string;
  content: string;
}
interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?:boolean
}

export const Select = memo((props: SelectProps) => {
  const { className, label, options, value, onChange, readonly } = props;
  const mods: Mods = {};
  const onChangeHandler =(e:ChangeEvent<HTMLSelectElement> ) => {
    onChange?.(e.target.value)
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
});
