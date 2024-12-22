import React from "react";
import { Tabs, Tab, Row, Col } from "@themesberg/react-bootstrap";
import useCashierManagement from "./useCashierManagement";
import RedeemConfiguration from "./components/RedeemConfiguration";
import DepositConfiguration from "./components/DepositConfiguration";

const CashierManagement = () => {
  const {
    details,
    selectedTab,
    setSelectedTab,
    redeemConfigEditable,
    setRedeemConfigEditable,
    updateSiteConfig,
    updateDepositConfig,
    redeemConfigLoading,
    depositConfigLoading,
    depositConfigEditable,
    setDepositConfigEditable,
    t,
  } = useCashierManagement();

  return (
    <>
      <Row>
        <Col className="d-flex">
          <h3>{t("title")}</h3>
        </Col>
      </Row>
      <Tabs
        activeKey={selectedTab}
        onSelect={(tab) => setSelectedTab(tab)}
        className="nav-light m-auto w-100"
      >
        <Tab
          eventKey="redeemConfiguration"
          title={t("redeemConfiguration.title")}
        >
          <div className="mt-3">
            <RedeemConfiguration
              details={details}
              setEditable={setRedeemConfigEditable}
              editable={redeemConfigEditable}
              updateData={updateSiteConfig}
              loading={redeemConfigLoading}
            />
          </div>
        </Tab>
        {/* <Tab
          eventKey="depositConfiguration"
          title={t("depositConfiguration.title")}
        >
          <div className="mt-3">
            <DepositConfiguration
              details={details}
              setEditable={setDepositConfigEditable}
              editable={depositConfigEditable}
              updateData={updateDepositConfig}
              loading={depositConfigLoading}
            />
          </div>
        </Tab> */}
      </Tabs>
    </>
  );
};

export default CashierManagement;
