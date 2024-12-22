import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { Row, Col, Form as BForm, Button } from '@themesberg/react-bootstrap'
import { PlayerSearchContainer } from './style'
import { playerSearchSchmes } from './schemas'
import { checkForReset, initialSet } from './constants'
const PlayerSearch = (props) => {
  const {
    globalSearch,
    setGlobalSearch
  } = props
  const resetToggler = (resetForm) => {
    resetForm()
    setGlobalSearch(initialSet)
  }
  return (
    <PlayerSearchContainer>
      <Formik
        initialValues={{
          idSearch: '',
          emailSearch: '',
          firstNameSearch : '',
          lastNameSearch : '',
          userNameSearch : '',
          phoneSearch : '',
          affiliateIdSearch : '',
          regIpSearch : '',
          lastIpSearch : ''
        }}
        validationSchema={playerSearchSchmes()}
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
                  <BForm.Label>Player Id</BForm.Label>
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
                  <BForm.Label>Email</BForm.Label>
                  <BForm.Control
                    type='text'
                    placeholder='Email'
                    name='emailSearch'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emailSearch}
                  />
                  <ErrorMessage
                    component='div'
                    name='emailSearch'
                    className='text-danger'
                  />
                </BForm.Group>
              </Col>
              <Col className='col-lg-3 col-sm-6 col-12'>
                <BForm.Group className='mb-3' controlId='formGroupEmail'>
                  <BForm.Label>First Name</BForm.Label>
                  <BForm.Control
                    type='text'
                    name='firstNameSearch'
                    placeholder='First Name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstNameSearch}
                  />
                </BForm.Group>
              </Col>
              <Col className='col-lg-3 col-sm-6 col-12'>
                <BForm.Group className='mb-3' controlId='formGroupEmail'>
                  <BForm.Label>Last Name</BForm.Label>
                  <BForm.Control
                    type='text'
                    name='lastNameSearch'
                    placeholder='Last Name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastNameSearch}
                  />
                </BForm.Group>
              </Col>
            </Row>
            <Row>
              <Col className='col-lg-3 col-sm-6 col-12'>
                <BForm.Group className='mb-3' controlId='formGroupEmail'>
                  <BForm.Label>User Name</BForm.Label>
                  <BForm.Control
                    type='text'
                    name='userNameSearch'
                    placeholder='UserName'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userNameSearch}
                  />
                </BForm.Group>
              </Col>
              <Col className='col-lg-3 col-sm-6 col-12'>
                <BForm.Group className='mb-3' controlId='formGroupEmail'>
                  <BForm.Label>Phone Number</BForm.Label>
                  <BForm.Control
                    type='text'
                    name='phoneSearch'
                    placeholder='Phone Number'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneSearch}
                  />
                  <ErrorMessage
                    component='div'
                    name='phoneSearch'
                    className='text-danger'
                  />
                </BForm.Group>
              </Col>
              {/* <Col className='col-lg-3 col-sm-6 col-12'>
                <BForm.Group className='mb-3' controlId='formGroupEmail'>
                  <BForm.Label>Affiliate ID</BForm.Label>
                  <BForm.Control
                    type='text'
                    name='affiliateIdSearch'
                    placeholder='Affiliate ID'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.affiliateIdSearch}
                  />
                  <ErrorMessage
                    component='div'
                    name='affiliateIdSearch'
                    className='text-danger'
                  />
                </BForm.Group>
              </Col> */}
              <Col className='col-lg-3 col-sm-6 col-12'>
                <BForm.Group className='mb-3' controlId='formGroupEmail'>
                  <BForm.Label>Registration Ip</BForm.Label>
                  <BForm.Control
                    type='text'
                    name='regIpSearch'
                    placeholder='Registration Ip'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.regIpSearch}
                  />
                  <ErrorMessage
                    component='div'
                    name='regIpSearch'
                    className='text-danger'
                  />
                </BForm.Group>
              </Col>
              <Col className='col-lg-3 col-sm-6 col-12'>
                <BForm.Group className='mb-3' controlId='formGroupEmail'>
                  <BForm.Label>Last Ip</BForm.Label>
                  <BForm.Control
                    type='text'
                    name='lastIpSearch'
                    placeholder='Last Ip'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastIpSearch}
                  />
                  <ErrorMessage
                    component='div'
                    name='lastIpSearch'
                    className='text-danger'
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
    </PlayerSearchContainer>
  )
}

export default PlayerSearch;