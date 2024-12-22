import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getAllCasinoCategories, getAllCasinoSubCategories, getCasinoSubcategoryGames } from '../../../utils/apiCalls'
import { useReorderSubCategoryGamesMutation } from '../../../reactQuery/hooks/customMutationHook'
import { toast } from '../../../components/Toast'
import { useTranslation } from 'react-i18next'

const useGameReorder = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['casino'])

  const [reOrderedGame, setReorderedGame] = useState({ rows: [], count: 0 })
  const [casinoGames, setCasinoGames] = useState({ rows: [], count: 0 })
  const [categoryFilter, setCategoryFilter] = useState('')
  const [casinoCategoryId, setCasinoCategoryId] = useState('')

  const { data: casinoCategories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['casinoCategories'],
    queryFn: () => getAllCasinoCategories(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 'Infinity',
    select: (res) => res?.data?.casinoCategories
  })

  const { data: subCategories, isLoading: subCategoriesLoading } = useQuery({
    queryKey: ['casinoSubCategories', categoryFilter],
    queryFn: ({ queryKey }) => {
      const params = {};
      if(queryKey[1]) params.masterGameCategoryId = queryKey[1]
      return getAllCasinoSubCategories(params)
    },
    select: (res) => res?.data?.subCategory,
    refetchOnWindowFocus: false,
  })

  const { isInitialLoading: subCategoryGamesLoading, refetch: refetchSubcategoryGames } = useQuery({
    queryKey: ['casinoSubCategoryGames', casinoCategoryId, true],
    queryFn: ({ queryKey }) => {
      const params = {};
      if(queryKey[1]) params.masterGameSubCategoryId = queryKey[1]
      if(queryKey[2]) params.flag = queryKey[2]
      return getCasinoSubcategoryGames(params)
    },
    enabled: !!casinoCategoryId,
    onSuccess: (data) => {
      setCasinoGames({ rows: data, count: data?.length })
    },
    select: (res) => res?.data?.casinoGames,
    refetchOnWindowFocus: false,
  })

  const [limit, setLimit] = useState(15)
  const [page, setPage] = useState(1)

  // const totalPages = Math.ceil(games?.count / limit)

  const reorder = (reorderItem, startIndex, endIndex) => {
    const result = Array.from(reorderItem)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const rows = reorder(
      reOrderedGame.rows,
      result.source.index,
      result.destination.index
    )
    setReorderedGame({ rows, count: rows.length })
  }

  const handleAddGame = (item) => {
    setReorderedGame((oldItem) => {
      const newArray = [...oldItem.rows, item]
      return { rows: newArray, count: newArray.length }
    })
    setCasinoGames((oldItem) => {
      const newArray = oldItem?.rows.filter((gameItem) => gameItem.masterCasinoGameId !== item.masterCasinoGameId)
      return { rows: newArray, count: newArray.length }
    })
  }

  const handRemoveGame = (item) => {
    setCasinoGames((oldItem) => {
      const newArray = [...oldItem.rows, item]
      return { rows: newArray, count: newArray.length }
    })
    setReorderedGame((oldItem) => {
      const newArray = oldItem?.rows.filter((gameItem) => gameItem.masterCasinoGameId !== item.masterCasinoGameId)
      return { rows: newArray, count: newArray.length }
    })
  }

  const { mutate: reorderSubCategoryGames, isLoading: updateLoading } = useReorderSubCategoryGamesMutation({onSuccess: () => {
    toast(t('casinoGames.reorder.reorderGameSuccess'), 'success')
    refetchSubcategoryGames()
    setReorderedGame({ rows: [], count: 0 })
  }})

  const handleSave = () => {
    const orderedGames = []
    const unOrderedGames = []
    reOrderedGame && reOrderedGame.rows.map((list) => orderedGames.push(list.GameSubcategaries[0].gameSubcategoryId))
    casinoGames && casinoGames.rows.map((list) => unOrderedGames.push(list.GameSubcategaries[0].gameSubcategoryId))

    const data = {
      order: [...orderedGames, ...unOrderedGames],
      masterGameSubCategoryId: +casinoCategoryId,
    }
    reorderSubCategoryGames(data)
  }

  return {
    t,
    loading: categoriesLoading || subCategoriesLoading || subCategoryGamesLoading || updateLoading,
    reOrderedGame,
    onDragEnd,
    handleSave,
    navigate,
    casinoGames,
    handRemoveGame,
    handleAddGame,
    casinoCategories,
    categoryFilter,
    setCategoryFilter,
    // totalPages,
    setLimit,
    setPage,
    limit,
    page,
    subCategories,
    casinoCategoryId,
    setCasinoCategoryId,
    setReorderedGame,
    setCasinoGames,
  }
}

export default useGameReorder
