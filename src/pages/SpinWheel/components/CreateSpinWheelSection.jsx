import React from 'react'
import {
  Button,
  Form as BForm,
  Row,
  Col,
  Modal,
} from '@themesberg/react-bootstrap'
import { Formik, Form, ErrorMessage } from 'formik'
import { updateSpinWheelSchema } from '../schemas'

const CreateSpinWheelSection = ({
  t,
  handleClose,
  data,
  show,
  updateSpinWheelConfiguration
}) => {
  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Formik
          initialValues={
            data?.wheelDivisionId
              ? {
                section: data.wheelDivisionId,
                gcCoin: data.gc,
                scCoin: data.sc,
                priority: data.priority,
                userLimit: data.playerLimit ? data.playerLimit : '',
                isAllow: data.isAllow,
                userLimitCheck : data?.playerLimit > 0 ? true : false
              }
              : {
                section: '',
                gcCoin: 0,
                scCoin: 0,
                priority: '',
                userLimit: '',
                isAllow: false,
                userLimitCheck : false
              }
          }
          validationSchema={updateSpinWheelSchema}
          onSubmit={(formValues) => {
            updateSpinWheelConfiguration(formValues, { wheelDivisionId: data?.wheelDivisionId })
          }}
        >
          {({ values, handleChange, handleSubmit, }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>{t('editSpin.heading')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row className='mt-3'>
                  <Col>
                    <BForm.Label>
                      {t('editSpin.inputField.section.label')}
                    </BForm.Label>

                    <BForm.Control
                      disabled
                      type='text'
                      name='section'
                      value={values.section}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col>
                    <BForm.Label>
                      {t('editSpin.inputField.gcCoin.label')}<span className='text-danger'> *</span>
                    </BForm.Label>
                    <BForm.Control
                      type='number'
                      name='gcCoin'
                      value={values.gcCoin}
                      onChange={handleChange}
                    />

                    <ErrorMessage
                      component='div'
                      name='gcCoin'
                      className='text-danger'
                    />
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col>
                    <BForm.Label>
                      {t('editSpin.inputField.scCoin.label')}
                    </BForm.Label>

                    <BForm.Control
                      type='number'
                      name='scCoin'
                      value={values.scCoin}
                      onChange={handleChange}
                    />

                    <ErrorMessage
                      component='div'
                      name='scCoin'
                      className='text-danger'
                    />
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col>
                    <BForm.Label>
                      {t('editSpin.inputField.priority.label')}<span className='text-danger'> *</span>
                    </BForm.Label>

                    <BForm.Select
                      type='text'
                      name='priority'
                      value={values.priority}
                      onChange={handleChange}
                    >
                      <option value='' disabled>Select Priority</option>
                      <option value='1'>Rarely</option>
                      <option value='3'>Sometimes</option>
                      <option value='5'>Usually</option>
                      <option value='7'>Frequently</option>
                      <option value='9'>Most of the time</option>
                    </BForm.Select>
                    <ErrorMessage
                      component='div'
                      name='priority'
                      className='text-danger'
                    />
                  </Col>
                </Row>
                {data?.wheelDivisionId == 1 ?  <></> :
                  <>
                   <Row className='mt-3'>
                      <Col className='d-flex'>
                        <BForm.Label>
                          {t('editSpin.inputField.setUserLimit.label')}
                        </BForm.Label>

                        <BForm.Check
                          className='mx-auto'
                          type='checkbox'
                          name='userLimitCheck'
                          checked={values.userLimitCheck}
                          value={values.userLimitCheck}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                   {values.userLimitCheck && <Row className='mt-3'>
                      <Col>
                        <BForm.Label>
                          {t('editSpin.inputField.userLimit.label')}
                        </BForm.Label>

                        <BForm.Control
                          type='number'
                          name='userLimit'
                          value={values.userLimit}
                          onChange={handleChange}
                        />
                          <ErrorMessage
                      component='div'
                      name='userLimit'
                      className='text-danger'
                    />

                      </Col>
                    </Row> }
                    <Row className='mt-3'>
                      <Col className='d-flex'>
                        <BForm.Label>
                          {t('editSpin.inputField.isAllowed.label')}<span className='text-danger'> *</span>
                        </BForm.Label>

                        <BForm.Check
                          className='mx-auto'
                          type='checkbox'
                          name='isAllow'
                          checked={values.isAllow}
                          value={values.isAllow}
                          onChange={handleChange}
                        />

                        <ErrorMessage
                          component='div'
                          name='isAllow'
                          className='text-danger'
                        />
                      </Col>
                    </Row>
                  </>
                  
                }
              </Modal.Body>

              <div className='mt-4 '>
                <Modal.Footer className='d-flex justify-content-between align-items-center'>
                  <Button
                    variant='success'
                    onClick={handleSubmit}
                    className='ml-2'
                  >
                    {t('editSpin.submit')}

                  </Button>
                </Modal.Footer>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default CreateSpinWheelSection
