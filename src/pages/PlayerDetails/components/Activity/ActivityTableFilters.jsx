import { Button, Col, Form, Row } from "@themesberg/react-bootstrap";
import React from "react";
import { actionConstants, activityConstants, statusConstants, transactionConstants } from "../../constants";
import { formatDateYMD } from "../../../../utils/dateFormatter";
import Trigger from "../../../../components/OverlayTrigger";
import { toast } from "../../../../components/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload, faRedoAlt } from "@fortawesome/free-solid-svg-icons";

const ActivityTableFilters = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  providerName,
  setProviderName,
  transaction,
  setTransaction,
  casinoProvidersData,
  coinType,
  setCoinType,
  action,
  setAction,
  data,
  downloadActivity,
  resetFilters,
  onSearch,
}) => {
  return (
    <Row>
      <Col xs='auto' className='mb-3'>
        <Form.Label>Date From</Form.Label>
        <Form.Control
          type='date'
          value={startDate}
          max={endDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Col>

      <Col xs='auto' className='mb-3'>
        <Form.Label>Date To</Form.Label>
        <Form.Control
          type='date'
          max={formatDateYMD(new Date())}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Col>

      <Col xs='auto' className='mb-3'>
        <Form.Label>Actions</Form.Label>
        <Form.Select
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          {actionConstants?.map(({ label, value }) => {
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </Form.Select>
      </Col>

      <Col xs='auto' className='mb-3'>
        <Form.Label>Transaction</Form.Label>
        <Form.Select
          value={transaction}
          onChange={(e) => setTransaction(e.target.value)}
        >
          {transactionConstants?.map(({ label, value }) => {
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </Form.Select>
      </Col>

      <Col xs='auto' className='mb-3'>
        <Form.Label>Coin Type</Form.Label>
        <Form.Select
          value={coinType}
          onChange={(e) => setCoinType(e.target.value)}
        >
          <option value=''>All</option>
          <option value='gc'>Gold Coins</option>
          <option value='sc'>Sweeps Coins</option>
        </Form.Select>
      </Col>
      {(providerName === 'all') ?
        <>
          {/*   <Col xs='auto' className='mb-3'>
            <Form.Label>Game Provider</Form.Label>
            <Form.Select
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
            >
              <option value='all'>All</option>
              <option value='hacksaw'>Hacksaw</option>
              <option value='betsoft'>Betsoft</option>
            </Form.Select>
          </Col> */}
          <Col xs='auto' className='mb-3'>
            <Form.Label>Game Provider</Form.Label>
            <Form.Select
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
            >
              <option value='all'>All</option>
              {casinoProvidersData?.rows.map((provider) => (
                <option key={provider.masterCasinoProviderId} value={provider.name}>
                  {provider.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col xs='auto' className='mb-3'>
            <Form.Label>Payment Provider</Form.Label>
            <Form.Select
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
            >
              <option value='all'>All</option>
              <option value='Triple A'>Triple A</option>
              <option value='Paynote'>Paynote</option>
            </Form.Select>
          </Col>
        </>
        :
        <>
          {/* <Col xs='auto' className='mb-3'>
            <Form.Label>Game Provider</Form.Label>
            <Form.Select
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
            >
              <option value='all'>All</option>
              <option value='hacksaw'>Hacksaw</option>
              <option value='betsoft'>Betsoft</option>
            </Form.Select>
          </Col> */}
           <Col xs='auto' className='mb-3'>
            <Form.Label>Game Provider</Form.Label>
            <Form.Select
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
            >
              <option value='all'>All</option>
              {casinoProvidersData?.rows.map((provider) => (
                <option key={provider.masterCasinoProviderId} value={provider.name}>
                  {provider.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs='auto' className='mb-3'>
            <Form.Label>Payment Provider</Form.Label>
            <Form.Select
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
            >
              <option value='all'>All</option>
              <option value='tripleA'>TripleA</option>
              <option value='Paynote'>Paynote</option>
            </Form.Select>
          </Col>
        </>
      }


      {/* <Col
        xs='auto'
        className='d-flex justify-content-center align-items-end mb-3'
      >
        <Button variant='outline-secondary' onClick={onSearch}>
          Search
        </Button>
      </Col> */}

      {/* <Col
        xs='auto'
        className='d-flex justify-content-center align-items-end mb-3'
      >
        <Trigger message='Download as CSV' id={"csv"} />
        <Button
          id={"csv"}
          variant='success'
          disabled={data?.count === 0}
          onClick={downloadActivity}
        >
          <FontAwesomeIcon icon={faFileDownload} />
        </Button>
      </Col> */}

      <Col
        xs='auto'
        className='d-flex justify-content-center align-items-end mb-3'
      >
        <Trigger message='Reset Filters' id={"redo"} />
        <Button
          id={"redo"}
          variant='success'
          onClick={resetFilters}
        >
          <FontAwesomeIcon icon={faRedoAlt} />
        </Button>
      </Col>
    </Row>
  );
};

export default ActivityTableFilters;
