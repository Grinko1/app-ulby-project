import { memo } from 'react';
import style from './ArticleViewSelector.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleView } from 'entities/Article/model/types/article';
import ListIcon from 'shared/assets/icons/big.svg';
import TilesIcon from 'shared/assets/icons/small.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from '../../../../shared/ui/Icon/Icon';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
  {
    view: ArticleView.SMALL,
    icon: TilesIcon,
  },
];
export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };
  return (
    <div className={classNames(style.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((item) => (
        <Button key={item.view} theme={ButtonTheme.CLEAR} onClick={onClick(item.view)}>
          <Icon
            Svg={item.icon}
            className={classNames('', { [style.notSelected]: item.view !== view }, [])}
          />
        </Button>
      ))}
    </div>
  );
});
