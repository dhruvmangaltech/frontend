import React from 'react'
import Select from 'react-select'
import { Button, Form as BForm } from '@themesberg/react-bootstrap'
import { Form, ErrorMessage, Formik } from 'formik'
import { SimpleEditFormContainer } from '../../style'

const VipTier = (props) => {
  const { closeModal, onSubmit, isLoading, selectedInnerButton, listData ,basicInfo} = props
  const headDisplay = () => {
    switch (selectedInnerButton.innerItem) {
      case 'vipTierChild':
        return (
          <div className='simple-text-head'>
            <h6>Vip Tier</h6>
          </div>
        )
      default:
        break
    }
  }
  
  const vipTierLevelOption = listData?.map(({ name, vipTierId }) => ({ value: vipTierId, label: name }))

  const findVipIdByName = (name) => {
    const matchingVipTier = vipTierLevelOption?.find((tier) => tier.label === name);
    return matchingVipTier ? matchingVipTier.value : null;
  };
  
  return (
    <SimpleEditFormContainer>
      <Formik
        initialValues={{
          vipTierLevel:  { value: findVipIdByName(basicInfo?.userVipTierName), label: basicInfo?.userVipTierName },
        }}
        onSubmit={(formValues, { resetForm }) => {
          
          onSubmit(formValues)
        }}
      >
        {({ values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <Form>
            {headDisplay()}
            <div className='form-group my-3'>
              <label
                htmlFor='vipTierLevel'
                className={touched.vipTierLevel && errors.vipTierLevel ? 'text-danger' : ''}
              >
                Vip Tier Level
              </label>
              <Select
                placeholder='Vip Tier Level'
                className='custom-select'
                name='vipTierLevel'
                options={vipTierLevelOption}
                value={values.vipTierLevel}
                onChange={(e) => {
                  setFieldValue('vipTierLevel', e)
                }}
                // onChange={(selectedOption) => {
                //   const event = { target: { name: 'vipTierLevel', value: selectedOption } }
                //   handleChange(event)
                // }}
                onBlur={handleBlur}
              />
              <ErrorMessage
                component='div'
                name='vipTierLevel'
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

export default VipTier