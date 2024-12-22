import * as Yup from 'yup'

export const redeemConfigSchema = (t) => Yup.object().shape({
  minRedeemableCoins: Yup.number().integer().min(1, t('redeemConfiguration.inputFields.minRedeemableCoins.errors.min')).required(t('redeemConfiguration.inputFields.minRedeemableCoins.errors.required')),
  maxRedeemableCoins: Yup.number().integer().min(1, t('redeemConfiguration.inputFields.maxRedeemableCoins.errors.min')).required(t('redeemConfiguration.inputFields.maxRedeemableCoins.errors.required')),
  maxNonPurchaserAmount: Yup.number().integer().min(1, t('redeemConfiguration.inputFields.maxNonPurchaserAmount.errors.min')).required(t('redeemConfiguration.inputFields.maxNonPurchaserAmount.errors.required')),
  maxNonPurchaserDays: Yup.number().integer().min(1, t('redeemConfiguration.inputFields.maxNonPurchaserDays.errors.min')).required(t('redeemConfiguration.inputFields.maxNonPurchaserDays.errors.required')),
  weeklyRedeemableLimit: Yup.number().integer().min(1, t('redeemConfiguration.inputFields.weeklyRedeemableLimit.errors.min')).required(t('redeemConfiguration.inputFields.weeklyRedeemableLimit.errors.required')),
  maxPendingRedemptionLimit: Yup.number().integer().min(1, t('redeemConfiguration.inputFields.maxPendingRedemptionLimit.errors.min')).required(t('redeemConfiguration.inputFields.maxPendingRedemptionLimit.errors.required')),
})

export const depositConfigSchema = (t) => Yup.object().shape({
  dailyDepositLimit: Yup.number().integer().min(1, t('depositConfiguration.inputFields.dailyDepositLimit.errors.min')).required(t('depositConfiguration.inputFields.dailyDepositLimit.errors.required'))
})