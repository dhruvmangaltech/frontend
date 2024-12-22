import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import {
  Col,
  Row,
  Form as BForm,
  Button,
  Spinner,
  Modal,
} from "@themesberg/react-bootstrap";

const CreateKycLabel = ({
  t,
  handleClose,
  showModal,
  type,
  handleSubmitKycLabel,
  selectedKycLabel = null,
}) => {
  console.log("selectedKycLabel", selectedKycLabel);
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {type} {t("createKycLabel.label")}
        </Modal.Title>
      </Modal.Header>

      <Formik
        enableReinitialize
        initialValues={{
          lang: "EN",
          isRequired: selectedKycLabel ? !!selectedKycLabel.isRequired : false,
          name: selectedKycLabel ? selectedKycLabel.name.EN : "",
          isActive: selectedKycLabel ? !!selectedKycLabel.isActive : false,
        }}
        onSubmit={(formValues) => {
          console.log("handdd", formValues);
          let data = {
            name: formValues.name,
            isRequired: formValues.isRequired,
            isActive: formValues.isActive,
            documentLabelId: selectedKycLabel
              ? selectedKycLabel.documentLabelId
              : "",
          };
          handleSubmitKycLabel(type, data);
        }}
      >
        {({ values, handleChange, handleSubmit, handleBlur }) => (
          <Form>
            <Modal.Body>
              <Row className="mt-3">
                <Col>
                  <BForm.Label>
                    {t("createKycLabel.inputField.name.label")}
                    <span className="text-danger"> *</span>
                  </BForm.Label>

                  <BForm.Control
                    type="text"
                    name="name"
                    placeholder={t(
                      "createKycLabel.inputField.name.placeholder"
                    )}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <ErrorMessage
                    component="div"
                    name="name"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col className="d-flex">
                  <BForm.Label>
                    {t("createKycLabel.inputField.required.label")}{" "}
                  </BForm.Label>

                  <BForm.Check
                    type="checkbox"
                    className="mx-auto"
                    name="isRequired"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.isRequired}
                    checked={values.isRequired}
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col className="d-flex">
                  <BForm.Label>
                    {t("createKycLabel.inputField.isActive.label")}{" "}
                  </BForm.Label>

                  <BForm.Check
                    type="checkbox"
                    className="mx-auto"
                    name="isActive"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.isActive}
                    checked={values.isActive}
                  />
                </Col>
              </Row>
            </Modal.Body>

            <div className="mt-4">
              <Modal.Footer className="d-flex justify-content-between align-items-center">
                <Button variant="warning" onClick={() => handleClose()}>
                  {t("cancel")}
                </Button>

                <Button
                  variant="success"
                  onClick={handleSubmit}
                  className="ml-2"
                >
                  {t("submit")}
                  {false && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </Button>
              </Modal.Footer>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateKycLabel;
