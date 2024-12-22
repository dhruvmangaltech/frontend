import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useDisableUntilMutation, useSetDailyLimitsMutation, useSetDepositLimitsMutation, useSetLossLimitsMutation, useSetSessionTimeMutation, useUpdateResponsibleMutuation, useRemoveLimitsMutation } from '../../reactQuery/hooks/customMutationHook'
import { getPlayerResponsibleQuery } from '../../reactQuery/hooks/customQueryHook'
import { limitName } from './constants'
import { useTranslation } from 'react-i18next'

const useResponsibleGaming = ({ userLimits, getUserDetails }) => {
  const { t } = useTranslation(['players'])
  const { userId } = useParams()
  const [limit, setLimit] = useState({})
  const [removeLimit, setRemoveLimit] = useState({})
  const [data, setData] = useState('')
  const [limitModal, setLimitModal] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [resetModal, setResetModal] = useState(false)
  const [removeModal, setRemoveModal] = useState(false)
  const [exclusionModal, setExclusionModal] = useState(false)
  const {mutateAsync: setDailyLimit } = useSetDailyLimitsMutation()
  const {mutateAsync: setDepositLimit } = useSetDepositLimitsMutation()
  const {mutateAsync: setLossLimit } = useSetLossLimitsMutation()
  const {mutateAsync: setSessionTime } = useSetSessionTimeMutation()
  const {mutateAsync: setDisableUntil } = useDisableUntilMutation()
  const {mutateAsync: removeRsgLimits } = useRemoveLimitsMutation()

  const initialValue = [
    { label: t('playerLimit.limitHeading.dailyDepositLimit'), value: null, minimum: 0, limitType: 1 },
    { label: t('playerLimit.limitHeading.weeklyDepositLimit'), value: null, minimum: null, limitType: 2 },
    { label: t('playerLimit.limitHeading.monthlyDepositLimit'), value: null, minimum: null, limitType: 3 },
    { label: t('playerLimit.limitHeading.dailyBetLimit'), value: null, minimum: 0, limitType: 1 },
    { label: t('playerLimit.limitHeading.weeklyBetLimit'), value: null, minimum: null, limitType: 2 },
    { label: t('playerLimit.limitHeading.monthlyBetLimit'), value: null, minimum: null, limitType: 3 },
    { label: 'Take A Break', value: null },
    { label: 'Self Exclusion', value: null, selfExclusion: false }
  ]
  const [limitLabels, setLimitLabels] = useState([
    // { label: t('playerLimit.sessionLimit'), value: null, minimum: 0 },
    { label: t('playerLimit.limitHeading.dailyDepositLimit'), value: null, minimum: 0, limitType: 1 },
    { label: t('playerLimit.limitHeading.weeklyDepositLimit'), value: null, minimum: null, limitType: 2 },
    { label: t('playerLimit.limitHeading.monthlyDepositLimit'), value: null, minimum: null, limitType: 3 },
    { label: t('playerLimit.limitHeading.dailyBetLimit'), value: null, minimum: 0, limitType: 1 },
    { label: t('playerLimit.limitHeading.weeklyBetLimit'), value: null, minimum: null, limitType: 2 },
    { label: t('playerLimit.limitHeading.monthlyBetLimit'), value: null, minimum: null, limitType: 3 },
    { label: 'Take A Break', value: null },
    { label: 'Self Exclusion', value: null, selfExclusion: false }
  ])
  // [
  //   { label: t('playerLimit.limitHeading.dailyWageLimit'), value: userLimits?.dailyBetLimit, minimum: 0 },
  //   { label: t('playerLimit.limitHeading.weeklyWageLimit'), value: userLimits?.weeklyBetLimit, minimum: userLimits?.dailyBetLimit },
  //   { label: t('playerLimit.limitHeading.monthlyWageLimit'), value: userLimits?.monthlyBetLimit, minimum: userLimits?.weeklyBetLimit },
  //   { label: t('playerLimit.limitHeading.dailyDepositLimit'), value: userLimits?.dailyDepositLimit, minimum: 0 },
  //   { label: t('playerLimit.limitHeading.weeklyDepositLimit'), value: userLimits?.weeklyDepositLimit, minimum: userLimits?.dailyDepositLimit },
  //   { label: t('playerLimit.limitHeading.monthlyDepositLimit'), value: userLimits?.monthlyDepositLimit, minimum: userLimits?.weeklyDepositLimit },
  // ]

  const successToggler = (data) => {
    const tempLabel = [...limitLabels]
    if (data?.groupedData?.PURCHASE && data?.groupedData?.PURCHASE?.length > 0) {
      data?.groupedData?.PURCHASE.filter((item) => {
        if (item.limitType === '1') {
          tempLabel[0].value = item.amount
        }
        if (item.limitType === '2') {
          tempLabel[1].value = item.amount
        }
        if (item.limitType === '3') {
          tempLabel[2].value = item.amount
        }
        return true
      })
    }
    if (data?.groupedData?.TIME && data?.groupedData?.TIME?.length > 0) {
      data?.groupedData?.TIME.filter((item) => {
        if (item.limitType === '1') {
          tempLabel[3].value = item.amount
        }
        if (item.limitType === '2') {
          tempLabel[4].value = item.amount
        }
        if (item.limitType === '3') {
          tempLabel[5].value = item.amount
        }
        return true
      })
    }
    if (data?.groupedData?.TIME_BREAK) {
      tempLabel[6].value = data?.groupedData?.TIME_BREAK[0]?.amount;
    }
    if (data?.groupedData?.SELF_EXCLUSION) {
      tempLabel[7].selfExclusion = data?.groupedData?.SELF_EXCLUSION[0]?.selfExclusion;
      tempLabel[7].value = data?.groupedData?.SELF_EXCLUSION[0]?.selfExclusion ? 'Excluded' : 'Not Set';
    }
    setLimitLabels(tempLabel)
  }
  const errorToggler = () => {}
  const {
    data: responsibleData,
    isLoading: isGetGamblingLoading,
    refetch: refetchGetGambling
  } = getPlayerResponsibleQuery({
    params: {
      userId,
      active: 1
    },
    successToggler,
    errorToggler,
    enabled
  })

  // const limitLabels = [
  //   { label: t('playerLimit.limitHeading.dailyWageLimit'), value: userLimits?.dailyBetLimit, minimum: 0 },
  //   { label: t('playerLimit.limitHeading.weeklyWageLimit'), value: userLimits?.weeklyBetLimit, minimum: userLimits?.dailyBetLimit },
  //   { label: t('playerLimit.limitHeading.monthlyWageLimit'), value: userLimits?.monthlyBetLimit, minimum: userLimits?.weeklyBetLimit },
  //   { label: t('playerLimit.limitHeading.dailyDepositLimit'), value: userLimits?.dailyDepositLimit, minimum: 0 },
  //   { label: t('playerLimit.limitHeading.weeklyDepositLimit'), value: userLimits?.weeklyDepositLimit, minimum: userLimits?.dailyDepositLimit },
  //   { label: t('playerLimit.limitHeading.monthlyDepositLimit'), value: userLimits?.monthlyDepositLimit, minimum: userLimits?.weeklyDepositLimit },
  // ]

  const getData = ({ limit, reset, label }) => {
    const timePeriod = label?.split(' ')?.[0]?.toLowerCase()
    const type = label?.split(' ')?.[1]?.toLowerCase()
    let data = {}
    
    switch (type) {
      case t('playerLimit.wager'):
        data = {
              userId: +userId,
              dailyLimit: limit,
              timePeriod,
              reset,
              type
            }
        break;
      case t('playerLimit.deposit'):
        data = {
              userId: +userId,
              depositLimit: limit,
              timePeriod,
              reset,
              type
            }
        break;
      default:
        data = {
              userId: +userId,
              lossLimit: limit,
              timePeriod,
              reset,
              type
            }
    }
    return data
  }

  const resetLimit = (label) => {
    const data = getData({ limit: 1, reset: true, label })
    handleLimitCall(data)
  }

  const updateLimit = ({ formValues, label }) => {
    const data = getData({ limit: formValues?.limit, reset: false, label })
    handleLimitCall(data)
  }

  const handleLimitCall = async (body) => {
    try {  
      body?.type === t('playerLimit.wager')
        ? await setDailyLimit({ body })
        : (
          body?.type === t('playerLimit.deposit')
              ? await setDepositLimit({ body })
              : await setLossLimit({ body })
          )
      // yield put(updateLimitsComplete())
  
      data?.reset
        ? toast(t('playerLimit.limitResetToast'), 'success')
        : toast(t('playerLimit.limitUpdatedToast'), 'success')
        
      getUserDetails()
      // yield put(getUserStart({ userId: data.userId }))
    } catch (e) {
      toast(e.message, 'error')
  
      // yield put(updateLimitsComplete(e.response.data.message))
    }
  }

  const setDisableUser = ({ formValues, reset, type }) => {
    let data = {}
    switch (type) {
      case limitName.self_exclusion_key:
        data = {
          type,
          userId: +userId,
          reset,
          days: formValues?.permanent === 'true' ? -1 : formValues?.days * 30
        }
        break;
      case limitName.take_break:
        data = {
          type: limitName.take_break_key,
          userId: +userId,
          reset: false,
          days: formValues?.limit
        }
        break;
      default:
        data = {
          userId: +userId,
          timeLimit: formValues?.limit,
          timePeriod: 'daily',
          reset: false
        }
    }
    
    handleDisableUser({ data })
  }

  const resetDisableUser = (type) => {
    let data = {}

    switch (type) {
      case limitName.self_exclusion:
        data = {
          userId: +userId,
          type: limitName.self_exclusion_key,
          days: 0,
          reset: true
        }
        break;
      case limitName.take_break:
        data = {
          userId: +userId,
          type: limitName.take_break_key,
          days: 0,
          reset: true
        }
        break;
      default:
        data = {
          timeLimit: 0,
          timePeriod: 'daily',
          userId: +userId,
          reset: true
        }
    }
    
    handleDisableUser({data})
  }

  const handleDisableUser = async (data) => {
    const {data: body} = data
    try {  
      body?.type
        ? await setDisableUntil({ body })
        : await setSessionTime({ body })
  
  
      toast(`Account ${body?.reset ? 'Enabled' : 'Disabled'} Successfully`, 'success')
      getUserDetails()
      // yield put(getUserStart({ userId: data.userId }))
    } catch (e) {  
      toast(e?.message, 'error')
    }
  }

  const handleYes = (label) => {
    (label != limitName.take_break && label != limitName.self_exclusion && label != limitName.session_limit)
      ? resetLimit(label)
      : resetDisableUser(label)
  }

  const { mutate: updateResponsibleGambling, isLoading: updateLoading } = useUpdateResponsibleMutuation({
    onSuccess: (data) => {
      refetchGetGambling()
      getUserDetails()
      if (data.data.message) {
        toast(data.data.message, 'success')
      } else {
        toast(data.data.message, 'error')
      }
    },
    onError: (error) => {
      if (error?.response?.data?.errors.length > 0) {
        const {errors} = error.response.data;
        errors.map((error) => {
          if (error?.errorCode === 500) {
            toast('Something Went Wrong', 'error')
          }
          if (error?.description) {
            toast(error?.description, 'error')
          }
        })
      }
    }
  })

  const handleRemoveLimits = async ({label, value}) => {
    try {  
      if(value && label)
      {
        let res
        if (label === limitName.daily_purchase_limit) {
          res = await removeRsgLimits({ limitType : '1', responsibleGamblingType: '2', userId: +userId })
        }

        if (label === limitName.weekly_purchase_limit) {
          res = await removeRsgLimits({ limitType : '2', responsibleGamblingType: '2', userId: +userId })
        }


        if (label === limitName.monthly_purchase_limit) {
          res = await removeRsgLimits({ limitType : '3', responsibleGamblingType: '2', userId: +userId })
        }

        if (label === limitName.daily_time_limit) {
          res = await removeRsgLimits({ limitType : '1', responsibleGamblingType: '1', userId: +userId })
        }

        if (label === limitName.weekly_time_limit) {
          res = await removeRsgLimits({ limitType : '2', responsibleGamblingType: '1', userId: +userId })
        }

        if (label === limitName.monthly_time_limit) {
          res = await removeRsgLimits({ limitType : '3', responsibleGamblingType: '1', userId: +userId })
        }

        if (label === limitName.take_break) {
          res = await removeRsgLimits({ responsibleGamblingType: '4', userId: +userId })
        }

        if (label === limitName.self_exclusion) {
          res = await removeRsgLimits({ responsibleGamblingType: '5', userId: +userId })
        }
    
        if(res?.data?.success) {
          setLimitLabels(initialValue)
          toast(res?.data?.message, 'success')
          refetchGetGambling()
        }
      }
    } catch (e) {  
      toast(e?.message, 'error')
    }
  }

  return {
    t,
    limitLabels,
    setLimit,
    resetLimit,
    setLimitModal,
    limitModal,
    limit,
    updateLimit,
    resetDisableUser,
    exclusionModal,
    setExclusionModal,
    setDisableUser,
    resetModal,
    setResetModal,
    handleYes,
    data,
    setData,
    updateResponsibleGambling,
    updateLoading,
    userId,
    removeModal,
    setRemoveModal,
    handleRemoveLimits,
    removeLimit,
    setRemoveLimit
  }
}

export default useResponsibleGaming
