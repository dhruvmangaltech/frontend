import React, { useState } from 'react'
import { Row, Col, Tabs, Tab, Button } from '@themesberg/react-bootstrap'
import Overview from './components/Overview'
// import UserWallet from './components/UserWallet'
import Preloader from '../../components/Preloader'
import usePlayerDetails from './usePlayerDetails'
// import Settings from './components/Settings'
// import GameReport from './components/GameReport'
// import useCheckPermission from '../../../utils/checkPermission'
// import YourBonuses from './components/YourBonuses'
// import { formatDate } from '../../../utils/dateFormatter'
// import FreeSpinBonusModal from '../../../components/FreeSpinBonusModal/FreeSpinBonusModal'
// import ManageMoney from '../../../components/ManageMoney'
// import ManageMoney from '../../components/ManageMoney'
// import CasinoTransactions from './components/CasinoTransactions'
// import TransactionBanking from './components/TransactionBanking'
import PlayerTab from './components/PlayerTab'
import EditPlayer from './components/EditPlayer'
import CasinoGameSearch from './components/CasinoGameSearch'
import ActivityLogs from './components/ActivityLogs'
import AddRemarks from './components/AddRemarks'
import { EditPlayerFieldContainer } from './style'
import { useNavigate } from 'react-router-dom'
import { AdminRoutes } from '../../routes'


const PlayerDetails = () => {
const navigate = useNavigate() 
const [currentSelectedTab, setCurrentSelectedTab] = useState('editParent');

 const {
    userData,
    loading,
    basicInfo,
    alertInfo,
    // selectedTab,
    // showManageMoneyModal,
    // setSelectedTab,
    getUserDetails,
    // setShowManageMoneyModal,
    userDocuments,
    updateDocument,
    handleVerify,
    show,
    setShow,
    handleYes,
    status,
    showReasonModal,
    handleClose,
    enable,
    setEnable,
    docLabels,
    handleReRequest,
    title,
    imagePreviewModalShow,
    setImagePreviewModalShow,
    handleImagePreview,
    imageUrl,
    setImageUrl,
    t,
    // getUserDocumentStart,
    refetchActivity,
    handelRefetchActivity,
    docStatus,
    setDocStatus,
    getActivityLogs
  } = usePlayerDetails()
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Row>
            <Col className='d-flex flex-wrap'>
              <h3>{t('playerDetails.title')}&nbsp;</h3>
              <h3 className='text-break'>
                <div className='d-flex'>
                  {userData?.username}              
                </div>
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Overview
                basicInfo={basicInfo}
                alertInfo = {alertInfo}
                userLimits={userData?.userLimit}
                user={userData}
                getUserDetails={getUserDetails}
                t={t}
              />
            </Col>
          </Row>
          <Row className='mt-3'>
       <Col>
          <Button
            variant='primary'
            className='me-2 my-2'
            onClick={() => navigate(AdminRoutes.Players)}

          >
            Player Search
          </Button>
        </Col>
       </Row>
          <Row className='my-5'>
            <Col>
              <PlayerTab
                basicInfo={userData}
                userData={userData}
                getUserDetails={getUserDetails}
                handelRefetchActivity={handelRefetchActivity}
                userDocuments={userDocuments}
                handleVerify={handleVerify}
                updateDocument={updateDocument}
                show={show}
                setShow={setShow}
                handleYes={handleYes}
                handleClose={handleClose}
                showReasonModal={showReasonModal}
                status={status}
                enable={enable}
                setEnable={setEnable}
                docLabels={docLabels}
                handleReRequest={handleReRequest}
                title={title}
                imagePreviewModalShow={imagePreviewModalShow}
                setImagePreviewModalShow={setImagePreviewModalShow}
                handleImagePreview={handleImagePreview}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                userLimits={userData?.userLimit}
                docStatus={docStatus}
                setDocStatus={setDocStatus}
                currentSelectedTab = {currentSelectedTab}
                setCurrentSelectedTab = {setCurrentSelectedTab}
                getActivityLogs={getActivityLogs}
              />
            </Col>
          </Row>

          {/* <EditPlayerFieldContainer>
            <Row>
              <Col>
                <EditPlayer userData={userData}
                  getUserDetails={getUserDetails} />
              </Col>
            </Row>
          </EditPlayerFieldContainer>
          {/* <Row>
            <Col>
              <AddRemarks
                userData={userData}
                handelRefetchActivity={handelRefetchActivity}
              />
            </Col>
          </Row> */}
          <Row>
            <Col>
              <ActivityLogs
                user={userData}
                refetchActivity={refetchActivity}
                handelRefetchActivity={handelRefetchActivity}
              />
            </Col>
          </Row>
          {/* <Row>
            <Col>
            {currentSelectedTab === '' && <CasinoGameSearch user={userData}/>}
            </Col>
          </Row> */}
         
          {/* <Tabs
              activeKey={selectedTab}
              onSelect={(tab) => setSelectedTab(tab)}
              className='nav-light'
              mountOnEnter
              unmountOnExit
            >
              <Tab eventKey='overview' title='Overview'>
                <div className='mt-5'>
                  <Row className='mt-3 d-flex'>
                    <Overview
                      basicInfo={basicInfo}
                      userLimits={userData?.userLimit}
                      user={userData}
                      getUserDetails={getUserDetails}
                      t={t}
                    />
                  </Row>
                </div>
              </Tab>

              <Tab eventKey='wallet' title='Wallet'>
                <div className='mt-5'>
                  <Row className='mt-3 d-flex flex-row-reverse text-right'>
                    <UserWallet myUserData={userData} t={t} />
                  </Row>
                </div>
              </Tab>

              <Tab eventKey='history' title='Bet History'>
                <div className='mt-5'>
                  <Row className='mt-3 d-flex flex-row-reverse text-right'>
                    <CasinoTransactions email={userData.email} />
                  </Row>
                </div>
              </Tab>

              <Tab eventKey='transactions' title='Transactions'>
                <div className='mt-5'>
                  <Row className='mt-3 d-flex flex-row-reverse text-right'>
                    <TransactionBanking email={userData.email} isAllUser={false}/>
                  </Row>
                </div>
              </Tab> */}

          {/* {!isHidden({ module: { key: 'Transactions', value: 'R' } }) &&
                <Tab eventKey='casino-transactions' title='Bet History'>
                  <div className='mt-5'>
                    <Row className='mt-3 d-flex flex-row-reverse '>
                      <CasinoTransactions />
                    </Row>
                  </div>
                </Tab>}

              {!isHidden({ module: { key: 'Transactions', value: 'R' } }) &&
                <Tab eventKey='transactions-banking' title='Transactions'>
                  <div className='mt-5'>
                    <Row className='mt-3 d-flex flex-row-reverse '>
                      <TransactionBanking />
                    </Row>
                  </div>
                </Tab>} */}

          {/* {!isHidden({ module: { key: 'GameReport', value: 'R' } }) &&
                <Tab eventKey='game-report' title='Game Report'>
                  <div className='mt-5'>
                    <Row className='mt-3 d-flex flex-row-reverse '>
                      <GameReport />
                    </Row>
                  </div>
                </Tab>}

              {!isHidden({ module: { key: 'Bonus', value: 'R' } }) &&
                <Tab eventKey='your-bonuses' title='Your Bonuses'>
                  <div className='mt-5'>
                    <YourBonuses
                      currencyCode={userData?.currencyCode}
                    />
                  </div>
                </Tab>}  */}

          {/* </Tabs> */}
        </>
      )}
    </>
  )
}

export default PlayerDetails
