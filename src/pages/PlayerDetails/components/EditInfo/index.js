import React from 'react'
import { toast } from '../../../../components/Toast'
import { useUpdateUserStatus, updatePlayerPassword, updateCoinMutation, useUpdateRemovePwLock, useUpdateSocialSecurity, updatePlayerForceLogout, updateVipTierLevelMutation } from '../../../../reactQuery/hooks/customMutationHook'
import { EditInfoContainer } from '../../style'
import ModalView from '../../../../components/Modal'
import SimpleEditForm from './SimpleEditForm'
import Preloader from '../../../../components/Preloader'
import AddDeductCoin from './AddDeductCoin'
import PlayerChangePwd from './PlayerChangePwd'
import MultiFieldEditForm from './MultiFieldEditForm'
import { QueryClient } from '@tanstack/react-query'
import VipTier from './VipTier'
import { useGetVipTierListingQuery } from '../../../../reactQuery/hooks/customQueryHook'
const simpleEditFormExistForm = ['isBan', 'isRestrict', 'phoneVerified', 'isInternalUser', 'isRedemptionSubscribed', 'isSubscribed', 'removePwLock', 'forceLogoutChild' , 'paynotePayment', 'tripleAPayment']
const simpleAddCoinExistForm = ['addDeductCoinsChild']
const simpleChangePwdForm = ['passwordChild']
const multiFieldForm = ['socialSecurityChild']
const vipTierForm = ['vipTierChild']
const EditInfo = (props) => {
  const { basicInfo, selectedInnerButton, openEditInfoModal, setOpenEditInfoModal, getUserDetails, handelRefetchActivity ,getActivityLogs} = props
  const toggleSuccessModal = () => {
    setOpenEditInfoModal(!openEditInfoModal)
  }
  const closeModal = () => {
    setOpenEditInfoModal(false)
  }
  const { data } = useGetVipTierListingQuery()

  const { mutate: updateUserStatusRequest, isLoading: isUpdateLoading } = useUpdateUserStatus({
    onSuccess: (data) => {
      if (data.data.message) {
        getActivityLogs()
        getUserDetails()
        toast(data.data.message, 'success')
        closeModal()
      } else {
        toast(data.data.message, 'error')
      }
    },
    onError: (error) => {
      if (error?.response?.data?.errors.length > 0) {
        const { errors } = error.response.data;
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

  const { mutate: updatePasswordRequest, isLoading: isChangePwdLoading } = updatePlayerPassword({
    onSuccess: (data) => {
      if (data.data.message) {
        toast(data.data.message, 'success')
        closeModal()
      } else {
        toast(data.data.message, 'error')
      }
    },
    onError: (error) => {
      if (error?.response?.data?.errors.length > 0) {
        const { errors } = error.response.data;
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
  const { mutate: updateRemovePwLockRequest, isLoading: isRemovePwLockLoading } = useUpdateRemovePwLock({
    onSuccess: (data) => {
      if (data.data.message) {
        getUserDetails()
        toast(data.data.message, 'success')
        closeModal()
      } else {
        toast(data.data.message, 'error')
      }
    },
    onError: (error) => {
      if (error?.response?.data?.errors.length > 0) {
        const { errors } = error.response.data;
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

  const { mutate: addCoinRequest, isLoading: isAddCoinLoading } = updateCoinMutation({
    onSuccess: (data) => {
      if (data.data.message) {
        toast(data.data.message, 'success')
        getUserDetails()
        closeModal()

      } else {
        toast(data.data.message, 'error')
      }
    },
    onError: (error) => {
      if (error?.response?.data?.errors.length > 0) {
        const { errors } = error.response.data;
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
  const { mutate: updateSocialSecurityRequest, isLoading: isUpdateSocailSecurityLoading } = useUpdateSocialSecurity({
    onSuccess: (data) => {
      if (data.data.message) {
        getUserDetails()
        handelRefetchActivity(true)
        toast(data.data.message, 'success')
        closeModal()
      } else {
        toast(data.data.message, 'error')
      }
    },
    onError: (error) => {
      if (error?.response?.data?.errors.length > 0) {
        const { errors } = error.response.data;
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

  const { mutate: updatePlayerForceLogoutReq, isLoading: isForceLogoutLoading } = updatePlayerForceLogout({
    onSuccess: (data) => {
      if (data.data.message) {
        toast(data.data.message, 'success')
        closeModal()
      } else {
        toast(data.data.message, 'error')
      }
    },
    onError: (error) => {
      if (error?.response?.data?.errors.length > 0) {
        const { errors } = error.response.data;
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

  const { mutate: addvipTierLevelRequest, isLoading: isVipTierLevelLoading } = updateVipTierLevelMutation({
    onSuccess: (data) => {
      if (data.data.message) {
        toast(data.data.message, 'success')
        getUserDetails()
        closeModal()

      } else {
        toast(data.data.message, 'error')
      }
    },
    onError: (error) => {
      if (error?.response?.data?.errors.length > 0) {
        const { errors } = error.response.data;
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

  const onUpdateToggler = (dataValue, favType) => {
    let data
    if (selectedInnerButton.innerItem === 'removePwLock' || selectedInnerButton.innerItem === 'forceLogoutChild') {
      data = {
        userId: basicInfo.userId,
        reason: dataValue.reason,
        favroite: favType
      }
    } else if (selectedInnerButton.innerItem === 'socialSecurityChild') {
      data = {
        userId: basicInfo.userId,
        reason: dataValue.reason,
        favroite: favType,
        ssn: dataValue.ssn.toString()
      }
    }
    else {
      data = {
        userId: basicInfo.userId,
        reason: dataValue.reason,
        type: selectedInnerButton.type || '', // 1: phoneVerification, 2: Restrict User, 3: Ban Unban User, 4: Mark Test , 5: Redemption Subscription, 6: Subscription, 13. Enable Paynote , 14. Enable triple A
        favroite: favType
      }
    }

    let tempAction = false
    switch (selectedInnerButton.innerItem) {
      case 'isBan':
      case 'isRestrict':
      case 'phoneVerified':
      case 'isInternalUser':
        tempAction = !(basicInfo[selectedInnerButton.innerItem])
        break
      case 'tripleAPayment':
          tempAction = (basicInfo[selectedInnerButton.innerItem] === 'DISABLED') 
          break
      case 'paynotePayment':
          tempAction = (basicInfo[selectedInnerButton.innerItem] === 'DISABLED') 
          break
      case 'isRedemptionSubscribed':
      case 'isSubscribed':
        tempAction = !basicInfo?.moreDetails[selectedInnerButton.innerItem]
        break
      default:
        break
    }

    switch (selectedInnerButton.innerItem) {
      case 'isBan':
      case 'isRestrict':
      case 'phoneVerified':
      case 'isInternalUser':
      case 'isRedemptionSubscribed':
      case 'isSubscribed':
      case 'paynotePayment':
      case 'tripleAPayment':
        data.action = tempAction
        updateUserStatusRequest(data)
        break
      case 'removePwLock':
        updateRemovePwLockRequest(data)
        break
      case 'socialSecurityChild':
        updateSocialSecurityRequest(data)
        break
      case 'forceLogoutChild':
        updatePlayerForceLogoutReq(data)
        break
      default:
        break
    }
  }
  const onUpdatePasswordToggler = (dataValue, favType) => {
    const data = {
      userId: basicInfo.userId,
      password: btoa(dataValue.password),
      reason: dataValue.reason,
      favroite: favType
    }
    updatePasswordRequest(data)
  }
  const onUpdateCoinToggle = (dataValue) => {
    const data = {
      coinType: dataValue.coinType.value,
      operationType: Number(dataValue.operationType.value),
      gcAmount: 0,
      scAmount: 0,
      remarks: dataValue.reason,
      userId: basicInfo.userId
    }
    if (dataValue.coinType.value === 'gc') {
      data.gcAmount = Number(dataValue.gcAmount)
    } else if (dataValue.coinType.value === 'sc') {
      data.scAmount = Number(dataValue.scAmount)
    } else {
      data.scAmount = Number(dataValue.scAmount)
      data.gcAmount = Number(dataValue.gcAmount)
    }
    addCoinRequest(data)
  }

  const onUpdateVipTier = (dataValue)=>{
    const data = {
      userId: basicInfo.userId,
      vipTierId: dataValue?.vipTierLevel?.value
    }
    addvipTierLevelRequest(data)
  }
  return (
    <EditInfoContainer>
      <ModalView
        openModal={openEditInfoModal}
        toggleModal={toggleSuccessModal}
        size='lg'
        hideHeader
        center
        className='announcement-view-wrap'
        firstBtnClass='btn-primary'
        secondBtnClass='btn-secondary'
        hideFooter
      >
        {
          isUpdateLoading || isRemovePwLockLoading || isUpdateSocailSecurityLoading && <Preloader />
        }
        {
          simpleEditFormExistForm.includes(selectedInnerButton.innerItem) &&
          <SimpleEditForm
            closeModal={closeModal}
            onSubmit={onUpdateToggler}
            basicInfo={basicInfo}
            selectedInnerButton={selectedInnerButton}
          />
        }
        {
          simpleAddCoinExistForm.includes(selectedInnerButton.innerItem) &&
          <AddDeductCoin
            closeModal={closeModal}
            onSubmit={onUpdateCoinToggle}
            basicInfo={basicInfo}
            selectedInnerButton={selectedInnerButton}
            isLoading={isAddCoinLoading}
          />
        }
        {
          simpleChangePwdForm.includes(selectedInnerButton.innerItem) &&
          <PlayerChangePwd
            closeModal={closeModal}
            onSubmit={onUpdatePasswordToggler}
            basicInfo={basicInfo}
            selectedInnerButton={selectedInnerButton}
            isLoading={isChangePwdLoading}
          />
        }{
          multiFieldForm.includes(selectedInnerButton.innerItem) &&
          <MultiFieldEditForm
            closeModal={closeModal}
            onSubmit={onUpdateToggler}
            basicInfo={basicInfo}
            selectedInnerButton={selectedInnerButton}
          />
        }
        {
          vipTierForm.includes(selectedInnerButton.innerItem) &&
          <VipTier
            closeModal={closeModal}
            onSubmit={onUpdateVipTier}
            basicInfo={basicInfo}
            listData={data}
            selectedInnerButton={selectedInnerButton}
            isLoading={isVipTierLevelLoading}
          />
        }
        {/*  */}
      </ModalView>
    </EditInfoContainer>
  )
}

export default EditInfo
