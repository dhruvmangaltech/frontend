import React from 'react'
import { Row, Col } from '@themesberg/react-bootstrap'
import { Formik } from 'formik'
import { createProductSchema } from '../../schemas'
import { useNavigate } from 'react-router-dom'
import { Buffer } from 'buffer'
import { toast } from '../../../../components/Toast'
import StaffForm from './StaffForm.jsx'
import { useCreateProduct } from '../../../../reactQuery/hooks/customMutationHook'
import { AdminRoutes } from '../../../../routes'
import { useTranslation } from 'react-i18next'

const CreateProduct = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['products'])

  const { mutate: createProduct, isLoading: loading } = useCreateProduct({onSuccess: () => {
    toast(t('createProduct.createdSuccessToast'), 'success')
    navigate(AdminRoutes.Products)
  }})

  const handleCreateSubmit = (formValues) => {
    // if(formValues.role === 'Manager') delete formValues.adminId;
    // else {
    //   formValues.adminId = Number(formValues?.adminId)
    // }
    // ([undefined, null].includes(formValues.permission) || Object.keys(formValues.permission).length < 1)
    //   ? toast(t('createProduct.selectPermissionErrorToast'), 'error')
    //   : createStaffAdmin({ ...formValues, password: Buffer.from(formValues.password).toString('base64') })
		createProduct({...formValues, isActive: "true"})
  }

  return (
    <div>
      <Row>
        <Col sm={8}>
          <h3>{t('createProduct.title')}</h3>
        </Col>
      </Row>

      <Formik
        initialValues={{
          name: '',
          colour: '',
          isActive: '',
          scale: '',
          size: '',
          description: null,
        }}
        validationSchema={createProductSchema(t)}
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

export default CreateProduct
