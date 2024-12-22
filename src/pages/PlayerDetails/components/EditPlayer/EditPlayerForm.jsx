import React from 'react'
import {
  Button,
  Form as BForm,
  Row,
  Col,
  Badge,
  Spinner,
  InputGroup
} from '@themesberg/react-bootstrap'
import { subYears } from 'date-fns'
import Select from 'react-select'
import moment from 'moment-timezone'
import { formatDateYMD, formatDateMDY } from '../../../../utils/dateFormatter';
import Datetime from 'react-datetime';
import { Form, Field, ErrorMessage } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { CityListConst, stateListConst, AGE_RESTRICTION_19, genderConst } from './constant'
import { EditPlayerFieldContainer } from '../../style'
import '../../playerdetails.scss'

const EditPlayerForm = ({
  values,
  handleChange,
  handleSubmit,
  handleBlur,
  setFieldValue,
  loading,
  isEdit = false,
  setIsEdit,
  onStateChangeHandler,
  isGetStateLoading,
  selectedState,
  stateData,
  cityData,
  selectedCity,
  setSelectedCity,
  errors,
  userData,
  handleVerifyLexisNexis,
  resetForm
}) => {
  // const {
  //   navigate,
  //   data,
  //   adminRole,
  //   adminDetails,
  //   type,
  //   setType,
  //   groupOptions,
  //   setGroupOptions,
  //   selectedGroup,
  //   setSelectedGroup,
  //   t
  // } = useStaffForm({ group: values?.group, role: values.role, adminId: values.adminId })
  const stateValue = values?.state
  const ageRestriction = AGE_RESTRICTION_19.includes(stateValue?.state_id?.toString()) ? 19 : 18
  return (
      <Form>
        <Row>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>First Name</BForm.Label>

            <BForm.Control
              type='text'
              name='firstName'
              placeholder='First Name'
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='firstName'
              className='text-danger'
            />
          </Col>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>Middle Name</BForm.Label>

            <BForm.Control
              type='text'
              name='middleName'
              placeholder='Middle Name'
              // placeholder={t('staffFields.email.placeholder')}
              value={values.middleName}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='middleName'
              className='text-danger'
            />
          </Col>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>Last Name</BForm.Label>

            <BForm.Control
              type='text'
              name='lastName'
              placeholder='Last Name'
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='lastName'
              className='text-danger'
            />
          </Col>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>Date Of Birth</BForm.Label>
            <BForm.Group>
              <Datetime
                inputProps={{
                  placeholder: 'MM/DD/YYYY',
                  disabled: isEdit
                }}
                dateFormat='MM/DD/YYYY'
                onChange={(e) => {
                  setFieldValue('dateOfBirth', formatDateMDY(e._d))
                }}
                value={values.dateOfBirth}
                isValidDate={(currentDate) => {
                  return currentDate.isBefore(moment(subYears(new Date(), ageRestriction)));
                }}
                // isValidDate={(e) => {
                //   return (
                //     e._d > new Date() ||
                //     formatDateYMD(e._d) === formatDateYMD(new Date())
                //   )
                // }}
                timeFormat={false}
              />

              <ErrorMessage
                component='div'
                name='dateOfBirth'
                className='text-danger'
              />
            </BForm.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>Gender</BForm.Label>
            <div>
              <Select
                placeholder='Gender'
                className={'react-select custom-select'}
                classNamePrefix={'react-select'}
                options={genderConst}
                value={values?.gender || null}
                // isLoading={isGetStateLoading}
                // value={{ value: '1', label: 'USA' }}
                isDisabled={isEdit}
                onChange={(e) => {
                  setFieldValue('gender', e)
                }}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              component='div'
              name='gender'
              className='text-danger'
            />
          </Col>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>Address Line1</BForm.Label>

            <BForm.Control
              type='text'
              name='addressLine_1'
              placeholder='Address Line 1'
              value={values.addressLine_1}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='addressLine_1'
              className='text-danger'
            />
          </Col>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>Address Line 2</BForm.Label>

            <BForm.Control
              type='text'
              name='addressLine_2'
              placeholder='Address Line 2'
              value={values.addressLine_2}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='addressLine_2'
              className='text-danger'
            />
          </Col>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>Zip Code</BForm.Label>

            <BForm.Control
              type='text'
              name='zipCode'
              placeholder='zipCode'
              value={values.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='zipCode'
              className='text-danger'
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>Country</BForm.Label>
            <div>
              <Select
                placeholder='countryCode'
                className={'react-select custom-select'}
                classNamePrefix={'react-select'}
                options={[
                  { value: '1', label: 'USA' }
                ]}
                // isLoading={isGetStateLoading}
                value={{ value: '1', label: 'USA' }}
                isDisabled={isEdit}
              />
            </div>

            <ErrorMessage
              component='div'
              name='countryCode'
              className='text-danger'
            />
          </Col>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>State</BForm.Label>
            <Select
              placeholder='State'
              className={'react-select custom-select'}
              classNamePrefix={'react-select'}
              options={stateListConst(stateData)}
              onChange={(value) => {
                setFieldValue('state', value)
                setFieldValue('city', null)
                onStateChangeHandler(value)
              }}
              isLoading={isGetStateLoading}
              value={selectedState}
              isDisabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='state'
              className='text-danger'
            />
          </Col>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
          <BForm.Label>City</BForm.Label>

            <BForm.Control
              type='text'
              name='city'
              placeholder='City'
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='city'
              className='text-danger'
            />
          </Col>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>Email</BForm.Label>

            <BForm.Control
              type='text'
              name='email'
              // placeholder={t('staffFields.email.placeholder')}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='email'
              className='text-danger'
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>User Name</BForm.Label>

            <BForm.Control
              type='text'
              name='username'
              // placeholder={t('staffFields.email.placeholder')}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled
            />

            <ErrorMessage
              component='div'
              name='username'
              className='text-danger'
            />
          </Col>
          <Col xs={12} sm={6} lg={3} className='mb-2'>
            <BForm.Label>Phone</BForm.Label>

            <BForm.Control
              type='text'
              name='phone'
              // placeholder={t('staffFields.email.placeholder')}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='phone'
              className='text-danger'
            />
          </Col>
          <Col xs={12} className='mb-2'>
            <div className='mt-4 edit-field-playerbtn'>
              <Button
                variant='warning'
                onClick={() => {
                  if (isEdit) {
                    setIsEdit(!isEdit)
                  } else {
                    handleSubmit()
                  }
                }}
              >
                {!isEdit ? 'Update' : 'Edit Player'}
                {loading && (
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                )}
              </Button>
             {!isEdit && <Button
                variant='warning'
                onClick={() => {
                  setIsEdit(!isEdit)
                  resetForm()
                }}
              >
                Cancel
              </Button>}
            </div>
          </Col>
        </Row>
        {/* <div className='mt-4 d-flex justify-content-between align-items-center'>
          <Button
            variant='warning'
            onClick={() => navigate(AdminRoutes.Staff)}
          >
            {t('staffFields.cancelButton')}
          </Button>

          <Button
            variant='success'
            onClick={() => {
              handleSubmit()
            }}
            className='ml-2'
          >
            {t('staffFields.submitButton')}
            {loading && (
              <Spinner
                as='span'
                animation='border'

                role='status'
                aria-hidden='true'
              />
            )}
          </Button>

        </div> */}
      </Form>
  )
}

export default EditPlayerForm
