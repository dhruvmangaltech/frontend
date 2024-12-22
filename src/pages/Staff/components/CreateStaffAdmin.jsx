import React from 'react'
import { Row, Col } from '@themesberg/react-bootstrap'
import { Formik } from 'formik'
import { createAdminSchema } from '../schemas'
import { useNavigate } from 'react-router-dom'
import { Buffer } from 'buffer'
import { toast } from '../../../components/Toast'
import StaffForm from './StaffForm'
import { useCreateStaffAdminMutation } from '../../../reactQuery/hooks/customMutationHook'
import { AdminRoutes } from '../../../routes'
import { useTranslation } from 'react-i18next'

const CreateStaffAdmin = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['staff'])

  const { mutate: createStaffAdmin, isLoading: loading } = useCreateStaffAdminMutation({onSuccess: () => {
    toast(t('createStaff.createdSuccessToast'), 'success')
    navigate(AdminRoutes.Staff)
  }})

  const handleCreateSubmit = (formValues) => {
    if(formValues.role === 'Manager') delete formValues.adminId;
    else {
      formValues.adminId = Number(formValues?.adminId)
    }
    ([undefined, null].includes(formValues.permission) || Object.keys(formValues.permission).length < 1)
      ? toast(t('createStaff.selectPermissionErrorToast'), 'error')
      : createStaffAdmin({ ...formValues, password: Buffer.from(formValues.password).toString('base64') })
  }

  return (
    <div>
      <Row>
        <Col sm={8}>
          <h3>{t('createStaff.title')}</h3>
        </Col>
      </Row>

      <Formik
        initialValues={{
          email: '',
          password: '',
          adminUsername: '',
          firstName: '',
          lastName: '',
          role: null,
          permission: {},
          group: ''
        }}
        validationSchema={createAdminSchema(t)}
        onSubmit={(formValues) => handleCreateSubmit(formValues)}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue
        }) => (
          <StaffForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            loading={loading}
          />
        )}
      </Formik>
    </div>
  )
}

export default CreateStaffAdmin
