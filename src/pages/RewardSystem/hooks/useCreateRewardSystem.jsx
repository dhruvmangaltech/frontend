import { useEffect, useState } from 'react'

const useCreateRewardSystem = (onSuccess) => {
  const [enabled, setEnabled] = useState(false)
  const [isSelectLoading, setIsSetLoading] = useState(false)
  

  useEffect(() => {
    setEnabled(true)
  }, [])

  return {
    isSelectLoading,
  }
};

export default useCreateRewardSystem;
