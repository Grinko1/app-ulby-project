import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ValidateProfileError } from '../../types/profile';


describe('getProfileValidateErrors.test', () => {
  test('should return value', () => {
   
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateError:[ValidateProfileError.INCORRECT_AGE]
      },
    };

    expect(getProfileValidateErrors(state as StateSchema)).toEqual(['INCORRECT_AGE']);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
