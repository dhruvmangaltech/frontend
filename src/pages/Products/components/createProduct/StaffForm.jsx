import React from 'react'
import {
  Button,
  Card,
  Form as BForm,
  Row,
  Col,
  Badge,
  Spinner,
  InputGroup
} from '@themesberg/react-bootstrap'
import { Form, Field, ErrorMessage } from 'formik'
import Trigger from '../../../../components/OverlayTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import CreatableSelect from 'react-select/creatable'
import { toast } from '../../../../components/Toast'
import { AdminRoutes } from '../../../../routes'
import useStaffForm from '../../hooks/useStaffForm'
import { customLabel, permissionLabel } from '../../../../utils/helper'
import '../../staff.scss'

const ProductForm = ({
  values,
  handleChange,
  handleSubmit,
  handleBlur,
  setFieldValue,
  loading,
  isEdit = false
}) => {
  const {
    navigate,
    data,
    adminRole,
    adminDetails,
    type,
    setType,
    groupOptions,
    setGroupOptions,
    selectedGroup,
    setSelectedGroup,
    t
  } = useStaffForm({ group: values?.group, role: values.role, adminId: values.adminId })

  const groupChangeHandler = (option) => {
    if (option === null) {
      setSelectedGroup()
      setFieldValue('group', '')
    } else {
      setSelectedGroup({ label: option?.label, value: option?.value })
      setFieldValue('group', option?.value)
    }
  }

  const roleChangeHandler = (e) => {
    handleChange(e)
    if (e.target.value === 'Support') {
      setFieldValue('permission', {})
      setFieldValue('adminId', '')
    }
  }

  const permissionHandler = (e, key) => {
    if (e.target.value === 'R' || e.target.value === 'DR' || values?.permission?.[key]?.includes('R')) {
      if (e.target.value === 'R' && !e.target.checked) {
        delete values.permission[key]
        setFieldValue(
          'permission',
          values.permission
        )
      } else {
        handleChange(e)
      }
    } else {
      toast(
        t('staffFields.permissions.selectReadPermissionErrorToast'),
        'error'
      )
    }
  }

  return (
    <>
      <Form>
        <Row>
          <Col md={6} sm={12}>
            <BForm.Label>{t('productFields.name.label')}</BForm.Label>

            <BForm.Control
              type='text'
              name='name'
              placeholder={t('productFields.name.placeholder')}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='name'
              className='text-danger'
            />
          </Col>

          <Col md={6} sm={12}>
            <BForm.Label>{t('productFields.size.label')}</BForm.Label>

            <Trigger message='Must be atleast 8 characters long with 1 uppercase and 1 lowercase letters, 1 special character and 1 digit' id={'info'} />
            <InputGroup id={'info'}>
              <BForm.Control
                type='text'
                name='size'
                placeholder={t('productFields.size.placeholder')}
                value={values.size}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>

            <ErrorMessage
              component='div'
              name='size'
              className='text-danger'
            />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col md={6} sm={12}>
            <BForm.Label>{t('productFields.scale.label')}</BForm.Label>

            <BForm.Control
              type='text'
              name='scale'
              placeholder={t('productFields.scale.placeholder')}
              value={values.scale}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <ErrorMessage
              component='div'
              name='scale'
              className='text-danger'
            />
          </Col>

          <Col md={6} sm={12}>
            <BForm.Label>{t('productFields.colour.label')}</BForm.Label>

            <BForm.Control
              type='text'
              name='colour'
              placeholder={t('productFields.colour.placeholder')}
              value={values.colour}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <ErrorMessage
              component='div'
              name='colour'
              className='text-danger'
            />
          </Col>
        </Row>

        <Row>
          <Col md={6} sm={12} className='mt-3'>
            <BForm.Label>{t('productFields.description.label')}</BForm.Label>

            <BForm.Control
              type='text'
              name='description'
              placeholder={t('productFields.description.placeholder')}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />

            <ErrorMessage
              component='div'
              name='description'
              className='text-danger'
            />
          </Col>

        </Row>

        <div className='mt-4 d-flex justify-content-between align-items-center'>
          <Button
            variant='warning'
            onClick={() => navigate(AdminRoutes.Staff)}
          >
            {t('productFields.cancelButton')}
          </Button>

          <Button
            variant='success'
            onClick={
              handleSubmit
            }
            className='ml-2'
            disabled={loading}

          >
            {t('productFields.submitButton')}
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

        </div>
      </Form>
    </>
  )
}

export default ProductForm
