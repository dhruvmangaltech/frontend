import { useQueryClient } from '@tanstack/react-query'
import { toast } from '../../../components/Toast'
import { useTranslation } from 'react-i18next'
import { errorHandler, useCreateCasinoCategoryMutation, useUpdateCasinoCategoryMutation } from '../../../reactQuery/hooks/customMutationHook'

const useCreateCasinoCategory = (handleClose) => {
  const { t } = useTranslation(['casino'])
  const queryClient = useQueryClient()
  const { mutate: updateCategory, isLoading: updateLoading } = useUpdateCasinoCategoryMutation({onSuccess: () => {
    toast(t('casinoCategory.categoryUpdateToast'), 'success')
    queryClient.invalidateQueries({ queryKey: ['casinoCategories'] })
    handleClose()
  }, onError: (error) => {
    handleClose()
    errorHandler(error)
  }})

  const updateCasinoCategory = (data) => {
    updateCategory(data)
  }

  const { mutate: createCategory, isLoading: createLoading } = useCreateCasinoCategoryMutation({onSuccess: () => {
    toast(t('casinoCategory.categoryCreateToast'), 'success')
    queryClient.invalidateQueries({ queryKey: ['casinoCategories'] })
    handleClose()
  }, onError: (error) => {
    handleClose()
    errorHandler(error)
  }})

  const createCasinoCategory = (data) => {
    createCategory(data)
  }

  return {
    loading: updateLoading || createLoading,
    updateCasinoCategory,
    createCasinoCategory
  }
}

export default useCreateCasinoCategory
