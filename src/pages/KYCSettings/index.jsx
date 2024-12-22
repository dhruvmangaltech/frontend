import React from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Tabs,
  Tab,
} from "@themesberg/react-bootstrap";
import useKycLabels from "./hooks/useKycLabels";
import RequestedKycListing from "./components/RequestedKycListing";
import KycLabelListing from "./components/KycLabelListing";
import KYCFlowsManagement from "./components/KYCFlowsManagement";

const KYCSettings = () => {
  const {
    t,
    selectedTab,
    setSelectedTab,
    setOver,
    over,
    setSort,
    sort,
    setOrderBy,
    selected,
    showModal,
    setShowModal,
    handleShowModal,
    handleClose,
    type,
    kycLabels,
    loading,
    handleSubmitKycLabel,
    selectedKycLabel,
    setSelectedKycLabel,
    pendingKycList,
    handleUpdateStatus,
    refetchPendingKycList,
    refetchKycLabels,
    limit,
    page,
    setLimit,
    setPage,
    handleUpdateKycFLow,
    kycCheck,
    refetchKycCheck,
  } = useKycLabels();
  return (
    <>
      <Row>
        <Col>
          <h3>{t("kycLabels")}</h3>
        </Col>
      </Row>
      <Tabs
        activeKey={selectedTab}
        onSelect={(tab) => setSelectedTab(tab)}
        className="nav-light m-auto w-100"
      >
        <Tab eventKey="kycLabels" title={t("kycLabels")}>
          <KycLabelListing
            t={t}
            selected={selected}
            setOver={setOver}
            over={over}
            setSort={setSort}
            sort={sort}
            setOrderBy={setOrderBy}
            handleShowModal={handleShowModal}
            showModal={showModal}
            handleClose={handleClose}
            type={type}
            kycLabels={kycLabels}
            loading={loading}
            handleSubmitKycLabel={handleSubmitKycLabel}
            selectedKycLabel={selectedKycLabel}
            setSelectedKycLabel={setSelectedKycLabel}
            handleUpdateStatus={handleUpdateStatus}
            refetchKycLabels={refetchKycLabels}
            selectedTab={selectedTab}
          />
        </Tab>

        <Tab eventKey="kycFlows" title="KYC Flows">
          <KYCFlowsManagement
            t={t}
            selected={selected}
            setOver={setOver}
            over={over}
            setSort={setSort}
            sort={sort}
            setOrderBy={setOrderBy}
            handleShowModal={handleShowModal}
            showModal={showModal}
            handleClose={handleClose}
            type={type}
            // kycFlows={kycFlows}
            // refetchKycFlows={refetchKycFlows}
            selectedTab={selectedTab}
            limit={limit}
            page={page}
            setLimit={setLimit}
            setPage={setPage}
            handleUpdateKycFLow={handleUpdateKycFLow}
            kycCheck={kycCheck}
            refetchKycCheck={refetchKycCheck}
          />
        </Tab>
        <Tab eventKey="requestedKycs" title={t("requestedKycs")}>
          <RequestedKycListing
            t={t}
            selected={selected}
            setOver={setOver}
            over={over}
            setSort={setSort}
            sort={sort}
            setOrderBy={setOrderBy}
            handleShowModal={handleShowModal}
            showModal={showModal}
            handleClose={handleClose}
            type={type}
            pendingKycList={pendingKycList}
            refetchPendingKycList={refetchPendingKycList}
            selectedTab={selectedTab}
            limit={limit}
            page={page}
            setLimit={setLimit}
            setPage={setPage}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default KYCSettings;
