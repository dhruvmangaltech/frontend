import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { Row, Col, Form as BForm, Button } from '@themesberg/react-bootstrap'
import { ProductSearchContainer } from './style'
import { productSearchSchmes } from './schemas.js'
import { checkForReset, initialSet } from './constants'
const ProductSearch = (props) => {
  const {
    globalSearch,
    setGlobalSearch
  } = props
  const resetToggler = (resetForm) => {
    resetForm()
    setGlobalSearch(initialSet)
  }
  return (
    <ProductSearchContainer>
      <Formik
        initialValues={{
          idSearch: '',
          nameSearch: '',
          colourSearch : '',
          ScaleSearch : '',
          SizeSearch : '',
          DescriptionSearch : ''
        }}
        validationSchema={productSearchSchmes()}
        onSubmit={(formValues, { resetForm }) => {
          const tempValue = { ...formValues }
          setGlobalSearch(tempValue)
        }}
      >
        {({
          touched,
          errors,
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          resetForm
        }) => (
          <Form>
            <Row>
              <Col className='col-lg-3 col-sm-6 col-12'>
                <BForm.Group className='mb-3' controlId='idSearch'>
                  <BForm.Label>Product Id</BForm.Label>
                  <BForm.Control
                    type='text'
                    name='idSearch'
                    placeholder='Player ID'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.idSearch}
                  />
                  <ErrorMessage
                    component='div'
                    name='idSearch'
                    className='text-danger'
                  />
                </BForm.Group>
              </Col>
              <Col className='col-lg-3 col-sm-6 col-12'>
                <BForm.Group className='mb-3' controlId='formGroupEmail'>
                  <BForm.Label>Product Name</BForm.Label>
                  <BForm.Control
                    type='text'
                    placeholder='Product Name'
                    name='nameSearch'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nameSearch}
                  />
                  <ErrorMessage
                    component='div'
                    name='nameSearch'
                    className='text-danger'
                  />
                </BForm.Group>
              </Col>
              <Col className='col-lg-3 col-sm-6 col-12'>
                <BForm.Group className='mb-3' controlId='formGroupEmail'>
                  <BForm.Label>Size</BForm.Label>
                  <BForm.Control
                    type='text'
                    name='sizeSearch'
                    placeholder='Size'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.SizeSearch}
                  />
                </BForm.Group>
              </Col>
              <Col className='col-lg-3 col-sm-6 col-12'>
                <BForm.Group className='mb-3' controlId='formGroupEmail'>
                  <BForm.Label>scale</BForm.Label>
                  <BForm.Control
                    type='text'
                    name='scaleSearch'
                    placeholder='Scale'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ScaleSearch}
                  />
                </BForm.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className='buttonDiv'>
                  <Button variant='primary' type='submit'>Search</Button>
                  <Button variant='secondary' onClick={() => resetToggler(resetForm)} type='button'>Reset</Button>
                </div>
              </Col>
            </Row>
          </Form>)}
      </Formik>
    </ProductSearchContainer>
  )
}

export default ProductSearch;