import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useGetRewardSystemDetailMutation, useUpdateRewardSystemMutation } from '../../../reactQuery/hooks/customMutationHook'
import { useGetRewardSystemDetailQuery } from '../../../reactQuery/hooks/customQueryHook';

const useEditRewardSystem = (onSuccess) => {
  const [enabled, setEnabled] = useState(false);
  const [isSelectLoading, setIsSetLoading] = useState(false);
  const { vipTierId } = useParams();
  const {data, refetch: fetchData} = useGetRewardSystemDetailQuery({params:{vipTierId},enabled})
  const { mutate: updateRewardSystem, isLoading: loading } = useUpdateRewardSystemMutation({ onSuccess })

  useEffect(() => {
    if (vipTierId) {
      setEnabled(true)
      fetchData();
    }
  }, [])

  const editRewardSystem = (body) => updateRewardSystem(body)
  return {
    rewardSystemData: data,
    editRewardSystem,
    loading,
    vipTierId,
    isSelectLoading,
  }
}

export default useEditRewardSystem;
