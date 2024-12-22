import React, { useState } from 'react';
import { Row,Col, Card, Table } from '@themesberg/react-bootstrap';
import useDashboardDataListing from './hooks/useDashboardData';
import DashBoardFilters from './DashBoardFilters';
import DashboardCharts from './DashboardCharts';
import LoginDataTable from './Tables/LoginDataTable';
import CustomerTable from './Tables/CustomerDataTable';
import EconomyTable from './Tables/EconomyTable';
import TransactionTable from './Tables/TransactionsTable';

const Dashboard = () => {
  const [economicDataAccordionOpen, setEconomicDataAccordionOpen] = useState(false);
  const [transactionDataAccordianOpen, setTransactionDataAccordianOpen] = useState(false);

  const {
    reportData,customerData,economyData,transactionData,dashboardData,
    reportRefetch,customerRefetch,transactionRefetch,economyRefetch,
    playerType,
    setPlayerType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    t,
  } = useDashboardDataListing(economicDataAccordionOpen,transactionDataAccordianOpen);
  return (
    <>
     <Row>
        <Col className='d-flex'>
          <h3>{t('title')}</h3>
        </Col>
      </Row>
      <Card className='p-2 mb-2'>
        
        <DashboardCharts customerData={customerData} loginData={reportData} economyData={economyData} transactionData={transactionData} data={dashboardData}/>
        <DashBoardFilters
          setPlayerType={setPlayerType}
          playerType={playerType}
          startDate={startDate}
          setEndDate={setEndDate}
          endDate={endDate}
          setStartDate={setStartDate}
          t={t}
          reportRefetch={reportRefetch}
          customerRefetch={customerRefetch}
          transactionRefetch={transactionRefetch}
          economyRefetch={economyRefetch}
          economicDataAccordionOpen ={economicDataAccordionOpen}
          transactionDataAccordianOpen={transactionDataAccordianOpen}
        />
        <LoginDataTable tableKey='loginData' />
        <hr></hr>
        <CustomerTable tableKey='customerDataKeys' />
        <hr></hr>
        <EconomyTable tableKey='loginData' accordionOpen={economicDataAccordionOpen} setAccordionOpen={setEconomicDataAccordionOpen}/>
        <TransactionTable tableKey='customerDataKeys' accordionOpen={transactionDataAccordianOpen} setAccordionOpen={setTransactionDataAccordianOpen}/>
      </Card>
    </>
  );
};
export default Dashboard;
