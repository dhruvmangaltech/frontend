import * as Yup from "yup";

export const adminProfileSchema = (t) =>
  Yup.object().shape(
    {
      oldPassword: Yup.string()
        .max(50)
        .when("newPassword", {
          is: (v) => v || v?.length > 0,
          then: () =>
            Yup.string().required(t("inputFields.oldPassword.errors.required")),
          otherwise: () => Yup.string().max(50).nullable(),
        }),
      newPassword: Yup.string().when("oldPassword", {
        is: (v) => v || v?.length > 0,
        then: () =>
          Yup.string()
            .required(t("inputFields.newPassword.errors.required"))
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              t("inputFields.newPassword.errors.invalid")
            ),
        otherwise: () => Yup.string().max(50).nullable(),
      }),
      confirmNewPassword: Yup.string()
        .oneOf(
          [Yup.ref("newPassword"), null],
          t("inputFields.confirmNewPassword.errors.notMatch")
        )
        .nullable()
        .when("newPassword", {
          is: (v) => v?.length > 0 || v !== null,
          then: (schema) =>
            schema.required(
              t("inputFields.confirmNewPassword.errors.required")
            ),
        })
        .when("newPassword", {
          is: (v) => {
            return v?.length === 0 || !v;
          },
          then: () => {
            return Yup.string()
              .oneOf(
                [Yup.ref("newPassword"), null],
                t("inputFields.confirmNewPassword.errors.notMatch")
              )
              .nullable();
          },
        }),
      firstName: Yup.string()
        .min(3, t("inputFields.firstName.errors.min"))
        .max(200)
        .matches(
          /^[a-zA-Z]+(\s[a-zA-Z]+)?$/,
          t("inputFields.firstName.errors.invalid")
        )
        .required(t("inputFields.firstName.errors.required")),
      lastName: Yup.string()
        .min(3, t("inputFields.lastName.errors.min"))
        .max(200)
        .matches(
          /^[a-zA-Z]+(\s[a-zA-Z]+)?$/,
          t("inputFields.lastName.errors.invalid")
        )
        .required(t("inputFields.lastName.errors.required")),
      phone: Yup.string()
        .min(10, t("inputFields.lastName.errors.min"))
        .max(20, t("inputFields.lastName.errors.max"))
        .matches(
          /^((\\+[1-9]{1,10}[ \\-]*)|(\\([0-9]{1,10}\\)[ \\-]*)|([0-9]{1,10})[ \\-]*)*?[0-9]{1,10}?[ \\-]*[0-9]{1,10}?$/,
          t("inputFields.lastName.errors.invalid")
        ),
    },
    [
      ["oldPassword", "newPassword"],
      ["newPassword", "confirmNewPassword"],
    ]
  );

const validUrlRE =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

export const siteConfigSchema = (t) =>
  Yup.object().shape({
    siteName: Yup.string()
      .min(3, t("inputFields.siteName.errors.min"))
      .max(30, t("inputFields.siteName.errors.max"))
      .nullable(),
    siteUrl: Yup.string()
      .matches(validUrlRE, t("inputFields.siteUrl.errors.invalid"))
      .nullable(),
    supportEmailAddress: Yup.string()
      .email(t("inputFields.supportEmailAddress.errors.invalid"))
      .nullable(),
    // minRedeemableCoins: Yup.number().integer().min(1, t('inputFields.minRedeemableCoins.errors.min')).required(t('inputFields.minRedeemableCoins.errors.required')),
    // maxRedeemableCoins: Yup.number().integer().min(1, t('inputFields.maxRedeemableCoins.errors.min')).required(t('inputFields.maxRedeemableCoins.errors.required')),
    siteLogo: Yup.mixed().required(t("inputFields.siteLogo.errors.required")),
  });

export const qrSubmitSchema = Yup.object().shape({
  token: Yup.string().min(4, "Min Length is 4").required("Code is required"),
});
