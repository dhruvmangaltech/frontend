import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDidMountEffect from '../../../utils/useDidMountEffect'
import { useGetPackagesListingQuery } from '../../../reactQuery/hooks/customQueryHook'
import { useTranslation } from 'react-i18next'
import { errorHandler, useUpdatePackageStatusMutation } from '../../../reactQuery/hooks/customMutationHook'
import { toast } from '../../../components/Toast'

const usePackagesListing = () => {
  const navigate = useNavigate()
  const [packageId, setPackageId] = useState('')
  const [limit, setLimit] = useState(15)
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState('packageId')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('desc')
  const [over, setOver] = useState(false)
  const [active, setActive] = useState()
  const [enabled, setEnabled] = useState(false)
  const [show, setShow] = useState(false)
  const [hot, setHot] = useState('')
  const [isActive, setIsActive] = useState('all')
  const [isVisibleInStore, setIsVisibleInStore] = useState('')
  const { t } = useTranslation(['packages'])


  const isInitialRender = useDidMountEffect()
  const { data, refetch: fetchData, isLoading: loading } = useGetPackagesListingQuery({
    params: {
      limit,
      pageNo: page,
      orderBy,
      sort,
      search,
      hot,
      isActive,
      isVisibleInStore
    },
    enabled
  })

  const totalPages = Math.ceil(data?.count / limit)

  useEffect(() => {
    setEnabled(true)
  }, [])

  const handleShow = (id, active) => {
    setPackageId(id)
    setActive(!active)
    setShow(true)
  }

  const { mutate: updateStatus } = useUpdatePackageStatusMutation({
    onSuccess: ({ data }) => {
      if (data.message) toast(data.message, 'success')
      fetchData()
      setShow(false)
    }, onError: (error) => {
      setShow(false)
      errorHandler(error)
    }
  })


  const handleYes = () => {
    updateStatus({
      packageId: packageId,
      isActive: active
    })
  }

  const selected = (h) =>
    orderBy === h.value &&
    h.labelKey !== 'Role' &&
    h.labelKey !== 'Status' &&
    h.labelKey !== 'Action' &&
    h.labelKey !== 'Group'

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

  return {
    loading,
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
    handleShow,
    handleYes,
    selected,
    active,
    setHot,
    setIsActive,
    setIsVisibleInStore,
    hot,
    isActive,
    isVisibleInStore,
    fetchData,
    t
  }
}

export default usePackagesListing
