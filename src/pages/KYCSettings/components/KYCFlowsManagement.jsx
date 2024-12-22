import React from "react";
import { Row, Button, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { kycFlows, kycFlowsTableHeaders } from "../constants";
import Trigger from "../../../components/OverlayTrigger";

const KYCFlowsManagement = ({ t, handleUpdateKycFLow, kycCheck }) => {
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
              {kycFlowsTableHeaders.map((h, idx) => (
                <th key={idx}>{t(h.labelKey)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {kycCheck &&
              kycFlows.map(({ name, key }, idx) => (
                <tr key={idx}>
                  <td>{key}</td>
                  <td>{name}</td>
                  <td>{kycCheck[key] ? "True" : "False"}</td>
                  <td>
                    <Trigger
                      message={
                        kycCheck[key]
                          ? "Set Status In-Active"
                          : "Set Status Active"
                      }
                      key={key + (kycCheck[key] ? "inactive" : "active")}
                    ></Trigger>
                    <Button
                      key={key + (kycCheck[key] ? "inactive" : "active")}
                      className="m-1"
                      size="sm"
                      variant={kycCheck[key] ? "danger" : "success"}
                      onClick={() =>
                        handleUpdateKycFLow({ key, value: !kycCheck[key] })
                      }
                    >
                      <FontAwesomeIcon
                        icon={kycCheck[key] ? faWindowClose : faCheckSquare}
                      />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default KYCFlowsManagement;
