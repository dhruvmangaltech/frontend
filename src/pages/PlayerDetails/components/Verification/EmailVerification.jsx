import React, { useState } from "react";
import { Row, Col, Card, Form as BForm } from "@themesberg/react-bootstrap";
import { useTranslation } from 'react-i18next'

const EmailVerification = ({ basicInfo, handleCheckboxChange, verificationChecked }) => {
  const { t } = useTranslation('verification')
  return (
    <>
    <Row className='my-5 w-100 m-auto'>
      <Row className='w-100 m-auto px-0'>
        <Col className='d-flex'>
          <h5>{t("emailVerify.title")}&nbsp;</h5>
          <BForm.Check
            type='checkbox'
            name='emailVerification'
            onChange={() => handleCheckboxChange('email')}
            checked={verificationChecked}
          />
        </Col>
      </Row>
      </Row>
    </>
  );
};

export default EmailVerification;
