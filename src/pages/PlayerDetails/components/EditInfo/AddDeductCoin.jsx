import React from 'react'
import Select from 'react-select'
import { Button, Form as BForm } from '@themesberg/react-bootstrap'
import { Form, ErrorMessage, Formik } from 'formik'
import { addDeductCoinFormSchema } from './schema'

import { SimpleEditFormContainer } from '../../style'
import { allowOnlyNumber, coinConst, deductConst, coinConstDeduction } from './constant'

const AddDeductCoin = (props) => {
  const { closeModal, onSubmit, isLoading, selectedInnerButton } = props
  const headDisplay = () => {
    switch (selectedInnerButton.innerItem) {
      case 'addDeductCoinsChild':
        return (
          <div className='simple-text-head'>
            <h6>Add/Deduct coin</h6>
          </div>
        )
      default:
        break
    }
  }
  return (
    <SimpleEditFormContainer>
      <Formik
        initialValues={{
          reason: '',
          coinType: coinConst[0],
          operationType: null,
          gcAmount: '',
          scAmount: ''
        }}
        validationSchema={addDeductCoinFormSchema()}
        onSubmit={(formValues, { resetForm }) => {
          onSubmit(formValues)
        }}
      >
        {({ values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <Form>
            {headDisplay()}
            <div className='form-group my-3'>
              <label
                htmlFor='operationType'
                className={touched.operationType && errors.operationType ? 'text-danger' : ''}
              >
                Operation Type
              </label>
              <Select
                name='operationType'
                placeholder='Operation Type'
                className='custom-select'
                options={deductConst}
                // isLoading={isGetStateLoading}
                // value={{ value: '1', label: 'USA' }}
                // isDisabled={isEdit}
                onChange={(selectedOption) => {
                  const event = { target: { name: 'operationType', value: selectedOption } }
                  handleChange(event)
                }}
                onBlur={handleBlur}
              />
              <ErrorMessage
                component='div'
                name='operationType'
                className='text-danger'
              />
            </div>
       {/*      {values?.operationType?.value === '1' ? <div className='form-group my-3'>
              <label
                htmlFor='coinType'
                className={touched.coinType && errors.coinType ? 'text-danger' : ''}
              >
                Coin Type
              </label>
              <Select
                placeholder='Coin Type'
                className='custom-select'
                name='coinType'
                options={coinConst}
                // isLoading={isGetStateLoading}
                value={values.coinType}
                // isDisabled={isEdit}
                onChange={(selectedOption) => {
                  const event = { target: { name: 'coinType', value: selectedOption } }
                  handleChange(event)
                }}
                onBlur={handleBlur}
              />
              <ErrorMessage
                component='div'
                name='coinType'
                className='text-danger'
              />
            </div> :  */}
            <div className='form-group my-3'>
              <label
                htmlFor='coinType'
                className={touched.coinType && errors.coinType ? 'text-danger' : ''}
              >
                Coin Type
              </label>
              <Select
                placeholder='Coin Type'
                className='custom-select'
                name='coinType'
                options={coinConstDeduction}
                value={values.coinType}
                onChange={(selectedOption) => {
                  const event = { target: { name: 'coinType', value: selectedOption } }
                  handleChange(event)
                }}
                onBlur={handleBlur}
              />
              <ErrorMessage
                component='div'
                name='coinType'
                className='text-danger'
              />
            </div>
            {/* } */}
            { values?.coinType?.value === 'gc' ? <div className='form-group my-3'>
              <label
                htmlFor='gcAmount'
                className={touched.gcAmount && errors.gcAmount ? 'text-danger' : ''}
              >
              Gold Coins
              </label>
              <BForm.Control
                type='text'
                name='gcAmount'
                placeholder='Amount'
                value={values.gcAmount}
                onChange={(event) => {
                  setFieldValue('gcAmount', allowOnlyNumber(event.target.value))
                }}
                // onChange={handleChange}
                onBlur={handleBlur}
                // disabled={isEdit}
              />
              <ErrorMessage
                component='div'
                name='gcAmount'
                className='text-danger'
              />
            </div> : <div className='form-group my-3'>
                  <label
                    htmlFor='scAmount'
                    className={touched.scAmount && errors.scAmount ? 'text-danger' : ''}
                  >
                     Coins
                  </label>
                  <BForm.Control
                    type='text'
                    name='scAmount'
                    placeholder='Amount'
                    value={values.scAmount}
                    onChange={(event) => {
                      setFieldValue('scAmount', allowOnlyNumber(event.target.value))
                    }}
                    onBlur={handleBlur}
                    // disabled={isEdit}
                  />
                  <ErrorMessage
                    component='div'
                    name='scAmount'
                    className='text-danger'
                  />
                </div>}
            <div className='form-group my-3'>
              <label
                htmlFor='reason'
                className={touched.reason && errors.reason ? 'text-danger' : ''}
              >
                Reason
              </label>
              <BForm.Control
                as='textarea'
                name='reason'
                placeholder='Reason'
                value={values.reason}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                component='div'
                name='reason'
                className='text-danger'
              />
            </div>
            <div className='edit-btn-wrap'>
              <Button
                variant='success'
                onClick={handleSubmit}
                className='me-2'
                disabled={isLoading}
              >
                 {isLoading ? 'Loading' : 'Update'}
              </Button>
              <Button
                variant='warning'
                onClick={closeModal}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </SimpleEditFormContainer>
  )
}

export default AddDeductCoin