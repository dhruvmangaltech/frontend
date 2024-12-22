import { Card } from '@themesberg/react-bootstrap'
import React from 'react'
import RouteWithSidebar from '../RouteWithSidebar'
import usePrivateRoute from './usePrivateRoute'
import { Navigate, useNavigate } from 'react-router-dom'
import { AdminRoutes } from '../../routes'
import { useEffect } from 'react'
import { getLoginToken } from '../../utils/storageUtils'

const PrivateRoute = ({isWithoutCard = false, children, module }) => {
  const { userDetails, loading, permissions } = usePrivateRoute()
  const navigate = useNavigate()
  useEffect(() => {
    if(!getLoginToken()) navigate(AdminRoutes.AdminSignin)
  }, [getLoginToken()])
  return (
    userDetails && !loading && 
    ((!module || permissions[Object.keys(module)?.[0]]?.includes(module[Object.keys(module)?.[0]]))
      ? (
        <RouteWithSidebar key={children}>
          {isWithoutCard
            ? children
            : <Card className='p-2'>{children}</Card>}
        </RouteWithSidebar>)
      : <Navigate replace to={AdminRoutes.Profile} />)
  )
}

export default PrivateRoute
