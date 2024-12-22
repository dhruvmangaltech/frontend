import * as Yup from 'yup';

export const uploadBannerSchema = (type, t) =>
  Yup.object().shape({
    visibility: Yup.string().required(t('casinoBannerManagement.inputField.visibility.errors.required')),
    name: Yup.string().required(t('casinoBannerManagement.inputField.name.errors.required')),
    desktopImage:
      type === 'Create'
        ? Yup.mixed().required(t('casinoBannerManagement.inputField.desktopImage.errors.required'))
          .test('File Size', t('casinoBannerManagement.inputField.desktopImage.errors.max'),
            (value) => !value || (value && value.size <= 1024 * 1024)
          )
          .test('FILE_FORMAT', t('casinoBannerManagement.inputField.desktopImage.errors.invalidFormat'),
            (value) =>
              !value ||
              (value && ['image/png', 'image/jpeg', 'image/jpg','image/webp'].includes(value.type)))
        : Yup.mixed().test('File Size', t('casinoBannerManagement.inputField.desktopImage.errors.max'),
          (value) => !value || (value && value.size <= 1024 * 1024))
          .test('FILE_FORMAT', t('casinoBannerManagement.inputField.desktopImage.errors.invalidFormat'),
            (value) =>
              !value ||
              (value && ['image/png', 'image/jpeg', 'image/jpg','image/webp'].includes(value.type)))
          .nullable(),
    mobileImage:
      type === 'Create'
        ? Yup.mixed().required(t('casinoBannerManagement.inputField.mobileImage.errors.required'))
          .test('File Size', t('casinoBannerManagement.inputField.mobileImage.errors.max'),
            (value) => !value || (value && value.size <= 1024 * 1024)
          )
          .test('FILE_FORMAT', t('casinoBannerManagement.inputField.mobileImage.errors.invalidFormat'),
            (value) =>
              !value ||
              (value && ['image/png', 'image/jpeg', 'image/jpg','image/webp'].includes(value.type)))
        : Yup.mixed().test('File Size', t('casinoBannerManagement.inputField.mobileImage.errors.max'),
          (value) => !value || (value && value.size <= 1024 * 1024))
          .test('FILE_FORMAT', t('casinoBannerManagement.inputField.mobileImage.errors.invalidFormat'),
            (value) =>
              !value ||
              (value && ['image/png', 'image/jpeg', 'image/jpg','image/webp'].includes(value.type)))
          .nullable(),
  });
