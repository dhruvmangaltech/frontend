import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { errorHandler,  useDeleteRewardSystem, useUpdateRewardSystemStatusMutation, useUpdateSpinWheelMutation } from '../../../reactQuery/hooks/customMutationHook'
import { toast } from '../../../components/Toast'
import { useTranslation } from 'react-i18next'
import { useGetRewardSystemListingQuery, useGetSpinWheel } from '../../../reactQuery/hooks/customQueryHook'
import useDidMountEffect from '../../../utils/useDidMountEffect'
import { serialize } from 'object-to-formdata'

const useSpinWheel = () => {
  const { t } = useTranslation(['spinWheel'])
  const [show, setShowModal] = useState(false)
  const [type, setType] = useState('')
  const [editData, setEditData] = useState()
  const { data: spinWheeldata, refetch: refetchData, } = useGetSpinWheel()

  const handleClose = () => setShowModal(false)
  const handleShowModal = (type, data) => {
    setType(type)
    setEditData(data)
    setShowModal(true)
  }

  const { mutate: updateSpinWheel, isLoading: updateLoading } = useUpdateSpinWheelMutation({onSuccess: () => {
    toast("Spin Wheel Configuration Updated", 'success')
    refetchData()
    handleClose()
  }})

  const updateSpinWheelConfiguration = (data) => {
    const tempdata = {
      "wheelDivisionId": data?.section,
      "sc": data?.scCoin,
      "gc": data?.gcCoin,
      "isAllow": data?.isAllow,
      "playerLimit": data?.userLimitCheck ? data?.userLimit : null,
      "priority": Number(data?.priority)
    }
    updateSpinWheel({...tempdata})
  }
  return {
    spinWheeldata,editData,t,updateSpinWheelConfiguration,handleShowModal,show, handleClose, type,
  }
}

export default useSpinWheel
