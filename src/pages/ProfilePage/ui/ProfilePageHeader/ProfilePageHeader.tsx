import { useTranslation } from 'react-i18next';
import style from './ProfilePageHeader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation();
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);
  
    const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);
  return (
    <div className={classNames(style.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')} />
      {readonly ? (
        <Button className={style.editBtn} theme={ButtonTheme.OUTLINE} onClick={onEdit}>
          {t('Редактировать')}
        </Button>
      ) : ( 
        <>
          <Button className={style.editBtn} theme={ButtonTheme.OUTLINE_RED } onClick={onCancelEdit}>
            {t('Отменить')}
          </Button>
            <Button className={style.saveBtn} theme={ButtonTheme.OUTLINE} onClick={onSave}>
            {t('Сохранить ')}
          </Button>
        </>
      )}
    </div>
  );
};
