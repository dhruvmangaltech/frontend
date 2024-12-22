import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { errorHandler, useDeleteCasinoSubCategory, useDeleteRewardSystem, useUpdateRewardSystemStatusMutation, useUpdateStatusMutation } from '../../../reactQuery/hooks/customMutationHook'
import { toast } from '../../../components/Toast'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useGetRewardSystemListingQuery } from '../../../reactQuery/hooks/customQueryHook'
import useDidMountEffect from '../../../utils/useDidMountEffect'

const useRewards = () => {
  const { t } = useTranslation(['rewardSystem'])
  const navigate = useNavigate()
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [vipTierId, setvipTierId] = useState('')
  const [active, setActive] = useState()
  const [show, setShow] = useState(false)
  const [over, setOver] = useState(false)
  const [limit, setLimit] = useState(15)
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState('packageId')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('desc')
  const [isActive, setIsActive] = useState('all')
  const [enabled, setEnabled] = useState(false)
  const selected = (h) =>
    orderBy === h.value &&
    h.label !== 'Status'

  const isInitialRender = useDidMountEffect()
  const { data, refetch: fetchData, isLoading: loading } = useGetRewardSystemListingQuery({
    params: {
      limit,
      pageNo: page,
      orderBy,
      sort,
      search,
      isActive,
    },
    enabled
  })
  useEffect(() => {
    setEnabled(true)
  }, [])
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!isInitialRender) {
        if (page === 1) {
          fetchData()
        } else {
          setPage(1)
        }
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [search])

  useEffect(() => {
    !isInitialRender && fetchData()
  }, [page])

  useEffect(() => {
    setPage(1)
    fetchData()
  }, [limit, orderBy, sort])

  const { mutate: deleteRewardSystem } = useDeleteRewardSystem({
    onSuccess: ({ data }) => {
      if (data.message) toast(data.message, 'success')
      fetchData()
      setDeleteModalShow(false)
    }, onError: (error) => {
      setDeleteModalShow(false)
      errorHandler(error)
    }
  })

  const handleDeleteYes = () => {
    deleteRewardSystem({ vipTierId })
  }
  const handleDeleteModal = (id) => {
    setvipTierId(id)
    setDeleteModalShow(true)
  }
  const handleShow = (id, active) => {
    setvipTierId(id)
    setActive(!active)
    setShow(true)
  }

  const { mutate: updateStatus } = useUpdateRewardSystemStatusMutation({onSuccess: ({data}) => {
      if(data.message) toast(data.message, 'success')
      fetchData()
    setShow(false)
  }, onError: (error) => {
    setShow(false)
    errorHandler(error)
  }})

  const handleYes = () => {
    updateStatus({
      vipTierId: vipTierId,
      isActive: active
    })
  }
  return {
    navigate,
    t,
    selected,
    data,
    fetchData,
    loading,show,setShow,active,
    setLimit, setOrderBy, setSearch, setSort, sort, setIsActive,handleShow,handleYes,
    handleDeleteModal, deleteModalShow, handleDeleteYes, setDeleteModalShow,
    setOver,
    over
  }
}

export default useRewards
