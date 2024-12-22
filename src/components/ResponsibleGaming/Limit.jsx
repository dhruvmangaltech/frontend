import { Row, Form as BForm, Button, Col, Modal, InputGroup } from '@themesberg/react-bootstrap'
import { ErrorMessage, Form, Formik } from 'formik'
import Select from 'react-select'
import React from 'react'
import { faEdit, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { limitsSchema, setDisableUserlimitsSchema } from './schema'
import { SESSION_OPTIONS, SWEEP_BREAK, limitName, allowOnlyNumber } from './constants'
import { LimitContainer } from './style'

const Limit = ({
  t,
  limit,
  show,
  setShow,
  updateLimit,
  currencyCode
}) => {
  const labelArray = limit?.label?.split(' ')

  // this label is used for the validation schema. For example: weekly wager should be greater than daily wager 
  const label = '' + (labelArray?.[0] === 'Weekly' ? 'Daily ' : 'Weekly ') + labelArray?.[1] + ' ' + labelArray?.[2]

  const placeholderFunction = (label) => {
    let placeholderMes = ''
    switch (label) {
      case limitName.take_break:
        placeholderMes = t('playerLimit.daysPlace')
        break;
      case limitName.session_limit:
        placeholderMes = t('playerLimit.hoursPlace')
        break;
      default:
        placeholderMes = t('playerLimit.limitPlace')
    }
    return placeholderMes
  }
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Set {limit?.label}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{ limit: limit?.value || '', reason: '', isFavorite: false }}
//           validationSchema={
//             (limit?.label === limitName.take_break || limit?.label === limitName.session_limit)
//               ? setDisableUserlimitsSchema(t)
//               : limitsSchema({ minimum: limit?.minimum, currLabel: limit?.label, label, t })
// }
          onSubmit={(formValues) => {
            limit?.label === limitName.session_limit ? updateLimit({ formValues, label: limit?.label }) : updateLimit({ formValues, label: limit?.label, type: limit?.label })
            setShow(false)
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            setFieldValue
          }) => (
            <Form className='m-3'>
              <LimitContainer>
                <div>
                  <Row>
                    <Col className='d-flex justify-content-between align-items-center flex-wrap'>
                      <Col className='col-12 col-sm-6'>
                        <BForm.Label>{(limit?.label === limitName.take_break || limit?.label === limitName.session_limit) ? t('playerLimit.timePeriod') : limit?.label}</BForm.Label>
                      </Col>
                      {/* {
                        limit?.label === limitName.session_limit &&
                          <Col className='col-12 col-sm-6'>
                            <InputGroup>
                              <Select
                                defaultValue={SESSION_OPTIONS.find(item => item.value === Number(values.limit))}
                                placeholder='Session Reminder'
                                className='react-select'
                                classNamePrefix='react-select'
                                options={SESSION_OPTIONS}
                                onChange={(e) => { setFieldValue('limit', e.value)}}
                              />
                            </InputGroup>
                            <ErrorMessage
                              component='div'
                              name='limit'
                              className='text-danger'
                            />
                          </Col>
                      } */}
                      {
                        (limit?.label === limitName.daily_purchase_limit ||
                        limit?.label === limitName.weekly_purchase_limit ||
                        limit?.label === limitName.monthly_purchase_limit) &&
                          <Col className='col-12 col-sm-6'>
                            <InputGroup>
                              <InputGroup.Text>{currencyCode}</InputGroup.Text>
                              <BForm.Control
                                type='number'
                                name='limit'
                                placeholder={placeholderFunction(limit?.label)}
                                value={values.limit}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </InputGroup>
                            <ErrorMessage
                              component='div'
                              name='limit'
                              className='text-danger'
                            />
                          </Col>
                      }
                      {
                        (limit?.label === limitName.daily_time_limit ||
                        limit?.label === limitName.weekly_time_limit ||
                        limit?.label === limitName.monthly_time_limit) &&
                          <Col className='col-12 col-sm-6'>
                            <InputGroup>
                              <InputGroup.Text>SC</InputGroup.Text>
                              <BForm.Control
                                type='number'
                                name='limit'
                                placeholder={placeholderFunction(limit?.label)}
                                value={values.limit}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </InputGroup>
                            <ErrorMessage
                              component='div'
                              name='limit'
                              className='text-danger'
                            />
                          </Col>
                      }
                      {
                      limit?.label === limitName.take_break &&
                        <Col className='col-12 col-sm-6'>
                            <InputGroup>
                              <InputGroup.Text>Days</InputGroup.Text>
                              <BForm.Control
                                type='number'
                                name='limit'
                                placeholder={placeholderFunction(limit?.label)}
                                value={values.limit}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </InputGroup>
                            <ErrorMessage
                              component='div'
                              name='limit'
                              className='text-danger'
                            />
                        </Col>
                      }
                      {
                        limit?.label === limitName.self_exclusion &&
                          <Col className='col-12 col-sm-6'>
                            <InputGroup>
                              Do you want to { limit?.selfExclusion ? 'remove from exclusion' : 'exlude this player'} ?
                            </InputGroup>
                            <ErrorMessage
                              component='div'
                              name='limit'
                              className='text-danger'
                            />
                          </Col>
                      }
                    </Col>
                  </Row>
                  <Row className='my-4'>
                    <Col className='d-flex justify-content-between align-items-center flex-wrap'>
                      <Col className='col-12 col-sm-6'>
                        <BForm.Label>Favourite</BForm.Label>
                      </Col>
                      <Col className='col-12 col-sm-6'>
                        {/* <FontAwesomeIcon icon={faEdit}  style={{color: "#d1b81a",}} />
                        <FontAwesomeIcon icon={faStar}  style={{color: "#d1b81a",}} /> */}
                        <InputGroup className='limit-star'>
                          <FontAwesomeIcon
                            icon={faStar} size='2x'
                            style={{ color: values.isFavorite ? '#ffdd77' : '' }}
                            onClick={() => setFieldValue('isFavorite', !values.isFavorite)}
                          />
                        </InputGroup>
                      </Col>
                    </Col>
                  </Row>
                  <Row className='my-4'>
                    <Col className='d-flex justify-content-between align-items-center flex-wrap'>
                      <Col className='col-12 col-sm-6'>
                        <BForm.Label>Reason</BForm.Label>
                      </Col>
                      <Col className='col-12 col-sm-6'>
                        <InputGroup>
                          <BForm.Control
                            as='textarea'
                            type='textarea'
                            name='reason'
                            placeholder='Reason'
                            value={values.reason}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </InputGroup>

                      </Col>
                    </Col>
                  </Row>

                </div>

                <div className='mt-3 d-flex justify-content-between align-items-center'>
                  <Button
                    variant='warning'
                    onClick={() => {
                      setShow(false)
                    }}
                    className='ml-2'
                  >
                    {t('playerLimit.cancel')}
                  </Button>

                  <Button
                    variant='success'
                    onClick={() => {
                      handleSubmit()
                    }}
                  >
                    {t('playerLimit.set')}
                  </Button>
                </div>
              </LimitContainer>

            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default Limit
