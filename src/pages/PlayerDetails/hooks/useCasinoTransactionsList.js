import { useState } from 'react'
import { formatDateYMD, getDateDaysAgo } from '../../../utils/dateFormatter'
import { getLoginToken } from '../../../utils/storageUtils'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { getAllTransactions } from '../../../utils/apiCalls'
import { useDebounce } from 'use-debounce'

const useCasinoTransactionsList = (email) => {
  const { userId } = useParams()
  const { t } = useTranslation('players')
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [selectedAction, setSelectedAction] = useState('all')
  const [limit, setLimit] = useState(15)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)

  const [state, setState] = useState([
    {
      startDate: getDateDaysAgo(10),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  const { data: transactionData, isLoading: loading } = useQuery({
    queryKey: ['transactionList', limit, page, userId, selectedCurrency, status, selectedAction, formatDateYMD(state.map(a => a.startDate)), formatDateYMD(state.map(a => a.endDate)), debouncedSearch],
    queryFn: ({ queryKey }) => {
      const params = {pageNo: queryKey[2], limit: queryKey[1]};
      if (queryKey[3]) params.userId = queryKey[3]
      if (queryKey[4]) params.amountType = queryKey[4]
      if (queryKey[5]) params.status = queryKey[5]
      if (queryKey[6]) params.transactionType = queryKey[6]
      if (queryKey[7]) params.startDate = queryKey[7]
      if (queryKey[8]) params.endDate = queryKey[8]
      if (queryKey[9]) params.email = queryKey[9]
      return getAllTransactions(params)
    },
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.transactionDetail
  })

  const totalPages = Math.ceil(transactionData?.count / limit)

  const getCsvDownloadUrl = () =>
    `${process.env.REACT_APP_API_URL}/api/v1/casino/transactions?csvDownload=true&limit=${limit}&pageNo=${page}&startDate=${formatDateYMD(state.map(a => a.startDate))}&endDate=${formatDateYMD(state.map(a => a.endDate))}&currencyCode=${selectedCurrency}&transactionType=${selectedAction}&status=${status}&email=&token=${getLoginToken()}&userId=${userId}`

  return {
    setSelectedCurrency,
    setLimit,
    setPage,
    totalPages,
    limit,
    page,
    setSelectedAction,
    selectedCurrency,
    selectedAction,
    state,
    setState,
    t,
    transactionData,
    loading,
    status,
    setStatus,
    getCsvDownloadUrl,
    search, 
    setSearch
  }
}

export default useCasinoTransactionsList
