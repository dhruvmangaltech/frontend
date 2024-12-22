import React from 'react'
import ReactUploadGallery from '../../components/ReactUploadGallery'
import useCheckPermission from '../../utils/checkPermission'

const ImageGallery = () => {
  const { isHidden } = useCheckPermission()
  return (
    <>
      {!isHidden({ module: { key: 'ImageGallery', value: 'R' } }) && <ReactUploadGallery />}
    </>
  )
}

export default ImageGallery
