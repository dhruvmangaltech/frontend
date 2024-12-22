import * as Yup from 'yup';
const yesterday = new Date(Date.now() - 86400000);
export const createPackageSchema = Yup.object().shape({
  amount: Yup.string()
    .matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      'Enter positive number, or up to two decimal places.'
    )
    .required('Amount Required'),
  previousAmount: Yup.string()
    .matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      'Enter positive number, or up to two decimal places.'
    ),
    // .required('previous Amount Required'),
  gcCoin: Yup.string()
    .matches(
      /^[0-9]+$/,
      'Enter positive number.'
    )
    .required('GC Coin Required'),
  scCoin: Yup.string()
    .matches(
      /^[0-9]+$/,
      'Enter positive number.'
    )
    .required('SC Coin Required'),
  image: Yup.mixed()
    .required('Thumbnail required')
    .test(
      'File Size',
      'File Size Should be Less Than 1MB',
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      'FILE_FORMAT',
      'Uploaded file has unsupported format',
      (value) =>
        !value ||
        (value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
    ),
  packageType: Yup.string(),
  validTill: Yup.date()
    .min(yesterday, 'Date cannot be earlier than today.')
    .typeError('The value must be a date (MM-DD-YYYY)')
    .required('This field is required'),
});

export const updatePackageSchema = Yup.object().shape({
  amount: Yup.string()
    .matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      'Enter positive number, or up to two decimal places.'
    )
    .required('Amount Required'),
  previousAmount: Yup.string().matches(
    /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
    'Enter positive number, or up to two decimal places.'
  ),
  gcCoin: Yup.string()
    .matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      'Enter positive number, or up to two decimal places.'
    )
    .matches(/^\+?(0|[1-9]\d*)$/, 'Decimal values not allowed')
    .required('GC Coin Required'),
  scCoin: Yup.string()
    .matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      'Enter positive number, or up to two decimal places.'
    )
    .matches(/^\+?(0|[1-9]\d*)$/, 'Decimal values not allowed')
    .required('SC Coin Required'),
  image: Yup.mixed()
    .test(
      'File Size',
      'File Size Should be Less Than 1MB',
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      'FILE_FORMAT',
      'Uploaded file has unsupported format',
      (value) =>
        !value ||
        (value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
    )
    .nullable(),
  packageType: Yup.string(),
  validTill: Yup.date()
    .min(yesterday, 'Date cannot be earlier than today.')
    .typeError('The value must be a date (MM-DD-YYYY)')
    .required('This field is required'),
});
