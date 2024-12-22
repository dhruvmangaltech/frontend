import React, { useState } from 'react'
import { Form, Button } from '@themesberg/react-bootstrap'
import { ErrorMessage, Formik } from 'formik'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { editSimpleFormSchema } from './schema'

import { SimpleEditFormContainer } from '../../style'

const showSave = ['removePwLock']

const SimpleEditForm = (props) => {
  const { closeModal, onSubmit, basicInfo, selectedInnerButton, showSaveBtn, title, placeholder } = props
  const [isFav, setIsFav] = useState(false)
  const headDisplay = () => {
    switch (selectedInnerButton?.innerItem) {
      case 'removePwLock' :
        return (
          <div className='simple-text-head'>
            <h6>Remove PW Lock</h6>
          </div>
        )
        case 'paynotePayment' :
        return (
          <div className='simple-text-head'>
            <h6>Paynote</h6>
            Are you sure you want to {(basicInfo[selectedInnerButton?.innerItem] === 'DISABLED') ? 'allow' : 'restrict'} Paynote for this player ?
          </div>
        )
        case 'tripleAPayment' :
        return (
          <div className='simple-text-head'>
            <h6>Triple A</h6>
            Are you sure you want to {(basicInfo[selectedInnerButton?.innerItem] === 'DISABLED') ? 'allow' : 'restrict'} Triple A for this player ?
          </div>
        )
      case 'isBan':
        return (
          <div className='simple-text-head'>
            <h6>Player Ban/Unban</h6>
            Are you sure you want to {basicInfo[selectedInnerButton?.innerItem] ? 'UnBan' : 'Ban'} this player ?
          </div>
        )
      case 'isRestrict':
        return (
          <div className='simple-text-head'>
            <h6>Restrict Player</h6>
            Are you sure you want to {basicInfo[selectedInnerButton?.innerItem] ? 'Remove Restriction' : 'Restrict Player'} this player ?
          </div>
        )
      case 'phoneVerified':
        return (
          <div className='simple-text-head'>
            <h6>Phone Verify</h6>
            Do you want to {basicInfo[selectedInnerButton?.innerItem] ? 'Unverify' : 'Verify'} this player ?
          </div>
        )
      case 'isRedemptionSubscribed':
        return (
          <div className='simple-text-head'>
            <h6>Redemption Email</h6>
            Are you sure you want to {basicInfo?.moreDetails[selectedInnerButton?.innerItem] ? 'restrict' : 'allow'} player redemption email ?
          </div>
        )
      case 'isSubscribed':
        return (
          <div className='simple-text-head'>
            <h6>Subscribe/Unsubscribe Player</h6>
            Do you want to {basicInfo?.moreDetails[selectedInnerButton?.innerItem] ? 'unsubscribe' : 'subscribe'} this player ?
          </div>
        )
      case 'isInternalUser':
        return (
          <div className='simple-text-head'>
            <h6>Mark as Test</h6>
          </div>
        )
      case 'forceLogoutChild':
        return (
          <div className='simple-text-head'>
            <h6>Force Logout</h6>
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
          reason: ''
        }}
        validationSchema={editSimpleFormSchema()}
        onSubmit={(formValues, { resetForm }) => {
          onSubmit(formValues, isFav)
          resetForm()
          setIsFav(false)
        }}
      >
        {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
          <Form>
            {selectedInnerButton ? headDisplay() : <></>}
            <div className='form-group'>
              <label
                htmlFor='reason'
                className={touched.reason && errors.reason ? 'text-danger' : ''}
              >
                {title ? title : 'Reason'}
              </label>
              <Form.Control
                as='textarea'
                name='reason'
                placeholder={placeholder ? placeholder : 'Reason'}
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
            <div className='form-group fab-icon-wrap'>
              <label
                htmlFor='reason'
                className={touched.reason && errors.reason ? 'text-danger' : ''}
              >
                Favourite
              </label>
              <div className='fab-icon'>
                <FontAwesomeIcon
                  icon={faStar} size='1x'
                  style={{ color: isFav ? '#ffdd77' : '' }}
                  onClick={() => setIsFav(!isFav)}
                />
              </div>
            </div>
            {selectedInnerButton ?
              <div className='edit-btn-wrap'>
                <Button
                  variant='success'
                  onClick={handleSubmit}
                  className='me-2'
                > Save
                </Button>
                <Button
                  variant='warning'
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
              :
              <></>
            }
            {
              showSaveBtn ?
                <div className='edit-btn-wrap'>
                  <Button
                    variant='success'
                    onClick={handleSubmit}
                    className='me-2'
                  >
                    Save
                  </Button>
                </div>
                :
                <></>

            }
          </Form>
        )}
      </Formik>
    </SimpleEditFormContainer>
  )
}

export default SimpleEditForm