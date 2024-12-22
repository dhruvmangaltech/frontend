import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from '../../../components/Toast'
import { getAllCasinoGames ,getAllCasinoSubCategories ,getAllCasinoProviders} from '../../../utils/apiCalls'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'
import { errorHandler, useDeleteCasinoGame ,useUpdateStatusMutation, useUploadGamesMutation} from '../../../reactQuery/hooks/customMutationHook'
import { useTranslation } from 'react-i18next'

const useCasinoGamesListing = () => {
  const navigate = useNavigate()
  const [limit, setLimit] = useState(15)
  const [page, setPage] = useState(1)
  const [casinoCategoryId, setCasinoCategoryId] = useState('')
  const [categoryId, setCategoryId] = useState(null)
  const [providerId,setProviderId] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryGameId, setCategoryGameId] = useState()
  const [active, setActive] = useState()
  const [show, setShow] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [type, setType] = useState('')
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [gameData, setGameData] = useState()
  const [orderBy, setOrderBy] = useState('masterCasinoGameId')
  const [sort, setSort] = useState('desc')
  const [over, setOver] = useState(false)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const { t } = useTranslation('casinoGames')
  

  const queryClient = useQueryClient()

  const getProviderName = (id) =>
  casinoProvidersData?.rows.find((val) => val.masterCasinoProviderId === id)?.name

  const selected = (h) =>
    orderBy === h.value &&
    h.label !== 'Thumbnail' &&
    h.label !== 'Status' &&
    h.label !== 'Sub Category' &&
    h.label !== 'Category'

  const handleShow = (id, active) => {
    setCategoryId(id)
    setActive(!active)
    setShow(true)
  }

  const handleDeleteYes = () => {
    deleteCasinoGame({ masterCasinoGameId : categoryGameId })
  }

  const handleDeleteModal = (id) => {
    setCategoryGameId(id)
    setDeleteModalShow(true)
  }

  const handleYes = () => {
    updateStatus({
      code: 'CATEGORY_GAME',
      masterCasinoGameId: categoryId,
      status: active
    }) 
  }



  const handleClose = () => setShowModal(false)
  const handleUploadClose = () => setShowUploadModal(false)

  const handleShowModal = (type, data, id) => {
    setGameData(data)
    setCategoryGameId(id)
    setType(type)
    setShowModal(true)
  }

  const { data: casinoProvidersData } = useQuery({
    queryKey: ['providersList'],
    queryFn: ({queryKey}) => {
      // const params = {pageNo: queryKey[2], limit: queryKey[1]};
      return getAllCasinoProviders()
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 'Infinity',
    select: (res) => res?.data?.casinoProvider
  })


  const { data: subCategories } = useQuery({
    queryKey: ['subCategories'],
    queryFn: ({queryKey}) => {  
      // const params = {pageNo: queryKey[2], limit: queryKey[1]};
      return getAllCasinoSubCategories()
    },
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 'Infinity',
    select: (res) => res?.data?.subCategory
  })


  const { data: casinoGames, isLoading: loading } = useQuery({
    queryKey: ['casinoGames', limit, page, orderBy, sort, statusFilter, casinoCategoryId, providerId, debouncedSearch],
    queryFn: ({ queryKey }) => {
      const params = {pageNo: queryKey[2], limit: queryKey[1]};
      if (queryKey[3]) params.orderBy = queryKey[3]
      if (queryKey[4]) params.sort = queryKey[4]
      if (queryKey[5]) params.isActive = statusFilter
      if (queryKey[6]) params.masterGameSubCategoryId  = casinoCategoryId
      if (queryKey[7]) params.providerId = providerId
      if (queryKey[8]) params.search = debouncedSearch
      return getAllCasinoGames(params)
    },
    select: (res) => res?.data?.casinoGames,
    refetchOnWindowFocus: false
  })

  const totalPages = Math.ceil(casinoGames?.count / limit)

  const { mutate: deleteCasinoGame } = useDeleteCasinoGame({onSuccess: ({data}) => {
    if(data.success) {
      if(data.message) toast(data.message, 'success')
      queryClient.invalidateQueries({ queryKey: ['casinoGames'] })
    }
    setDeleteModalShow(false)
  }})

  const { mutate: updateStatus } = useUpdateStatusMutation({onSuccess: ({data}) => {
    if(data.success) {
      if(data.message) toast(data.message, 'success')
      queryClient.invalidateQueries({ queryKey: ['casinoGames'] })
    }
    setShow(false)
  }, onError: (error) => {
    setShow(false)
    errorHandler(error)
  }})

  const { mutate: uploadGames, isLoading: uploadGamesLoading } = useUploadGamesMutation({onSuccess: ({data}) => {
    if(data.success) {
      toast(t('uploadGames.gamesUploadSuccessToast'), 'success')
      queryClient.invalidateQueries({ queryKey: ['casinoGames'] })
    }
    setShowUploadModal(false)
  }, onError: (error) => {
    setShowUploadModal(false)
    errorHandler(error)
  }})

  return {
    limit,
    page,
    loading,
    setLimit,
    setPage,
    totalPages,
    casinoGames,
    casinoCategoryId,
    setCasinoCategoryId,
    subCategories,
    casinoProvidersData,
    providerId,
    setProviderId,
    show,
    setShow,
    handleShow,
    handleYes,
    handleShowModal,
    showModal,
    type,
    handleClose,
    active,
    gameData,
    categoryGameId,
    setDeleteModalShow,
    deleteModalShow,
    handleDeleteYes,
    handleDeleteModal,
    statusFilter,
    setStatusFilter,
    setOrderBy,
    setSort,
    setOver,
    selected,
    sort,
    over,
    getProviderName,
    navigate,
    handleUploadClose,
    showUploadModal,
    setShowUploadModal,
    uploadGamesLoading,
    uploadGames,
    search,
    setSearch
  }
}

export default useCasinoGamesListing
