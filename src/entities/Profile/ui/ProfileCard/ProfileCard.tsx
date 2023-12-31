import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import cls from './ProfileCard.module.scss';
import { Profile } from 'entities/Profile/model/types/profile';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { CountrySelect, Country } from 'entities/Country';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  onChangeFirstname?: (value: string) => void;
  onChangeLastname?: (value: string) => void;
  onChangeCity?: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeAvatar?: (value: string) => void;
  onChangeUsername?: (value: string) => void;
  onChangeCurrency: (value: Currency) => void;
  onChangeCountry:(value:Country) =>void;
  readonly?: boolean;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
    onChangeFirstname,
    onChangeLastname,
    readonly,
    onChangeCity,
    onChangeAge,
    onChangeAvatar,
    onChangeUsername,
    onChangeCurrency,
    onChangeCountry
  } = props;
  const { t } = useTranslation('profile');

  const mods: Mods = {
    [cls.editing]: !readonly,
  };
  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          title={t('Произошла ошибка при загрузке')}
          theme={TextTheme.ERROR}
          text={t('Попробуте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }
  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={data?.avatar} size={100} />
          </div>
        )}

        <Input
          value={data?.first}
          placeholder={t('Ваше имя')}
          className={cls.input}
          onChange={onChangeFirstname}
          readonly={readonly}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
          onChange={onChangeLastname}
          readonly={readonly}
        />
        <Input
          value={data?.age}
          placeholder={t('Возвраст')}
          className={cls.input}
          onChange={onChangeAge}
          readonly={readonly}
        />

        <Input
          value={data?.city}
          placeholder={t('Город')}
          className={cls.input}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <Input
          value={data?.avatar}
          placeholder={t('Аватар')}
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <Input
          value={data?.username}
          placeholder={t('Имя пользователя')}
          className={cls.input}
          onChange={onChangeUsername}
          readonly={readonly}
        />

        <CountrySelect value={data?.country} readonly={readonly}
          className={cls.input} onChange={onChangeCountry} />
        <CurrencySelect
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
          className={cls.input}
        />
      </div>
    </div>
  );
};
