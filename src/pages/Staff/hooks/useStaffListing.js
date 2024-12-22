import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { toast } from '../../../components/Toast'
import { errorHandler, useDeleteStaff, useUpdateStatusMutation } from '../../../reactQuery/hooks/customMutationHook'
import { adminRoles, getAllAdmins } from '../../../utils/apiCalls'

const useStaffListing = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['staff'])
  const [limit, setLimit] = useState(15)
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState('adminUserId')
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [sort, setSort] = useState('desc')
  const [over, setOver] = useState(false)
  const [adminUserId, setAdminUserId] = useState()
  const [active, setActive] = useState()
  const [show, setShow] = useState(false)
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [staffId, setStaffId] = useState('')
  const queryClient = useQueryClient()

  const { data, isLoading: loading } = useQuery({
    queryKey: ['staffList', limit, page, debouncedSearch, orderBy, sort],
    queryFn: ({ queryKey }) => {
      const params = {pageNo: queryKey[2], limit: queryKey[1]};
      if (queryKey[3]) params.search = queryKey[3]
      if (queryKey[4]) params.orderBy = queryKey[4]
      if (queryKey[5]) params.sort = queryKey[5]
      return getAllAdmins(params)
    },
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.adminDetails
  })
  const totalPages = Math.ceil(data?.count / limit)
  const { data: adminRole } = useQuery({
    queryKey: ['adminRoles'],
    queryFn: adminRoles,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 'Infinity',
    select: (res) => res?.data.roles
  })

  const getRole = (id) =>
    adminRole && adminRole.find((obj) => obj.roleId === id).name

  const handleShow = (id, active) => {
    setAdminUserId(id)
    setActive(!active)
    setShow(true)
  }

  const { mutate: updateStatus } = useUpdateStatusMutation({onSuccess: ({data}) => {
    if(data.success) {
      if(data.message) toast(data.message, 'success')
      queryClient.invalidateQueries({ queryKey: ['staffList'] })
    }
  }, onError: (error) => {
    errorHandler(error)
  }})

  const handleYes = () => {
    const data = {
      code: 'ADMIN',
      adminId: adminUserId,
      status: active
    }
    updateStatus(data)
    setShow(false)
  }
  const selected = (h) =>
    orderBy === h.value &&
    h.labelKey !== 'headers.role' &&
    h.labelKey !== 'headers.status' &&
    h.labelKey !== 'headers.action' &&
    h.labelKey !== 'headers.group'

  const { mutate: deleteStaff } = useDeleteStaff({onSuccess: () => {
      toast(t('deleteSuccessToast'), 'success')
      queryClient.invalidateQueries({ queryKey: ['staffList'] })
      setDeleteModalShow(false)
  }, onError: (error) => {
    errorHandler(error)
    setDeleteModalShow(false)
  }})

  const handleDeleteModal = (id) => {
      setStaffId(id)
      setDeleteModalShow(true)
  }

  const handleDeleteYes = () => {
    deleteStaff({adminId: staffId})
  }

  return {
    navigate,
    limit,
    setLimit,
    page,
    setPage,
    setOrderBy,
    sort,
    setSort,
    search,
    setSearch,
    show,
    setShow,
    over,
    setOver,
    data,
    totalPages,
    getRole,
    handleShow,
    handleYes,
    selected,
    active,
    t,
    loading,
    handleDeleteModal,
    handleDeleteYes,
    deleteModalShow,
    setDeleteModalShow
  }
}

export default useStaffListing
