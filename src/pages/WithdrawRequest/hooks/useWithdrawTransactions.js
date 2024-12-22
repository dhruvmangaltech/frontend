import { useState } from 'react'
import { formatDateYMD, getDateDaysAgo } from '../../../utils/dateFormatter'
import { getLoginToken } from '../../../utils/storageUtils'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllTransactions, getWithdrawRequests } from '../../../utils/apiCalls'
import { useDebounce } from 'use-debounce'
import { toast } from '../../../components/Toast'
import { errorHandler, useUpdateWithdrawRequestMutation } from '../../../reactQuery/hooks/customMutationHook'

const useWithdrawTransactions = () => {
  const [selectedAction, setSelectedAction] = useState('all')
  const [approveModal, setApproveModal] = useState(false)
  const [redeemRequest, setRedeemRequest] = useState({})
  const [limit, setLimit] = useState(15)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const queryClient = useQueryClient()
  const [selectedProvider, setSelectedProvider] = useState('all')
  const [disable, setDisable] = useState(false)
  const [state, setState] = useState([
    {
      startDate: getDateDaysAgo(10),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  const { data: transactionData, isLoading: loading } = useQuery({
    queryKey: ['withdrawList', limit, page, selectedAction, selectedProvider, formatDateYMD(state.map(a => a.startDate)), formatDateYMD(state.map(a => a.endDate)), debouncedSearch],
    queryFn: ({ queryKey }) => {
      const params = {pageNo: queryKey[2], limit: queryKey[1]};
      if (queryKey[3]) params.status = queryKey[3]
      if (queryKey[4]) params.paymentProvider = queryKey[4]
      if (queryKey[5]) params.startDate = queryKey[5]
      if (queryKey[6]) params.endDate = queryKey[6]
      if (queryKey[7]) params.email = queryKey[7]
      return getWithdrawRequests(params)
    },
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.requestDetails
  })

  const totalPages = Math.ceil(transactionData?.count / limit)

  
  const { mutate: updateWithdrawalRequest, isLoading: updateLoading } = useUpdateWithdrawRequestMutation({onSuccess: (data) => {
    setDisable(false)
    if (data.data.success) {
      toast('Withdraw request updated successfully', 'success')
      queryClient.invalidateQueries({ queryKey: ['withdrawList'] })
    } else {
      toast(data.data.message, 'error')
    }
  }, onError: (error) => {
    setDisable(false)
    if(error?.response?.data?.errors.length > 0) {
        const {errors} = error.response.data;
        errors.map(( error) => {
          if(error?.errorCode === 500) {
            toast('Something Went Wrong', 'error')
          }
          if(error?.description) {
            toast(error?.description, 'error')
          }
        })
      }
  }})

  const updateWithdrawData = (data) => {
    setDisable(true)
    updateWithdrawalRequest(data)
  }

  return {
    updateWithdrawData,
    setLimit,
    setPage,
    totalPages,
    limit,
    page,
    setSelectedAction,
    selectedAction,
    state,
    setState,
    transactionData,
    loading,
    search, 
    setSearch,
    setSelectedProvider,
    selectedProvider,
    disable,
    approveModal,
    setApproveModal,
    redeemRequest,
    setRedeemRequest
  }
}

export default useWithdrawTransactions
