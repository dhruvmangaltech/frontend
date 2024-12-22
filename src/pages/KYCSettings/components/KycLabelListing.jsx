import React, { useEffect } from "react";
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
import { kycLabelTableHeaders } from "../constants";
import CreateKycLabel from "./CreateKycLabel";
import Trigger from "../../../components/OverlayTrigger";

const KycLabelListing = ({
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
  kycLabels,
  loading,
  handleSubmitKycLabel,
  selectedKycLabel,
  setSelectedKycLabel,
  handleUpdateStatus,
  refetchKycLabels,
  selectedTab,
}) => {
  return (
    <div>
      <Row className=" mt-4">
        <Col className="col-12">
          <div className="d-flex justify-content-end">
            <Button
              variant="success"
              className="m-1"
              size="sm"
              onClick={() => handleShowModal("Create")}
            >
              Create
            </Button>
          </div>
        </Col>
      </Row>
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
              {kycLabelTableHeaders.map((h, idx) => (
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
            {kycLabels?.map(
              ({ documentLabelId, name, isRequired, isActive }, i) => (
                <tr key={documentLabelId}>
                  <td>{documentLabelId}</td>
                  <td>{name.EN || "N/A"}</td>
                  <td>{isRequired ? "true" : "false"}</td>
                  <td>{isActive ? "true" : "false"}</td>
                  <td>
                    {" "}
                    <>
                      <Trigger message="Edit" id={i + "edit"} />
                      <Button
                        id={i + "edit"}
                        className="m-1"
                        size="sm"
                        variant="warning"
                        onClick={() => {
                          setSelectedKycLabel({
                            documentLabelId,
                            isRequired,
                            name,
                            isActive,
                          });
                          handleShowModal("Update");
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>

                      {!isActive ? (
                        <>
                          <Trigger
                            message="Set Status Active"
                            id={i + "active"}
                          />
                          <Button
                            id={i + "active"}
                            className="m-1"
                            size="sm"
                            variant="success"
                            onClick={() =>
                              handleUpdateStatus(documentLabelId, isActive)
                            }
                          >
                            <FontAwesomeIcon icon={faCheckSquare} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Trigger
                            message="Set Status In-Active"
                            id={i + "inactive"}
                          />
                          <Button
                            id={i + "inactive"}
                            className="m-1"
                            size="sm"
                            variant="danger"
                            onClick={() =>
                              handleUpdateStatus(documentLabelId, isActive)
                            }
                          >
                            <FontAwesomeIcon icon={faWindowClose} />
                          </Button>
                        </>
                      )}
                    </>
                  </td>
                </tr>
              )
            )}
            {kycLabels?.length < 1 && (
              <tr>
                <td colSpan={8} className="text-danger text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
      <CreateKycLabel
        t={t}
        handleClose={handleClose}
        showModal={showModal}
        type={type}
        handleSubmitKycLabel={handleSubmitKycLabel}
        selectedKycLabel={selectedKycLabel}
      />
    </div>
  );
};

export default KycLabelListing;
