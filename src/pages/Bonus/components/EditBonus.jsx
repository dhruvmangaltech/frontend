import React from 'react'
import Preloader from '../../../components/Preloader'
import useBonusDetails from '../hooks/useBonusDetail'
import CreateBonus from './CreateBonus'

const EditBonus = () => {
  const { bonusByPageData, loading } = useBonusDetails()
  if(loading) return <Preloader />
  return <CreateBonus bonusData={bonusByPageData?.rows[0]} />
}

export default EditBonus
