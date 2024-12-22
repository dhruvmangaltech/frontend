import React, { useState } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import {
  Col,
  Row,
  Form as BForm,
  Button,
  Tabs,
  Tab
} from '@themesberg/react-bootstrap'
import { createCmsSchema } from '../schema'
import useCreateCms from '../hooks/useCreateCms'
import EditCMSTemplate from '../../../components/EditCMSTemplate'
import Trigger from '../../../components/OverlayTrigger'
import useCheckPermission from '../../../utils/checkPermission'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'
import { GalleryModal } from '../../../components/ConfirmationModal'
import { useLocation } from 'react-router-dom'

const CreateCms = ({ cmsData, details }) => {
  const {
    navigate,
    createCms,
    editCms,
    cmsPageId,
    setTemplate,
    showGalleryModal,
    setShowGalleryModal,
    cmsKeys,
    selectedTab,
    loading,
    t
  } = useCreateCms(cmsData)
  const { state } = useLocation();
  const { isHidden } = useCheckPermission()
  const [title, setTitle] = useState(cmsData ? cmsData?.title : { EN: '' })
  const [content, setContent] = useState(cmsData ? cmsData?.content : { EN: '' })
  return (
    <>
      <Row className="w-100 m-auto">
        <Col xs={9}>
          <h3>{cmsData ? `${!details ? t('editCmsTitle') : ''} ${t('viewCmsTitle')} ${cmsData?.title?.EN}` : t('createCmsTitle')}</h3>
        </Col>
        <Col xs={3} className='text-end'>
          <Trigger message='Gallery' id={'gallery'} />
          <Button
            id={'gallery'}
            hidden={details || isHidden({ module: { key: 'ImageGallery', value: 'R' } })}
            onClick={() => {
              setShowGalleryModal(true)
            }}
            variant='secondary'
          >
            <FontAwesomeIcon icon={faImages} />
          </Button>
        </Col>
      </Row>

      <Formik
        initialValues={{
          cmsType: cmsData ? cmsData?.cmsType : 1,
          targetUrl: cmsData?.targetUrl ? cmsData?.targetUrl : '',
          title: title?.EN || '',
          slug: cmsData ? cmsData?.slug : '',
          content: content?.EN || '',
          category: cmsData ? cmsData?.category : 1,
          isActive: cmsData ? (!!cmsData?.isActive) : true,
          language: selectedTab
        }}
        validationSchema={createCmsSchema(t)}
        onSubmit={(formValues) => {
          if (!loading) {
            !cmsData
              ? createCms({ cmsData: { ...formValues, category: formValues.cmsType == '3' ? 4 : +formValues.category, cmsType: +formValues.cmsType, title: title, content: content } })
              : editCms({ cmsData: { ...formValues, category: formValues.cmsType == '3' ? 4 : +formValues.category, cmsType: +formValues.cmsType, title: title, content: content, cmsPageId: parseInt(cmsPageId) } })
          }
        }}
      >
        {({ values, errors, handleChange, handleSubmit, handleBlur, setFieldValue }) => (
          <Form>
            <Row className='mb-3 align-items-center'>
              <Col xs='12' sm='6' lg='3'>
                <BForm.Label>
                  {t('inputField.type.label')} <span className='text-danger'>*</span>
                </BForm.Label>

                <BForm.Select
                  type='text'
                  name='cmsType'
                  // className='w-auto'
                  disabled={(cmsData && cmsData?.cmsType == '3') || details}
                  value={values.cmsType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={1}>{t('inputField.type.options.internal')}</option>
                  <option value={2}>{t('inputField.type.options.external')}</option>
                  {(cmsData?.cmsType == '3' || state?.cmsData.filter((cms, i) => cms.cmsType == '3').length === 0) && <option value={3}>{t('inputField.type.options.footer')}</option>}
                </BForm.Select>
              </Col>
              {values.cmsType != 3 &&
                <Col xs={12} sm={6} lg={3}>
                  <Col>
                    <BForm.Label>
                      {values.cmsType != 2 ? t('inputField.slug.label') : t('inputField.targetUrl.label')} <span className='text-danger'>*</span>
                    </BForm.Label>
                  </Col>
                  {values.cmsType != 2 ?
                    <Col>
                      <BForm.Control
                        type='text'
                        name='slug'
                        placeholder='Enter Slug'
                        value={values.slug}
                        disabled={details}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <ErrorMessage
                        component='div'
                        name='slug'
                        className='text-danger'
                      />
                    </Col> :
                    <Col>
                      <BForm.Control
                        type='text'
                        name='targetUrl'
                        placeholder='Enter Target URL'
                        value={values.targetUrl}
                        disabled={details}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <ErrorMessage
                        component='div'
                        name='targetUrl'
                        className='text-danger'
                      />
                    </Col>}
                </Col>}

              <Col xs={12} sm={6} lg={3}>
                <BForm.Label>
                  {t('inputField.category.label')} <span className='text-danger'>*</span>
                </BForm.Label>

                <BForm.Select
                  type='text'
                  name='category'
                  // className='w-auto'
                  value={values.category}
                  disabled={details}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {values.cmsType != '3' ? <><option value={1}>{t('inputField.category.options.support')}</option>
                    <option value={2}>{t('inputField.category.options.about')}</option>
                    <option value={3}>{t('inputField.category.options.responsibleGaming')}</option></>
                    : <option value={4}>{t('inputField.category.options.footer')}</option>}
                </BForm.Select>
              </Col>

              <Col>
                <Col>
                  <BForm.Label>
                    {t('inputField.status.label')} <span className='text-danger'>*</span>
                  </BForm.Label>
                </Col>
                <Col>
                  <BForm.Check
                    type='switch'
                    name='isActive'
                    disabled={details}
                    defaultChecked={values.isActive}
                    value={values.isActive}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Col>

              </Col>

            </Row>
            {/* tabs will be increased in case of multilanguage */}
            <Tabs
              activeKey={selectedTab}
              className='nav-light mt-3'
            >
              <Tab
                eventKey='EN'
                title='EN'
                mountOnEnter
                tabClassName={'tab-active'}
              >
                <div className='mt-5'>
                  <EditCMSTemplate
                    values={cmsData}
                    cmsKeys={cmsKeys}
                    setFieldValue={setFieldValue}
                    selectedTab={selectedTab}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setTemp={setTemplate}
                    handleSubmit={handleSubmit}
                    navigate={navigate}
                    details={details}
                    initValues={values}
                    errors={errors}
                    title={title}
                    setTitle={setTitle}
                    content={content}
                    setContent={setContent}
                  />
                </div>
              </Tab>
            </Tabs>

          </Form>
        )}
      </Formik>
      {showGalleryModal &&
        <GalleryModal
          galleryModal={showGalleryModal}
          setGalleryModal={setShowGalleryModal}
        />}
    </>
  )
}

export default CreateCms
