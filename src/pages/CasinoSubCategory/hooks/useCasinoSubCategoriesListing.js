import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { errorHandler, useDeleteCasinoSubCategory, useUpdateStatusMutation } from '../../../reactQuery/hooks/customMutationHook'
import { toast } from '../../../components/Toast'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'
import { getAllCasinoCategories, getAllCasinoSubCategories } from '../../../utils/apiCalls'
import { useTranslation } from 'react-i18next'

const useCasinoCategoriesListing = () => {
  const { t } = useTranslation(['casino'])
  const navigate = useNavigate()
  const [limit, setLimit] = useState(15)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryId, setCategoryId] = useState()
  const [active, setActive] = useState()
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [type, setType] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [orderBy, setOrderBy] = useState('masterGameSubCategoryId')
  const [sort, setSort] = useState('desc')
  const [over, setOver] = useState(false)
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [masterGameSubCategoryId, setMasterGameSubCategoryId] = useState('')
  const queryClient = useQueryClient()

  const { data: casinoCategories } = useQuery({
    queryKey: ['casinoCategories', limit, page],
    queryFn: ({ queryKey }) => {
      const params = {pageNo: queryKey[2], limit: queryKey[1]};
      return getAllCasinoCategories(params)
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 'Infinity',
    select: (res) => res?.data?.casinoCategories
  })

  const { data: subCategories, isLoading: loading } = useQuery({
    queryKey: ['casinoSubCategories', limit, page, debouncedSearch, orderBy, sort, statusFilter, categoryFilter],
    queryFn: ({ queryKey }) => {
      const params = {pageNo: queryKey[2], limit: queryKey[1]};
      if (queryKey[3]) params.search = queryKey[3]
      if (queryKey[4]) params.orderBy = queryKey[4]
      if (queryKey[5]) params.sort = queryKey[5]
      if (queryKey[6]) params.isActive = statusFilter
      if (queryKey[7]) params.masterGameCategoryId = categoryFilter
      return getAllCasinoSubCategories(params)
    },
    select: (res) => res?.data?.subCategory,
    refetchOnWindowFocus: false
  })

  const totalPages = Math.ceil(subCategories?.count / limit)

  const selected = (h) =>
    orderBy === h.value &&
    h.label !== 'Status' &&
    h.label !== 'Icon' &&
    h.label !== 'Category Name' &&
    h.label !== 'Actions'

  const handleShow = (id, active) => {
    setCategoryId(id)
    setActive(!active)
    setShow(true)
  }

  const { mutate: updateStatus } = useUpdateStatusMutation({onSuccess: ({data}) => {
    if(data.success) {
      if(data.message) toast(data.message, 'success')
      queryClient.invalidateQueries({ queryKey: ['casinoSubCategories'] })
    }
    setShow(false)
  }, onError: (error) => {
    setShow(false)
    errorHandler(error)
  }})

  const handleYes = () => {
    updateStatus({
      code: 'CASINO_SUB_CATEGORY',
      masterGameSubCategoryId: categoryId,
      status: active
    })
  }

  const handleClose = () => setShowModal(false)

  const handleShowModal = (type) => {
    setType(type)
    setShowModal(true)
  }

  const { mutate: deleteSubCategory } = useDeleteCasinoSubCategory({onSuccess: ({data}) => {
    if(data.success) {
      if(data.message) toast(data.message, 'success')
      queryClient.invalidateQueries({ queryKey: ['casinoSubCategories'] })
    }
    setDeleteModalShow(false)
  }, onError: (error) => {
    setDeleteModalShow(false)
    errorHandler(error)
  }})

  const handleDeleteYes = () => {
    deleteSubCategory({ masterGameSubCategoryId })
  }

  const handleDeleteModal = (id) => {
    setMasterGameSubCategoryId(id)
    setDeleteModalShow(true)
  }

  return {
    t,
    search,
    setSearch,
    limit,
    page,
    loading,
    subCategories,
    casinoCategories,
    show,
    setLimit,
    setPage,
    setShow,
    totalPages,
    handleShow,
    handleYes,
    handleShowModal,
    showModal,
    type,
    handleClose,
    selectedSubCategory,
    setSelectedSubCategory,
    setCategoryFilter,
    categoryFilter,
    active,
    navigate,
    statusFilter,
    setStatusFilter,
    setOrderBy,
    setSort,
    setOver,
    selected,
    sort,
    over,
    handleDeleteModal,
    handleDeleteYes,
    deleteModalShow,
    setDeleteModalShow
  }
}

export default useCasinoCategoriesListing
