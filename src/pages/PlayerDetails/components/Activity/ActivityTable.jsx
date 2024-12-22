import { Button, Table } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { activityTableHeader } from "../../constants";
import { InlineLoader } from "../../../../components/Preloader";
import PaginationComponent from "../../../../components/Pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActivityTable } from "../../../../utils/apiCalls";
import { useParams } from "react-router-dom";
import { getDateTime } from "../../../../utils/dateFormatter";
import {
  formatDateYMD,
  getDateThreeMonthsBefore,
} from "../../../../utils/dateFormatter";
import { getAllCasinoProviders } from "../../../../utils/apiCalls";
import ActivityTableFilters from "./ActivityTableFilters";
import Trigger from "../../../../components/OverlayTrigger";
import { useDownloadActivityCsvMutation } from "../../../../reactQuery/hooks/customMutationHook";
import { downloadCSVFromApiResponse } from "../../../../utils/helper";
import { isNull } from "lodash";

const ActivityTable = ({ setOpenAccountOverview, setCurrentDetails }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [startDate, setStartDate] = useState(
    formatDateYMD(getDateThreeMonthsBefore())
  );
  const [endDate, setEndDate] = useState(formatDateYMD(new Date()));
  const [providerName, setProviderName] = useState("all");
  const [transaction, setTransaction] = useState("all");
  const [coinType, setCoinType] = useState("all");
  const [action, setAction] = useState("all");
  const { userId } = useParams();

  const handleOpenDetails = (data) => {
    setOpenAccountOverview(true)
    setCurrentDetails(data)
  }

  const { data, isLoading: loading, refetch } = useQuery({
    queryKey: ["activityList",
    action, page, limit, startDate, endDate, coinType, transaction, userId,providerName
    ],
    queryFn: () => {
      const params = {
        pageNo: page,
        limit,
        startDate,
        endDate,
        providerName : providerName,
        coinType,
        action: action,
        transaction,
        userId,
      };
      return getActivityTable(params);
    },
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.data,
  });
  const downloadActivityMutation = useDownloadActivityCsvMutation({
    onSuccess: (res) => {
      downloadCSVFromApiResponse(res?.data?.data)
    },
  });

  const downloadActivity = () => {
    const params = {
      pageNo: page,
      limit,
      startDate,
      endDate,
      providerName : providerName,
      coinType,
      action: action,
      transaction,
      userId,
      csvDownload: false
    };
    downloadActivityMutation.mutate(params)
  }

  const { data: casinoProvidersData } = useQuery({
    queryKey: ["providersList"],
    queryFn: () => {
      const params = { pageNo: "", limit: "", orderBy: "", sort: "" };
      return getAllCasinoProviders(params);
    },
    select: (res) => res?.data?.casinoProvider,
    refetchOnWindowFocus: false,
  });

  const totalPages = Math.ceil(data?.count / limit);

  const resetFilters = () => {
    setPage(1);
    setLimit(30);
    setTransaction("all");
    setProviderName();
    setStartDate(formatDateYMD(getDateThreeMonthsBefore()));
    setEndDate(formatDateYMD(new Date()));
    setCoinType("all");
    setAction("all");
    setTimeout(() => {
      refetch();
    }, 500);
  };


  const beforSC = (amount_type, balanceData) => {
    if (amount_type === 1) {
      return balanceData
    } else if (typeof balanceData == "object" && balanceData !== null) {
      if (typeof balanceData?.scCoin == "object" && balanceData?.scCoin !== null) {
        return (balanceData?.scCoin?.bsc + balanceData?.scCoin?.psc + balanceData?.scCoin?.wsc)
      }
      else {
        return balanceData?.scCoin
      }
    } else {
      return '-'
    }
  }
  const beforGC = (amount_type, balanceData) => {
    if (amount_type === 0) {
      return balanceData
    } else if (typeof balanceData == "object" && balanceData !== null) {
      return balanceData?.gcCoin
    } else {
      return '-'
    }
  }
  const afterSC = (amount_type, balanceData) => {
    if (amount_type === 1) {
      return balanceData
    } else if (typeof balanceData == "object" && balanceData !== null) {
      if (typeof balanceData?.scCoin == "object" && balanceData?.scCoin !== null) {
        return (balanceData?.scCoin?.bsc + balanceData?.scCoin?.psc + balanceData?.scCoin?.wsc)
      }
      else {
        return balanceData?.scCoin
      }
    } else {
      return '-'
    }
  }
  const afterGC = (amount_type, balanceData) => {
    if (amount_type === 0) {
      return balanceData
    } else if (typeof balanceData == "object" && balanceData !== null) {
      return balanceData?.gcCoin
    } else {
      return '-'
    }
  }

  return (
    <>
      <ActivityTableFilters
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        providerName={providerName}
        setProviderName={setProviderName}
        transaction={transaction}
        setTransaction={setTransaction}
        casinoProvidersData={casinoProvidersData}
        coinType={coinType}
        setCoinType={setCoinType}
        action={action}
        setAction={setAction}
        data={data}
        downloadActivity={downloadActivity}
        resetFilters={resetFilters}
        //onSearch={refetch}
      />
      <Table
        bordered
        striped
        responsive
        hover
        size='sm'
        className='text-center mt-3'
      >
        <thead className='thead-dark'>
          <tr>
            {activityTableHeader?.map((h, idx) => (
              <th key={idx} className=''>
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.count > 0 ?
            data?.rows?.map(
              (
                {
                  gameId,
                  providerName,
                  transactionBankingId,
                  gameName,
                  gameIdentifier,
                  paymentMethod,
                  createdAt,
                  updatedAt,
                  transactionType,
                  actionType,
                  amount,
                  paymentTransactionId,
                  afterBalance,
                  beforeBalance,
                  transaction,
                  moreDetails,
                  scCoin,
                  gcCoin, 
                  amountType,
                  status,
                  gc,
                  sc
                },
                index
              ) => {

                let indexToString = String(index);

                let gameToolTips = String("name" + indexToString)
                let providerToolTips = String("provider"+ indexToString)

                return (
                  <tr key={index}>
                    <td>
                      <Trigger
                        message={gameId || "-"}
                        id={index + gameId + "name"}
                      />
                      <span
                        id={index + gameId + "name"}
                        style={{
                          width: "100px",
                          cursor: "pointer",
                        }}
                        className='d-inline-block text-truncate'
                      >
                        {gameId || "-"}
                      </span>
                    </td>

                    <td>
                      <Trigger
                        message={gameName || "-"}
                        id={gameToolTips}
                      />
                      <span
                         id={gameToolTips}
                        style={{
                          width: "100px",
                          cursor: "pointer",
                        }}
                        className='d-inline-block text-truncate'
                      >
                        {gameName && gameName || "-"}
                      </span>
                    </td>

                    <td>
                      <Trigger
                        message={providerName || "-"}
                        id={providerToolTips}
                      />
                      <span
                         id={providerToolTips}
                        style={{
                          width: "100px",
                          cursor: "pointer",
                        }}
                        className='d-inline-block text-truncate'
                      >
                        {providerName || "-"}
                      </span>
                    </td>

                    {/* <td>{providerName || "-"}</td> */}
                    <td>{getDateTime(createdAt, true) || getDateTime(updatedAt, true) || "-"}</td>
                    <td>{updatedAt ? getDateTime(updatedAt) : "-"}</td>
                    <td className='text-capitalize'>{transactionType ? transactionType : actionType} </td>
                    <td>{transactionBankingId ? amount : "-"}</td>
                    <td>{scCoin || sc || "-"}</td>
                    <td>{gcCoin || gc || "-"}</td>
                    <td>{paymentTransactionId || "-"}</td>
                    <td>{getDateTime(createdAt, true) || getDateTime(updatedAt, true) || "-"}</td>
                    <td>{transactionType === "removeSc" ? moreDetails.coinType : (amountType === 1 ? "SC" : (amountType === 0 ? "GC" : "-"))}</td>
                    <td>{actionType === 'bet' ? amount : "-"}</td>
                    <td>{actionType !== 'bet' ? amount : "-"}</td>
                    <td>{beforSC(amountType, beforeBalance)}</td>
                    <td>{afterSC(amountType, afterBalance)}</td>
                    <td>{beforGC(amountType, beforeBalance)} </td>
                    <td>{afterGC(amountType, afterBalance)}</td>

                    <td>
                      {moreDetails && moreDetails?.remarks || "-"}
                    </td>
                  </tr>
                );
              }
            ) : (
              <tr>
                <td colSpan={19} className='text-danger text-center'>
                  No Data Found
                </td>
              </tr>
            )}
        </tbody>
      </Table>
      {loading && <InlineLoader />}
      {data?.rows?.length !== 0 && (
        <PaginationComponent
          page={data?.count < page ? setPage(1) : page}
          totalPages={totalPages}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      )}
    </>
  );
};

export default ActivityTable;
