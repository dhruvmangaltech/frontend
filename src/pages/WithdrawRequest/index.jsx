import {
  Col,
  Row,
  Form,
  Button,
  Table,
  Badge,
} from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { statusOptions } from "./constants";
import DateRangePicker from "../../components/DateRangePicker";
import { getDateDaysAgo, getDateTime } from "../../utils/dateFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faRedoAlt,
  faTimes,
  faTimesSquare,
} from "@fortawesome/free-solid-svg-icons";
import Trigger from "../../components/OverlayTrigger";
import useWithdrawTransactions from "./hooks/useWithdrawTransactions";
import { InlineLoader } from "../../components/Preloader";
import PaginationComponent from "../../components/Pagination";
import { faEdit, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "../../components/Toast";
import { paymentProviders } from "../PlayerDetails/constants";
import { ApproveRedeemConfirmation } from "../../components/ConfirmationModal";

const WithdrawRequests = () => {
  const [type,setType] = useState('')
  const {
    setLimit,
    setPage,
    totalPages,
    limit,
    page,
    setSelectedAction,
    selectedAction,
    state,
    setState,
    transactionData,
    loading,
    search,
    setSearch,
    updateWithdrawData,
    setSelectedProvider,
    selectedProvider,
    disable,
    approveModal,
    setApproveModal,
    redeemRequest,
    setRedeemRequest
  } = useWithdrawTransactions();

  const handleApproveRequest = () => {
    updateWithdrawData({
      withdrawRequestId: redeemRequest?.withdrawRequestId.toString(),
      reason: "",
      userId : redeemRequest?.userId,
      status: type,
    });

  }

  return (
    <>
      <Row className='mb-3'>
        <Col xs={12}>
          <h3>Redeem Requests</h3>
        </Col>
      </Row>
      <Row>
        <Col xs='12' sm='6' lg='3' className='mb-3'>
          <Form.Label
          >
            Search
          </Form.Label>
          <Form.Control
            type='search'
            value={search}
            placeholder='Search By Email'
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value.replace(/[~`!$%^&*#=)()><?]+/g, ""));
            }}
          />
        </Col>
        <Col xs='12' sm='6' lg='3' className='mb-3'>
          <Form.Label column='sm' className='mx-auto text-nowrap px-2'>
            Status
          </Form.Label>

          <Form.Select
            onChange={(e) => {
              setPage(1);
              setSelectedAction(e.target.value);
            }}
            value={selectedAction}
          >
            {statusOptions &&
              statusOptions?.map(({ label, value }) => (
                <option key={label} value={value}>
                  {label}
                </option>
              ))}
          </Form.Select>
        </Col>
        <Col xs='12' sm='6' lg='3' className='mb-3'>
          <Form.Label column='sm' className='mx-auto text-nowrap px-2'>
            Payment Provider
          </Form.Label>

          <Form.Select
            onChange={(e) => {
              setPage(1);
              setSelectedProvider(e.target.value);
            }}
            value={selectedProvider}
          >
            {paymentProviders &&
              paymentProviders?.map(({ label, value }) => (
                <option key={label} value={value}>
                  {label}
                </option>
              ))}
          </Form.Select>
        </Col>
        <Col xs='12' sm='6' lg='3' className='mb-3'>
          <Form.Label column='sm' className='mx-auto text-nowrap px-2'>
            Time Period
          </Form.Label>
          <DateRangePicker width='auto' state={state} setState={setState} />
        </Col>
        <Col xs='12' sm='6' lg='1' className='d-flex align-items-end mt-2 mt-sm-0 mb-0 mb-lg-3'>
          <Trigger message='Reset Filters' id={"redo"} />
          <Button
            id={"redo"}
            variant='success'
            onClick={() => {
              setSearch("");
              setSelectedAction("all");
              setLimit(15);
              setPage(1);
              setSelectedProvider("all");
              setState([
                {
                  startDate: getDateDaysAgo(10),
                  endDate: new Date(),
                  key: "selection",
                },
              ]);
            }}
          >
            <FontAwesomeIcon icon={faRedoAlt} />
          </Button>
        </Col>
      </Row>
      <Table
        bordered
        striped
        responsive
        hover
        size='sm'
        className='text-center mt-4'
      >
        <thead className='thead-dark'>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Coins</th>
            <th>Transaction Id</th>
            <th>Payment Provider</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactionData &&
            transactionData?.rows?.map(
              ({
                transactionId,
                email,
                name,
                withdrawRequestId,
                amount,
                userId,
                status,
                paymentProvider,
                failedCount,
                successCount,
                updatedAt,
              }) => {
                return (
                  <tr key={transactionId}>
                    <td>{withdrawRequestId}</td>
                    <td>
                      <Link to={`/admin/player-details/${userId}`}>
                        {email}
                      </Link>
                    </td>
                    <td>{name}</td>
                    <td>{amount?.toFixed(2)}</td>
                    <td>
                      {transactionId ? (
                        <>
                          <Trigger
                            message='Copy'
                            id={`${withdrawRequestId}_copy`}
                          />
                          <CopyToClipboard
                            text={transactionId}
                            onCopy={() => {
                              toast(
                                "Transaction id copied to clipboard",
                                "success"
                              );
                            }}
                          >
                            <span
                              id={`${withdrawRequestId}_copy`}
                              style={{ cursor: "pointer" }}
                            >
                              {transactionId}
                            </span>
                          </CopyToClipboard>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{paymentProvider}</td>
                    {/* <td>{status === 0 ? 'Pending' : status === 1 ? 'Success' : 'Failed'}</td> */}
                    <td>{getDateTime(updatedAt)}</td>
                    <td>
                      {status === 0 ? (
                        <>
                          <Trigger
                            message='Approve'
                            id={transactionId + "edit"}
                          />
                          <Button
                            disabled={(status !== 0 || disable)}
                            id={transactionId + "edit"}
                            className='m-1'
                            size='sm'
                            variant='success'
                            onClick={() => {
                            setType('approved')
                            setApproveModal(true)
                            setRedeemRequest({userId,withdrawRequestId, failedCount, successCount , paymentProvider})
                            }}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </Button>
                        </>
                      ) : status === 1 ? (
                        <span className='success'>Approved</span>
                      ) : status === 2 ? (
                        <span className='danger'>Cancelled</span>
                      ) : (
                        <span className='danger'>In-Process</span>
                      )}
                      {status === 0 && (
                        <>
                          <Trigger
                            message='Cancel'
                            id={transactionId + "Cancel"}
                          />
                          <Button
                            disabled={status !== 0 || disable}
                            id={transactionId + "Cancel"}
                            className='m-1'
                            size='sm'
                            variant='danger'
                              onClick={() => {
                                setType('rejected')
                                setApproveModal(true)
                                setRedeemRequest({userId,withdrawRequestId,failedCount,successCount, paymentProvider})
                              }}                    
                          >
                            <FontAwesomeIcon icon={faTimesSquare} />
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              }
            )}

          {transactionData?.count === 0 && (
            <tr>
              <td colSpan={9} className='text-danger text-center'>
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {loading && <InlineLoader />}
      {transactionData?.count !== 0 && (
        <PaginationComponent
          page={transactionData?.count < page ? setPage(1) : page}
          totalPages={totalPages}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      )}
       {approveModal && 
        <ApproveRedeemConfirmation
          show={approveModal}
          setShow={setApproveModal}
          handleYes={handleApproveRequest}
          redeemRequest= {redeemRequest}
          type={type}
        />}
    </>
  );
};

export default WithdrawRequests;
