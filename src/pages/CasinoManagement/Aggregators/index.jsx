import {
  Button,
  Row,
  Col,
  Table,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
// import { motion } from 'framer-motion/dist/framer-motion'
import React from "react";
import PaginationComponent from "../../../components/Pagination";
import { ConfirmationModal } from "../../../components/ConfirmationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Trigger from "../../../components/OverlayTrigger";
import useAggregatorListing from "./useAggregatorListing";
import CreateAggregator from "./components/CreateAggregator";
import useCheckPermission from "../../../utils/checkPermission";
// import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import {
  faCheckSquare,
  faWindowClose,
  faEdit,
  faArrowCircleUp,
  faArrowCircleDown,
  faBan,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const CasinoAggregator = () => {
  const {
    aggregators,
    limit,
    setLimit,
    page,
    setPage,
    // search,
    // setSearch,
    // setCategoryFilter,
    // categoryFilter,
    // statusFilter,
    // setStatusFilter,
    totalPages,
    handleStatusShow,
    handleYes,
    statusShow,
    setStatusShow,
    show,
    handleClose,
    handleShow,
    loading,
    status,
    t,
    createAggregator,
    name,
  } = useAggregatorListing();
  const { isHidden } = useCheckPermission();

  return (
    <>
      <Row>
        <Col xs={7}>
          <h3>Casino Aggregators</h3>
        </Col>
      </Row>

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
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody id={loading ? "cover-spin" : ""}>
          {aggregators &&
            !loading &&
            aggregators?.rows?.map(
              ({ name, masterGameAggregatorId, isActive }) => {
                return (
                  <tr key={masterGameAggregatorId}>
                    <td>{masterGameAggregatorId}</td>

                    <td>
                      <Trigger
                        message={name}
                        id={masterGameAggregatorId + "name"}
                      />
                      <span
                        id={masterGameAggregatorId + "name"}
                        style={{
                          width: "100px",
                          cursor: "pointer",
                          textTransform: "uppercase",
                        }}
                        className="d-inline-block text-truncate"
                      >
                        {name}
                      </span>
                    </td>

                    <td>
                      {isActive ? (
                        <span className="text-success">Active</span>
                      ) : (
                        <span className="text-danger">In Active</span>
                      )}
                    </td>

                    <td>
                      {!isActive ? (
                        <>
                          <Trigger
                            message="Set Status Active"
                            id={masterGameAggregatorId + "active"}
                          />
                          <Button
                            id={masterGameAggregatorId + "active"}
                            className="m-1"
                            size="sm"
                            variant="success"
                            onClick={() =>
                              handleStatusShow(
                                masterGameAggregatorId,
                                isActive,
                                name
                              )
                            }
                            hidden={isHidden({
                              module: { key: "CasinoManagement", value: "T" },
                            })}
                          >
                            <FontAwesomeIcon icon={faCheckSquare} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Trigger
                            message="Set Status In-Active"
                            id={masterGameAggregatorId + "inactive"}
                          />
                          <Button
                            id={masterGameAggregatorId + "inactive"}
                            className="m-1"
                            size="sm"
                            variant="danger"
                            onClick={() =>
                              handleStatusShow(masterGameAggregatorId, isActive)
                            }
                            hidden={isHidden({
                              module: { key: "CasinoManagement", value: "T" },
                            })}
                          >
                            <FontAwesomeIcon icon={faWindowClose} />
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              }
            )}

          {aggregators?.count === 0 && !loading && (
            <tr>
              <td colSpan={5} className="text-danger text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {aggregators?.count !== 0 && !loading && (
        <PaginationComponent
          page={aggregators?.count < page ? setPage(1) : page}
          totalPages={totalPages}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      )}
      <ConfirmationModal
        setShow={setStatusShow}
        show={statusShow}
        handleYes={handleYes}
        active={status}
        name={name}
      />
      <CreateAggregator
        handleClose={handleClose}
        show={show}
        createAggregator={createAggregator}
        loading={loading}
      />
    </>
  );
};

export default CasinoAggregator;
