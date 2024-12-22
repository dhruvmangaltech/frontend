import {
  Col,
  InputGroup,
  Row,
  Form as BForm,
  Button,
  Spinner,
} from "@themesberg/react-bootstrap";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { depositConfigSchema } from "../schema";

const DepositConfiguration = ({
  details,
  setEditable,
  editable,
  updateData,
  loading,
}) => {
  const { t } = useTranslation(["cashier"]);
  return (
    <>
      <Row className="my-n2 pt-3">
        <Col sm={12} className="my-2">
          <div className="text-right m-n1">
            <button
              type="button"
              className="m-1 btn btn-warning"
              onClick={() => {
                setEditable(true);
              }}
            >
              {t("depositConfiguration.editButton")}
            </button>
          </div>
        </Col>

        {details && (
          <Formik
            enableReinitialize
            initialValues={{
              dailyDepositLimit:
                details?.siteConfig?.find(
                  (obj) => obj.key === "DAILY_DEPOSIT_LIMIT"
                )?.value || "",
            }}
            validationSchema={depositConfigSchema(t)}
            onSubmit={(formValues) => {
              updateData({ data: formValues });
            }}
          >
            {({
              errors,
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              setFieldValue,
            }) => {
              return (
                <Form>
                  <Row lg={2} md={2} sm={2}>
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t(
                            "depositConfiguration.inputFields.dailyDepositLimit.label"
                          )}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"number"}
                              name={"dailyDepositLimit"}
                              disabled={!editable}
                              value={values?.dailyDepositLimit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"dailyDepositLimit"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <div className="mt-0 mb-3">
                    <Button
                      variant="success"
                      onClick={handleSubmit}
                      className="ml-2"
                      hidden={!editable}
                    >
                      {t("depositConfiguration.submitButton")}
                      {loading && (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          style={{ marginLeft: "3px" }}
                        />
                      )}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      </Row>
    </>
  );
};

export default DepositConfiguration;
