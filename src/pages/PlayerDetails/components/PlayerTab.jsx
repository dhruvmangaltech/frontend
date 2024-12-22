import React, { useState } from "react";
import { Row, Col, Button, Tabs, Tab, Nav } from "@themesberg/react-bootstrap";
import { PlayersTabInfo } from "../constants";
import ResponsibleGaming from "../../../components/ResponsibleGaming";
import EditInfo from "./EditInfo";
import AuditTable from "./AuditTable";
import LogsTable from "./LogsTable";
import LexisNexisData from "./LexisNexisData";
import RSGData from "./RSGData";
import Settings from "./Settings";
import BankDetails from "./BankDetails";
import CommsTable from "./CommsTable";
import ActivityTable from "./Activity";
import VerificationDetails from "./Verification";
import { EditPlayerFieldContainer, PlayerTabContainer } from "../style";
import EditPlayer from "./EditPlayer";

const PlayerTab = (props) => {
  const {
    basicInfo,
    getUserDetails,
    userData,
    userDocuments,
    handleVerify,
    updateDocument,
    show,
    setShow,
    handleYes,
    handleClose,
    showReasonModal,
    status,
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
    userLimits,
    handelRefetchActivity,
    docStatus,
    setDocStatus,
    currentSelectedTab,
    setCurrentSelectedTab,
    getActivityLogs
  } = props;
  const [selectedInnerButton, setSelectedInnerButton] = useState({});
  const [openEditInfoModal, setOpenEditInfoModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showKYCHistory, setShowKYCHistory] = useState(false);

  const parentTabToggler = (itemValue) => {
    setCurrentSelectedTab(itemValue);
  };
  const handleCloseDocsModal = () => setShowModal(false);
  const handleCloseKYCHistory = () => setShowKYCHistory(false);
  const handleCloseKYCModal = () => setShowKYCModal(false);


  const setSelectedInnerToggler = (dataValue) => {
    switch (dataValue.innerItem) {
      case "isBan":
      case "isRestrict":
      case "phoneVerified":
      case "isRedemptionSubscribed":
      case "isSubscribed":
      case "isInternalUser":
      case "addDeductCoinsChild":
      case "vipTierChild":
      case "forceLogoutChild":
      case "passwordChild":
      case "removePwLock":
      case "socialSecurityChild":
      case "paynotePayment":
      case "tripleAPayment" :
        setOpenEditInfoModal(true);
        break;
      default:
        break;
    }
    setSelectedInnerButton(dataValue);
  };

  return (
    <PlayerTabContainer>
      <Tabs
        activeKey={currentSelectedTab}
        onSelect={(tab) => parentTabToggler(tab)}
        className='nav-light w-100 m-auto'
        mountOnEnter
        unmountOnExit
      >
        {Object.keys(PlayersTabInfo).map((item, parentIndex) => {
          return (
            <Tab
              eventKey={item}
              title={PlayersTabInfo[item].label}
              key={parentIndex}
            />
          );
        })}
      </Tabs>
      <Row className='mt-5 player-tab-wrap'>
        <Col className='text-center p-0'>
          {PlayersTabInfo[currentSelectedTab]?.childLabel?.map(
            (innerItem, index) => {
              return (
                <Button
                  // disabled={
                  //   innerItem.key === "removePwLock" &&
                  //   basicInfo.passwordAttempt <= 4
                  // }
                  variant='secondary'
                  className='me-2 my-2 edit-inner-tabwrap'
                  key={index}
                  onClick={() =>
                    setSelectedInnerToggler({
                      currentSelectedTab,
                      innerItem: innerItem.key,
                      type: innerItem?.type,
                    })
                  }
                >
                  {innerItem?.label}
                </Button>
              );
            }
          )}
          {selectedInnerButton?.innerItem === "limitsChild" &&
            selectedInnerButton?.currentSelectedTab === "editParent" && (
              <Col>
                <ResponsibleGaming
                  userLimits={userLimits}
                  user={userData}
                  currencyCode={userData?.currencyCode}
                  getUserDetails={getUserDetails}
                />
              </Col>
            )}
          {selectedInnerButton?.innerItem === "bankDetailsChild" &&
            selectedInnerButton?.currentSelectedTab === "editParent" && (
              <Col>
                <BankDetails user={userData} />
              </Col>
            )}
        </Col>
      </Row>
      {selectedInnerButton?.currentSelectedTab === "editParent" && (
        <EditInfo
          basicInfo={basicInfo}
          selectedInnerButton={selectedInnerButton}
          openEditInfoModal={openEditInfoModal}
          setOpenEditInfoModal={setOpenEditInfoModal}
          getUserDetails={getUserDetails}
          handelRefetchActivity={handelRefetchActivity}
          getActivityLogs={getActivityLogs}
        />
      )}
      {currentSelectedTab === "editParent" && (
        <>
          <EditPlayerFieldContainer>
            <Row>
              <Col>
                <EditPlayer userData={userData}
                  getUserDetails={getUserDetails} />
              </Col>
            </Row>
          </EditPlayerFieldContainer>
        </>
      )}
      {currentSelectedTab === "verificationParent" && (
        <>
          <Row>
            <Col xs={12} md={4} lg={4} className='mb-3'>

              {/* <Button variant='secondary' onClick={() => setShowModal(true)}>
                Upload Documents
              </Button> */}
            </Col>
            {/* <Col xs={12} md={4} lg={4} className='mb-3'>
            <div className='ticket-div'>
             <h5>This player has a pending verification ticket </h5>
              <Button variant='primary' onClick={() => handleResolve(true)} >
                Resolve
              </Button>
              </div>
            </Col> */}
            {/* <Col xs={12} md={4} lg={4} className='mb-3'>

            <div className='buttonDiv'>
               <h5> KYC Level : </h5> {userData?.kycStatus}

              <Button variant='primary' onClick={() => setShowKYCModal(true)} >
                Edit
              </Button>
              <Button variant='primary' onClick={() => setShowKYCHistory(true) }>
                KYC History
              </Button>
              </div>

            </Col>

            */}
          </Row>

          {/* <Settings
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
            docStatus={docStatus}
            setDocStatus={setDocStatus}
          /> */}
          <VerificationDetails
            basicInfo={basicInfo}
            userData={userData}
            userDocuments={userDocuments}
            showModal={showModal}
            showKYCHistory={showKYCHistory}
            showKYCModal={showKYCModal}
            handleClose={handleCloseDocsModal}
            handleCloseKYCHistory={handleCloseKYCHistory}
            handleCloseKYCModal={handleCloseKYCModal}
            handleImagePreview={handleImagePreview}
            getUserDetails={getUserDetails}
            handelRefetchActivity={handelRefetchActivity}
          />
        </>
      )}

      {currentSelectedTab === "activityParent" && (
        <ActivityTable basicInfo={basicInfo} />
      )}

      {/* {currentSelectedTab === "auditParent" && <AuditTable />}

      {currentSelectedTab === "rsgParent" && <RSGData />} */}

      {/* {currentSelectedTab === "lexisNexisParent" && (
        <LexisNexisData LNData={userData?.moreDetails} />
      )} */}

      {/* {currentSelectedTab === "logsParent" && <LogsTable />}

      {currentSelectedTab === "commsParent" && <CommsTable />} */}
    </PlayerTabContainer>
  );
};

export default PlayerTab;
