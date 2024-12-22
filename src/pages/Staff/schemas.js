import * as Yup from 'yup'

export const createAdminSchema = (t) => Yup.object().shape({
  email: Yup.string()
    .email(t('staffFields.email.errors.invalid'))
    .max(200)
    .required(t('staffFields.email.errors.required')),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      t('staffFields.password.errors.invalid')
    )
    .max(50)
    .required(t('staffFields.password.errors.required')),
  firstName: Yup.string().min(3, t('staffFields.firstName.errors.min'))
    .max(200)
    .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, t('staffFields.firstName.errors.invalid'))
    .required(t('staffFields.firstName.errors.required')),
  lastName: Yup.string().min(3, t('staffFields.lastName.errors.min'))
    .max(200)
    .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, t('staffFields.lastName.errors.invalid'))
    .required(t('staffFields.lastName.errors.required')),
  role: Yup.string().required(t('staffFields.role.errors.required')),
  adminId: Yup.string().when('role', {
    is: (role) => role === 'Support',
    then: () => Yup.string().required(t('staffFields.manager.errors.required')).nullable(),
    otherwise: () => Yup.string().nullable()
  }),
  adminUsername: Yup.string()
    .matches(/^[A-Za-z]+$/, t('staffFields.username.errors.invalid'))
    .min(8, t('staffFields.username.errors.min'))
    .max(100)
    .required(t('staffFields.username.errors.required')),
  group: Yup.string().min(3, t('staffFields.group.errors.min'))
    .max(200)
    .matches(/^[A-Za-z0-9 ]+$/, t('staffFields.group.errors.invalid'))
    .required(t('staffFields.group.errors.required'))
})

export const updateStaffSchema = (t) => Yup.object().shape({
  email: Yup.string()
    .email(t('staffFields.email.errors.invalid'))
    .max(200)
    .required(t('staffFields.email.errors.required')),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      t('staffFields.password.errors.invalid')
    )
    .max(50),
  firstName: Yup.string().min(3, t('staffFields.firstName.errors.min'))
    .max(200)
    .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, t('staffFields.firstName.errors.invalid'))
    .required(t('staffFields.firstName.errors.required')),
  lastName: Yup.string().min(3, t('staffFields.lastName.errors.min'))
    .max(200)
    .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, t('staffFields.lastName.errors.invalid'))
    .required(t('staffFields.lastName.errors.required')),
  role: Yup.string().required(t('staffFields.role.errors.required')).nullable(),
  adminId: Yup.string().when('role', {
    is: (role) => role === 'Support',
    then: () => Yup.string().required('Parent Admin is required').nullable(),
    otherwise: () => Yup.string().nullable()
  }),
  adminUsername: Yup.string()
    .matches(/^[A-Za-z]+$/, t('staffFields.username.errors.invalid'))
    .min(8, t('staffFields.username.errors.min'))
    .max(100)
    .required(t('staffFields.username.errors.required')),
  group: Yup.string().min(3, t('staffFields.group.errors.min'))
    .max(200)
    .matches(/^[A-Za-z0-9 ]+$/, t('staffFields.group.errors.invalid'))
    .required(t('staffFields.group.errors.required')).nullable()
})
