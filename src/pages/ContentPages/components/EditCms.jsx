import React from 'react'
import useCmsDetails from '../hooks/useCmsDetails'
import CreateCms from './CreateCms'
import Preloader from '../../../components/Preloader'

const EditCms = () => {
  const { cmsByPageIdData, loading } = useCmsDetails()
  if(loading) return <Preloader />
  return <CreateCms cmsData={cmsByPageIdData} />
}

export default EditCms
