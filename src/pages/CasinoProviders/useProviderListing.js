import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllCasinoProviders } from '../../utils/apiCalls'
import { errorHandler, useCreateCasinoProvidersMutation, useDeleteProvider, useUpdateCasinoProvidersMutation, useUpdateStatusMutation } from '../../reactQuery/hooks/customMutationHook'
import { toast } from '../../components/Toast'
import { useTranslation } from 'react-i18next'
import { serialize } from 'object-to-formdata'
// import { resetRestrictedCountriesStart } from '../../../store/redux-slices/fetchData'
// import { createCasinoProviderStart, getAllCasinoProvidersStart, getSAdminAggregatorsStart, updateCasinoProviderStart, updateCasinoStatusStart } from '../../../store/redux-slices/superAdminCasinoManagement'

const useProviderListing = () => {
  // const dispatch = useDispatch()
  const { t } = useTranslation(['casino'])
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [limit, setLimit] = useState(15)
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState('masterCasinoProviderId')
  const [sort, setSort] = useState('desc')
  const [over, setOver] = useState(false)
  const [show, setShow] = useState(false)
  const [providerId, setProviderId] = useState()
  const [status, setStatus] = useState()
  const [statusShow, setStatusShow] = useState(false)
  const [data, setData] = useState()
  const [type, setType] = useState('')
  const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [providerDeleteId, setProviderDeleteId] = useState('')

  const { data: casinoProvidersData } = useQuery({
    queryKey: ['providersList', limit, page, orderBy, sort],
    queryFn: ({ queryKey }) => {
      const params = {pageNo: queryKey[2], limit: queryKey[1], orderBy: queryKey[3], sort: queryKey[4]};
      return getAllCasinoProviders(params)
    },
    select: (res) => res?.data?.casinoProvider,
    refetchOnWindowFocus: false
  })

  const totalPages = Math.ceil(casinoProvidersData?.count / limit)

  const selected = (h) =>
  orderBy === h.value &&
  h.labelKey !== 'Thumbnail' &&
  h.labelKey !== 'Actions'

  const handleClose = () => setShow(false)
  const handleShow = (type, data) => {
    setType(type)
    setData(data)
    setShow(true)
  }

  const handleStatusShow = (id, status) => {
    setProviderId(id)
    setStatus(!status)
    setStatusShow(true)
  }

  const { mutate: updateStatus } = useUpdateStatusMutation({onSuccess: ({data}) => {
    if(data.success) {
      if(data.message) toast(data.message, 'success')
      queryClient.invalidateQueries({ queryKey: ['providersList'] })
      setStatusShow(false)
    }
  }, onError: (error) => {
    errorHandler(error)
  }})

  const handleYes = () => {
    updateStatus({
      code: 'CASINO_PROVIDER',
      masterCasinoProviderId: providerId,
      status
    })
  }

  const { mutate: deleteProvider } = useDeleteProvider({onSuccess: () => {
    toast(t('casinoProvider.deleteProviderSuccessToast'), 'success')
    queryClient.invalidateQueries({ queryKey: ['providersList'] })
    setDeleteModalShow(false)
  }})

  const { mutate: updateCasinoProvider, isLoading: updateLoading } = useUpdateCasinoProvidersMutation({onSuccess: () => {
    toast(t('casinoProvider.editProviderSuccessToast'), 'success')
    queryClient.invalidateQueries({ queryKey: ['providersList'] })
    handleClose()
  }})

  const updateProvider = (data, { masterCasinoProviderId }) => {
    if(data?.thumbnail == null) delete data.thumbnail
    updateCasinoProvider(serialize({
      ...data,
      masterCasinoProviderId,
    }))
  }

  const { mutate: createCasinoProvider, isLoading: createLoading } = useCreateCasinoProvidersMutation({onSuccess: () => {
    toast(t('casinoProvider.createProviderSuccessToast'), 'success')
    queryClient.invalidateQueries({ queryKey: ['providersList'] })
    handleClose()
  }})
  const createProvider = (data) => {
    createCasinoProvider(serialize({
      ...data,
      masterGameAggregatorId: 1
    }))
  }

  const handleDeleteModal = (id) => {
    setProviderDeleteId(id)
    setDeleteModalShow(true)
  }

  const handleDeleteYes = () => {
    deleteProvider({masterCasinoProviderId: providerDeleteId})
  }

  return {
    t,
    limit,
    setLimit,
    page,
    setPage,
    show,
    statusShow,
    setStatusShow,
    createUpdateLoading: createLoading || updateLoading,
    data,
    type,
    casinoProvidersData,
    totalPages,
    handleClose,
    handleShow,
    handleStatusShow,
    handleYes,
    loading: false,
    createProvider,
    updateProvider,
    status,
    navigate,
    setOrderBy,
    selected,
    sort,
    setSort,
    over,
    setOver,
    providerId,
    setProviderDeleteId,
    handleDeleteModal,
    deleteModalShow,
    setDeleteModalShow,
    handleDeleteYes
  }
}

export default useProviderListing
