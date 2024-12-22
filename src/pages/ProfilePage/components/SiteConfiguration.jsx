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
import { siteConfigSchema } from "../schema";

const SiteConfiguration = ({
  details,
  setEditable,
  editable,
  updateData,
  loading,
  preview,
  handleImagePreview,
}) => {
  const { t } = useTranslation(["profile"]);
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
              {t("editButton")}
            </button>
          </div>
        </Col>

        {details && (
          <Formik
            enableReinitialize
            initialValues={{
              siteName:
                details?.siteConfig?.find((obj) => obj.key === "SITE_NAME")
                  ?.value || "",
              siteUrl:
                details?.siteConfig?.find((obj) => obj.key === "ORIGIN")
                  ?.value || "",
              supportEmailAddress:
                details?.siteConfig?.find(
                  (obj) => obj.key === "SUPPORT_EMAIL_ADDRESS"
                )?.value || "",
              siteLogo:
                details?.siteConfig?.find((obj) => obj.key === "LOGO_URL")
                  ?.value || "",

              siteAddress:
                details?.siteConfig?.find((obj) => obj.key === "SITE_ADDRESS")
                  ?.value || "",

              // siteTwitter:
              //   details?.siteConfig?.find((obj) => obj.key === "SITE_TWITTER")
              //     ?.value || "",

              // siteFacebook:
              //   details?.siteConfig?.find((obj) => obj.key === "SITE_FACEBOOK")
              //     ?.value || "",

              // siteInstagram:
              //   details?.siteConfig?.find((obj) => obj.key === "SITE_INSTAGRAM")
              //     ?.value || "",

              // siteDiscord:
              //   details?.siteConfig?.find((obj) => obj.key === "SITE_DISCORD")
              //     ?.value || "",

              siteAddress:
                details?.siteConfig?.find((obj) => obj.key === "SITE_ADDRESS")
                  ?.value || "",
            }}
            validationSchema={siteConfigSchema(t)}
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
                      <div className="bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t("inputFields.siteName.label")}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"text"}
                              name={"siteName"}
                              disabled={!editable}
                              value={values?.siteName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"siteName"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t("inputFields.siteUrl.label")}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"text"}
                              name={"siteUrl"}
                              disabled={!editable}
                              value={values?.siteUrl}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"siteUrl"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t("inputFields.supportEmailAddress.label")}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"text"}
                              name={"supportEmailAddress"}
                              disabled={!editable}
                              value={values?.supportEmailAddress}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"supportEmailAddress"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                      {/* <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t("inputFields.minRedeemableCoins.label")}
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
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t("inputFields.maxRedeemableCoins.label")}
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
                      </div> */}
                    </Col>
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t("inputFields.siteAddress.label")}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"text"}
                              name={"siteAddress"}
                              disabled={!editable}
                              value={values?.siteAddress}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"siteAddress"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col>
                    {/* <Col className="mb-3 col-lg-6 col-12">
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t("inputFields.siteTwitter.label")}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"text"}
                              name={"siteTwitter"}
                              disabled={!editable}
                              value={values?.siteTwitter}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"siteTwitter"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t("inputFields.siteFacebook.label")}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"text"}
                              name={"siteFacebook"}
                              disabled={!editable}
                              value={values?.siteFacebook}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"siteFacebook"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t("inputFields.siteInstagram.label")}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"text"}
                              name={"siteInstagram"}
                              disabled={!editable}
                              value={values?.siteInstagram}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"siteInstagram"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="mb-3 bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t("inputFields.siteDiscord.label")}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type={"text"}
                              name={"siteDiscord"}
                              disabled={!editable}
                              value={values?.siteDiscord}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"siteDiscord"}
                            className="text-danger"
                          />
                        </span>
                      </div>
                    </Col> */}
                    <Col className="mb-3 col-lg-6 col-12">
                      <div className="bg-light py-2 px-3 rounded">
                        <label className="fw-bold">
                          {t("inputFields.siteLogo.label")}
                        </label>
                        <span className="mb-0">
                          <InputGroup>
                            <BForm.Control
                              type="file"
                              placeholder="Image"
                              name={"siteLogo"}
                              disabled={!editable}
                              onInput={handleChange}
                              // value={values?.siteLogo}
                              onChange={(event) => {
                                setFieldValue(
                                  "siteLogo",
                                  event.currentTarget.files[0]
                                );
                                handleImagePreview(event);
                              }}
                              onBlur={handleBlur}
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            name={"siteLogo"}
                            className="text-danger"
                          />
                        </span>
                        {!errors.siteLogo &&
                          (preview?.image_preview ? (
                            <img
                              src={preview?.image_preview}
                              width="150"
                              height="150"
                              className="mt-2 border-0"
                            />
                          ) : (
                            details?.siteConfig?.find(
                              (obj) => obj.key === "LOGO_URL"
                            ).value && (
                              <img
                                src={
                                  details?.siteConfig?.find(
                                    (obj) => obj.key === "LOGO_URL"
                                  ).value
                                }
                                width="150"
                                height="150"
                                className="mt-2 border-0"
                              />
                            )
                          ))}
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
                      {t("submitButton")}
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

export default SiteConfiguration;
