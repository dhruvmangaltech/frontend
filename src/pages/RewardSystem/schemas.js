import * as Yup from 'yup';
export const createRewardSystemSchema = Yup.object().shape({
  vipTier: Yup.string().required('VIP Tier Name Required'),
  scRequiredPlay: Yup.number()
    .required('SC Play Required'),
  gcRequiredPurchase: Yup.number()
    .required('GC purchase Required'),
  scRequiredMonth: Yup.number()
    .required('SC Month Required'),
  gcRequiredMonth: Yup.number()
    .required('GC Month Required'),
  bonusSc: Yup.number()
    .required('Bonus SC Required'),
  bonusGc: Yup.number()
    .required('Bonus GC Required'),
  level: Yup.number()
    .required('Level Required'),  
  boost: Yup.number()
    .min(1)
    .max(100)
    .required('Boost Percentage Required'),
  rakeback: Yup.number()
    .min(1)
    .max(100)
    .required('Rakeback Percentage Required'),
  gradualLoss: Yup.number()
    .required('Gradual Loss Required')
});

export const updateRewardSystemSchema = Yup.object().shape({
  vipTier: Yup.string().required('VIP Tier Name Required'),
  scRequiredPlay: Yup.number()
    .required('SC Play Required'),
  gcRequiredPurchase: Yup.number()
    .required('GC purchase Required'),
  scRequiredMonth: Yup.number()
    .required('SC Month Required'),
  gcRequiredMonth: Yup.number()
    .required('GC Month Required'),
  bonusSc: Yup.number()
    .required('Bonus SC Required'),
  bonusGc: Yup.number()
    .required('Bonus GC Required'),
  level: Yup.number()
    .required('Level Required'),  
  boost: Yup.number()
    .min(1)
    .max(100)
    .required('Boost Percentage Required'),
  rakeback: Yup.number()
    .min(1)
    .max(100)
    .required('Rakeback Percentage Required'),
  gradualLoss: Yup.number()
    .required('Gradual Loss Required')
});