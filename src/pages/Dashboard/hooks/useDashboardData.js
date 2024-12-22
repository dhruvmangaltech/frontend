import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatDateYMD, getDateThreeMonthsBefore } from '../../../utils/dateFormatter'
import { getReports } from '../../../utils/apiCalls'

const useDashboardDataListing = (economicDataAccordionOpen = false,transactionDataAccordianOpen= false) => {
  const { t } = useTranslation(['dashboard'])
  const [playerType, setPlayerType] = useState('all')
  const [startDate, setStartDate] = useState(formatDateYMD(getDateThreeMonthsBefore()))
  const [endDate, setEndDate] = useState(formatDateYMD(new Date()))

  const { data: dashboardData} = useQuery({
    queryKey: ['dashboardReport'],
    queryFn: () => {
      const params = { reportType: 'dashboardData' }
      return getReports(params)
    },
    select: (res) => res?.data,
    refetchOnWindowFocus: false,
  })

  const { data: reportData, isFetching: reportLoading, refetch: reportRefetch, isRefetching: isReportRefetching } = useQuery({
    queryKey: ['loginReport'],
    queryFn: () => {
      const params = { playerType, startDate: startDate, endDate: endDate,reportType: 'loginData' }
      return getReports(params)
    },
    select: (res) => res?.data,
    refetchOnWindowFocus: false,
  })

  const { data: customerData, isFetching: customerLoading, refetch: customerRefetch, isRefetching: isCustomerRefetching } = useQuery({
    queryKey: ['customerReport'],
    queryFn: () => {
      const params = { playerType, startDate: startDate, endDate: endDate,reportType: 'customerData' }
      return getReports(params)
    },
    select: (res) => res?.data,
    refetchOnWindowFocus: false,
  })
  const { data: economyData, isFetching: economyLoading, refetch: economyRefetch, isRefetching: isEconomyRefetching } = useQuery({
    queryKey: ['economyReport'],
    queryFn: () => {
      const params = { playerType, startDate: startDate, endDate: endDate,reportType: 'economyData' }
      return getReports(params)
    },
    enabled: economicDataAccordionOpen,
    select: (res) => res?.data,
    refetchOnWindowFocus: false,
  })

  const { data: transactionData, isFetching: transactionLoading, refetch: transactionRefetch, isRefetching: isTransactionRefetching } = useQuery({
    queryKey: ['transactionReport'],
    queryFn: () => {
      const params = { playerType, startDate: startDate, endDate: endDate,reportType: 'transactionData' }
      return getReports(params)
    },
    enabled: transactionDataAccordianOpen,
    select: (res) => res?.data,
    refetchOnWindowFocus: false,
  })

  return {
    reportData: reportData,customerData,economyData,transactionData,
    reportRefetch,customerRefetch,transactionRefetch,economyRefetch,
    reportLoading,customerLoading,economyLoading,transactionLoading,
    isReportRefetching,
    playerType,
    setPlayerType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    dashboardData,
    t
  }
}

export default useDashboardDataListing
