import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faWindowClose,
  faTrash,
  faEye,
  faArrowCircleUp,
  faArrowCircleDown,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { requestedKycsTableHeaders } from "../constants";
import { AdminRoutes } from "../../../routes";
import PaginationComponent from "../../../components/Pagination";
import Trigger from "../../../components/OverlayTrigger";

const RequestedKycListing = ({
  t,
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
  pendingKycList,
  refetchPendingKycList,
  selectedTab,
  limit,
  page,
  setLimit,
  setPage,
}) => {
  const navigate = useNavigate();
  const totalPages = Math.ceil(pendingKycList?.count / limit);

  return (
    <div>
      <Row className=" mt-4"></Row>
      <Row>
        <Table
          bordered
          striped
          responsive
          hover
          size="sm"
          className="text-center mt-4"
        >
          <thead className="thead-dark">
            <tr>
              {requestedKycsTableHeaders.map((h, idx) => (
                <th
                  key={idx}
                  onClick={() => setOrderBy(h.value)}
                  style={{
                    cursor: "pointer",
                  }}
                  className={selected(h) ? "border-3 border border-blue" : ""}
                >
                  {t(h.labelKey)}{" "}
                  {selected(h) &&
                    (sort === "asc" ? (
                      <FontAwesomeIcon
                        style={over ? { color: "red" } : {}}
                        icon={faArrowCircleUp}
                        onClick={() => setSort("desc")}
                        onMouseOver={() => setOver(true)}
                        onMouseLeave={() => setOver(false)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={over ? { color: "red" } : {}}
                        icon={faArrowCircleDown}
                        onClick={() => setSort("asc")}
                        onMouseOver={() => setOver(true)}
                        onMouseLeave={() => setOver(false)}
                      />
                    ))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pendingKycList?.rows?.map(
              ({ userId, firstName, lastName, username }, i) => (
                <tr>
                  <td>{userId}</td>
                  <td>{firstName || "N/A"}</td>
                  <td>{lastName || "N/A"}</td>
                  <td>{username}</td>
                  <td>
                    <>
                      <Trigger message="Edit" id={i + "edit"} />
                      <Button
                        id={i + "edit"}
                        className="m-1"
                        size="sm"
                        variant="warning"
                        onClick={() => {
                          navigate(`/admin/player-details/${userId}`, {
                            state: { selectedTab: "verificationParent" },
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </>
                  </td>
                </tr>
              )
            )}
            {pendingKycList?.rows?.length < 1 && (
              <tr>
                <td colSpan={8} className="text-danger text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {pendingKycList?.count !== 0 && (
          <PaginationComponent
            page={pendingKycList?.count < page ? setPage(1) : page}
            totalPages={totalPages}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
          />
        )}
      </Row>
    </div>
  );
};

export default RequestedKycListing;
