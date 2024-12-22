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
import { redeemConfigSchema } from "../schema";

const RedeemConfiguration = ({
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
              {t("redeemConfiguration.editButton")}
            </button>
          </div>
        </Col>

        {details && (
          <Formik
            enableReinitialize
            initialValues={{
              minRedeemableCoins:
                details?.siteConfig?.find(
                  (obj) => obj.key === "MINIMUM_REDEEMABLE_COINS"
                )?.value || "",
              maxRedeemableCoins:
                details?.siteConfig?.find(
                  (obj) => obj.key === "MAXIMUM_REDEEMABLE_COINS"
                )?.value || "",
              maxNonPurchaserAmount:
                details?.siteConfig?.find(
                  (obj) => obj.key === "MAXIMUM_NON_PURCHASER_AMOUNT"
                )?.value || "",
              maxNonPurchaserDays:
                details?.siteConfig?.find(
                  (obj) => obj.key === "MAXIMUM_NON_PURCHASER_DAYS"
                )?.value || "",
              weeklyRedeemableLimit:
                details?.siteConfig?.find(
                  (obj) => obj.key === "WEEKLY_REDDEMABLE_LIMIT"
                )?.value || "",
              maxPendingRedemptionLimit:
                details?.siteConfig?.find(
                  (obj) => obj.key === "NO_OF_MAXIMUM_REDEMPTION_LIMIT"
                )?.value || "",
              authToken: "",
            }}
            validationSchema={redeemConfigSchema(t)}
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
                            "redeemConfiguration.inputFields.minRedeemableCoins.label"
                          )}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"number"}
                              name={"minRedeemableCoins"}
                              disabled={!editable}
                              value={values?.minRedeemableCoins}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"minRedeemableCoins"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t(
                            "redeemConfiguration.inputFields.maxRedeemableCoins.label"
                          )}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"number"}
                              name={"maxRedeemableCoins"}
                              disabled={!editable}
                              value={values?.maxRedeemableCoins}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"maxRedeemableCoins"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t(
                            "redeemConfiguration.inputFields.maxNonPurchaserAmount.label"
                          )}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"number"}
                              name={"maxNonPurchaserAmount"}
                              disabled={!editable}
                              value={values?.maxNonPurchaserAmount}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"maxNonPurchaserAmount"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t(
                            "redeemConfiguration.inputFields.maxNonPurchaserDays.label"
                          )}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"number"}
                              name={"maxNonPurchaserDays"}
                              disabled={!editable}
                              value={values?.maxNonPurchaserDays}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"maxNonPurchaserDays"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t(
                            "redeemConfiguration.inputFields.weeklyRedeemableLimit.label"
                          )}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"number"}
                              name={"weeklyRedeemableLimit"}
                              disabled={!editable}
                              value={values?.weeklyRedeemableLimit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"weeklyRedeemableLimit"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t(
                            "redeemConfiguration.inputFields.maxPendingRedemptionLimit.label"
                          )}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"number"}
                              name={"maxPendingRedemptionLimit"}
                              disabled={!editable}
                              value={values?.maxPendingRedemptionLimit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"maxPendingRedemptionLimit"}
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
                      {t("redeemConfiguration.submitButton")}
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

export default RedeemConfiguration;
