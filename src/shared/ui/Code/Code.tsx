import { ReactNode, memo, useCallback } from 'react';
import style from './Code.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../Button/Button';
import CopySvg from 'shared/assets/icons/copy.svg'
import { Icon } from 'shared/ui/Icon/Icon';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo(({ className, text }: CodeProps) => {

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    },[text])
  return (
    <pre className={classNames(style.Code, {}, [className])}>
      <Button onClick={onCopy} className={style.copyBtn} theme={ButtonTheme.CLEAR}><Icon Svg={CopySvg} className={style.CopyIcon}/></Button>
      <code>{text}</code>
    </pre>
  );
});
