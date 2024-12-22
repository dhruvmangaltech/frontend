import React, { useState, useEffect } from 'react'

import { Tabs, Tab, Row, Col, Button } from '@themesberg/react-bootstrap'
import useProfilePage from './useProfilePage'
import { profileConstants } from './constants'
import Overview from './components/Overview'
import Permission from './components/Permission'
import SiteConfiguration from './components/SiteConfiguration'
import Hierarchy from '../../components/Hierarchy'
import Credentials from './components/Credentials'
import QRBlock from './components/QRBlock'
import { updatePermissionsOrder } from '../../utils/helper'

const ProfilePage = () => {
  const {
    details,
    selectedTab,
    setSelectedTab,
    editable,
    setEditable,
    updateData,
    loading,
    siteConfigLoading,
    type,
    setType,
    adminDetails,
    setUserDetails,
    updateCredentials,
    editableCreds,
    setEditableCreds,
    siteConfigEditable,
    setSiteConfigEditable,
    updateSiteConfig,
    preview,
    handleImagePreview,
    t,
    qrcodeUrlInfo,
    toggleForQRModal,
    openQRModalToggle,
    isGetOtpLoading,
    disable2FA
  } = useProfilePage()

  const [refreshHierarchy, setRefreshHierarchy] = useState(false)

  const constant = profileConstants

  const handleRefreshClick = () => {
    setRefreshHierarchy(prev => !prev)
  }

  return (
    <>
      <Row>
        <Col className='d-flex'>
          <h3>{t('title')}</h3>
        </Col>
      </Row>
      <Tabs
        activeKey={selectedTab}
        onSelect={(tab) => setSelectedTab(tab)}
        className='nav-light m-auto w-100'
      >
        <Tab eventKey='overview' title={t('overview')}>
          <div className='mt-3 p-2'>
            <Overview
              details={details}
              adminDetails={adminDetails}
              setEditable={setEditable}
              editable={editable}
              updateData={updateData}
              constant={constant}
              type={type}
              setType={setType}
              loading={loading}
              disable2FA={disable2FA}
              openQRModalToggle={openQRModalToggle}
              isGetOtpLoading={isGetOtpLoading}
            />
          </div>
          <QRBlock
            qrcodeUrlInfo={qrcodeUrlInfo}
            toggleForQRModal={toggleForQRModal}
            from2FAQr={true}
            setUserDetails={setUserDetails}
            adminDetails={adminDetails}
          />
        </Tab>

        {/* {adminDetails?.roleId === 1 && (
          <Tab eventKey='credentials' title={t('credentials')}>
            <div className='mt-3'>
              <Credentials
                details={details}
                updateCreds={updateCredentials}
                loading={loading}
                editableCreds={editableCreds}
                setEditableCreds={setEditableCreds}
              />
            </div>
          </Tab>
        )
        } */}

        {adminDetails?.roleId === 1 && (
          <Tab eventKey='siteConfiguration' title={t('siteConf')}>
            <div className='mt-3'>
              <SiteConfiguration
                details={details}
                setEditable={setSiteConfigEditable}
                editable={siteConfigEditable}
                updateData={updateSiteConfig}
                loading={siteConfigLoading}
                preview={preview}
                handleImagePreview={handleImagePreview}
              />
            </div>
          </Tab>
        )}

        <Tab eventKey='permissions' title={t('permissionsTitle')}>
          <div className='mt-3'>
            <Permission details={updatePermissionsOrder(details)} t={t} />
          </div>
        </Tab>
        {adminDetails?.roleId !== 3 && (
          <Tab eventKey='usersTree' title={t('tree')}>
            <div className='mt-5'>
              <Row className='mt-3 d-flex flex-row-reverse text-right relative'>
                {details && details?.adminUserId && (
                  <Hierarchy
                    key={refreshHierarchy} // Use refreshHierarchy as the key
                    adminDetails={{
                      name: `${details?.firstName} ${details?.lastName}`,
                      id: details?.adminUserId,
                      children: [],
                      isInitial: true,
                      data: { roleId: details?.roleId }
                    }}
                  />
                )}
                <Button className='tree-refresh-button' onClick={handleRefreshClick}>
                  Refresh
                </Button>
              </Row>
            </div>
          </Tab>
        )}
      </Tabs>
    </>
  )
}

export default ProfilePage
