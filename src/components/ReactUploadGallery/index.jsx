import { Card } from '@themesberg/react-bootstrap'
import RUG from '../react-upload-gallery-master/RUG'
import '../react-upload-gallery-master/style.scss'
import useUploadGallery from './useUploadGallery'
import React from 'react'
import { DeleteConfirmationModal } from '../ConfirmationModal'
import { toast } from '../Toast'

const ReactUploadGallery = () => {
  const {
    initialState,
    customRequest,
    deleteModalShow,
    setDeleteModalShow,
    handleDeleteYes,
    setImageDelete,
    isHidden,
    t
  } = useUploadGallery()

  return (
    <Card className='mt-3'>
      <h3 className='m-2'>{t('title')}</h3>
      {initialState?.length > 0 &&
        <RUG
          initialState={initialState}
          customRequest={customRequest}
          className='m-3'
          isHidden={isHidden}
          onConfirmDelete={(currentImage) => {
            if (!isHidden({ module: { key: 'ImageGallery', value: 'D' } })) {
              setDeleteModalShow(true)
              setImageDelete(currentImage)
            } else {
              toast(t('deletePermissionNotGrantedToast'), 'error')
            }
          }}
          ssrSupport
          rules={{
            size: 1024
          }}

          accept={['jpg', 'jpeg', 'png']}

          onWarning={(type, rules) => {
            switch (type) {
              case 'accept':
                toast(`${t('extentionAllowedToast1')} ${rules.accept.join(', ')} ${t('extentionAllowedToast2')}`, 'error')
                break

              case 'size':
                toast(`${t('imageSizeErrorToast1')} <= ${rules.size / 1024}${t('imageSizeErrorToast2')}`, 'error')
                break

              default:
            }
          }}
        />}
      {initialState?.length < 1 &&
        <RUG
          initialState={[]}
          customRequest={customRequest}
          className='m-3'
          ssrSupport
          isHidden={isHidden}
          t={t}
        />}
      {
            deleteModalShow &&
              <DeleteConfirmationModal
                handleDeleteYes={handleDeleteYes}
                setDeleteModalShow={setDeleteModalShow}
                deleteModalShow={deleteModalShow}
              />
          }
    </Card>
  )
}

export default ReactUploadGallery