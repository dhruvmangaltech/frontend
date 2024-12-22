import * as Yup from 'yup';

export const uploadPopupSchema = (type, t) =>
  Yup.object().shape({
    visibility: Yup.string().required(t('popupManagement.inputField.visibility.errors.required')),
    popName: Yup.string().required(t('popupManagement.inputField.name.errors.required')),
    desktopImage:
      type === 'Create'
        ? Yup.mixed().required(t('popupManagement.inputField.desktopImage.errors.required'))
          .test('File Size', t('popupManagement.inputField.desktopImage.errors.max'),
            (value) => !value || (value && value.size <= 1024 * 1024)
          )
          .test('FILE_FORMAT', t('popupManagement.inputField.desktopImage.errors.invalidFormat'),
            (value) =>
              !value ||
              (value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type)))
        : Yup.mixed().test('File Size', t('popupManagement.inputField.desktopImage.errors.max'),
          (value) => !value || (value && value.size <= 1024 * 1024))
          .test('FILE_FORMAT', t('popupManagement.inputField.desktopImage.errors.invalidFormat'),
            (value) =>
              !value ||
              (value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type)))
          .nullable(),
    mobileImage:
      type === 'Create'
        ? Yup.mixed().required(t('popupManagement.inputField.mobileImage.errors.required'))
          .test('File Size', t('popupManagement.inputField.mobileImage.errors.max'),
            (value) => !value || (value && value.size <= 1024 * 1024)
          )
          .test('FILE_FORMAT', t('popupManagement.inputField.mobileImage.errors.invalidFormat'),
            (value) =>
              !value ||
              (value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type)))
        : Yup.mixed().test('File Size', t('popupManagement.inputField.mobileImage.errors.max'),
          (value) => !value || (value && value.size <= 1024 * 1024))
          .test('FILE_FORMAT', t('popupManagement.inputField.mobileImage.errors.invalidFormat'),
            (value) =>
              !value ||
              (value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type)))
          .nullable(),
  });
