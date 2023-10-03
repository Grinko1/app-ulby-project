import { memo, useCallback } from 'react';
import style from './AddCommentForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import {
  getCommentFormError,
  getCommentFormText,
} from 'features/addNewComment/model/selectors/getCommentFormState';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  AddCommentFormReducer,
  addCommentFormActions,
} from 'features/addNewComment/model/slice/addCommentFormSlice';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const reducer: ReducersList = {
  addCommentForm: AddCommentFormReducer,
};
export interface AddCommentFormProps {
  className?: string;
  onSentComment: (text: string) => void;
}

const AddCommentForm = ({ className, onSentComment }: AddCommentFormProps) => {
  const { t } = useTranslation();
  const text = useSelector(getCommentFormText);
  const error = useSelector(getCommentFormError);
  const dispatch = useAppDispatch();
  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, []);

  const onSentHandler = useCallback(() => {
    onSentComment(text || '');
    onCommentTextChange('');
  }, [onSentComment, onCommentTextChange, text]);
  return (
    <DynamicModuleLoader reducers={reducer}>
      <div className={classNames(style.addCommentForm, {}, [className])}>
        <Input
          placeholder={t('Введите текст комментария')}
          value={text}
          onChange={onCommentTextChange}
          className={style.input}
        />
        <Button theme={ButtonTheme.OUTLINE} onClick={onSentHandler}>
          {t('Отправить')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
};
export default memo(AddCommentForm);
