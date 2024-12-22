import * as Yup from 'yup'

export const editGamesSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string()
      .max(50, t('editGames.fields.name.errors.max'))
      .required(t('editGames.fields.name.errors.required')),
    description: Yup.string()
      .max(1000, t('editGames.fields.description.errors.max')).nullable(),
    webLongImg: Yup.mixed()
      .test('File Size',
        t('editGames.fields.thumbnail.errors.fileSize'),
        (value) => !value || (value && value.size <= 1024 * 1024))
      .test('FILE_FORMAT', t('editGames.fields.thumbnail.errors.fileFormat'),
        (value) => !value || (value && ['image/png', 'image/jpeg', 'image/jpg']
          .includes(value.type))).nullable(),
    webShortImg: Yup.mixed()
      .test('File Size',
        t('editGames.fields.thumbnail.errors.fileSize'),
        (value) => !value || (value && value.size <= 1024 * 1024))
      .test('FILE_FORMAT', t('editGames.fields.thumbnail.errors.fileFormat'),
        (value) => !value || (value && ['image/png', 'image/jpeg', 'image/jpg']
          .includes(value.type))).nullable(),
    mobileImg: Yup.mixed()
          .test('File Size',
            t('editGames.fields.thumbnail.errors.fileSize'),
            (value) => !value || (value && value.size <= 1024 * 1024))
          .test('FILE_FORMAT', t('editGames.fields.thumbnail.errors.fileFormat'),
            (value) => !value || (value && ['image/png', 'image/jpeg', 'image/jpg']
              .includes(value.type))).nullable()
  })
}

export const uploadGamesSchema = (t) => {
  return Yup.object().shape({
    inputJson: Yup.mixed().required(t('uploadGames.fields.inputJson.errors.required'))
    .test('FILE_FORMAT', t('uploadGames.fields.inputJson.errors.fileFormat'),
        (value) => !value || (value && ['application/json']
          .includes(value.type))),
    masterCasinoProviderId: Yup.string().required(t('uploadGames.fields.providers.errors.required')),
    assetsURL: Yup.string().required(t('uploadGames.fields.assetsURL.errors.required'))
  })
}