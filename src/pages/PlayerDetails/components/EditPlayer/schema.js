import * as Yup from 'yup'
import { AGE_RESTRICTION_19 } from './constant';

export const userPersonalSchema = Yup.object().shape({
  firstName: Yup.string().min(3, 'First Name must be at-least 3 characters')
    .max(200)
    .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, 'Only Alphabets and Space Allowed and Must Start with Alphabet'),
  lastName: Yup.string().min(3, 'Last Name must be at-least 3 characters')
    .max(200)
    .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, 'Only Alphabets and Space Allowed and Must Start with Alphabet'),
  dateOfBirth: Yup.date().nullable()
    .test('dateOfBirth', 'Should be greater than 18', function (value, ctx) {
      let isMatched = false
      if (ctx?.parent?.state?.value) {
        isMatched = AGE_RESTRICTION_19.includes(ctx?.parent?.state?.value);
      }
      const dob = new Date(value);
      const validDate = new Date();
      const valid = validDate.getFullYear() - dob.getFullYear() >= (isMatched ? 19 : 18);
      return !valid ? ctx.createError({ message: isMatched ? 'Should be greater than 19' : 'Should be greater than 18' }) : valid;
    }),
  gender: Yup
    .object()
    .shape({
      value: Yup.string().required('Gender is required')
    })
    .nullable(),
  addressLine_1: Yup.string().min(3, 'Address must be at-least 3 characters')
    .max(200)
    .nullable(),
  state: Yup
    .object()
    .shape({
      value: Yup.string().required('State is required')
    })
    .nullable(), // for handling null value when clearing options via clicking 'x'
  city: Yup.string().nullable(),
  zipCode: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(5, 'Must be exactly 5 digits')
    .max(5, 'Must be exactly 5 digits')
    .nullable(),
})
