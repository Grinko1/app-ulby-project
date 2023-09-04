
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../types/profile';

const data = {
  username: 'admin',
  age: 29,
  first: 'Nadya',
  lastname: 'Grinko',
  city: 'Belogorsk',
  avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
  country: Country.Russia,
  currency: Currency.RUB,
};
describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test('without first name ', async () => {
    const result = validateProfileData({...data, first:''});

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
    test('wrong age ', async () => {
    const result = validateProfileData({...data, age:undefined});

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });
});
