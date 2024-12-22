/* eslint-disable react/display-name */
import { Col, Row, Form as BForm, Dropdown, Button } from '@themesberg/react-bootstrap'
import { ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AdminRoutes } from '../../routes'
import CodepenEditor from '../CodeEditor'
import { toast } from '../Toast'

const EditCMSTemplate = ({
  values,
  cmsKeys,
  setFieldValue,
  handleChange,
  handleBlur,
  selectedTab,
  navigate,
  create = false,
  handleSubmit,
  details = false,
  initValues = false,
  title,
  setTitle,
  content,
  setContent
}) => {
  const { t } = useTranslation(['cms'])
  const [template, setTemplate] = useState('')
  const [titleErr, setTitleErr] = useState('')
  const [err, setErr] = useState('')
  const [label, setLabel] = useState('')
  const [requiredKeyData, setRequiredKeyData] = useState({})
  const onSubmitButtonClick = () => {
    if (template === '' && initValues.cmsType != 2) {
      setErr(t('inputField.content.errors.required'))
      toast(t('inputField.content.errors.requiredToast'), 'error')
    } else {
      setFieldValue('content', template)
      setFieldValue('title', label)
      handleSubmit()
      if (initValues) {
        (!initValues?.slug || !initValues?.title) && window.scroll(0, 0)
        if (!initValues?.title) {
          setTitleErr('Title is required')
        } else {
          setTitleErr('')
        }
      }
      setErr('')
    }
  }

  const showDynamicKeys = (item) => {
    requiredKeyData
      ? setRequiredKeyData({
        ...requiredKeyData,
        [item]: cmsKeys?.keyDescription[item]
      })
      : setRequiredKeyData({
        [item]: cmsKeys?.keyDescription[item]
      })
  }

  useEffect(() => {
    if (cmsKeys?.dynamicKeys && Object.keys(cmsKeys?.dynamicKeys)?.length) {
      let tempDataAll = {}
      let tempData = {}
      const dynamicKeys = cmsKeys?.dynamicKeys
      dynamicKeys.forEach((item) => {
        tempDataAll = { ...tempDataAll, [item]: cmsKeys.keyDescription[item] }
        if (item.required) {
          tempData = { ...tempData, [item]: cmsKeys.keyDescription[item] }
        }
      })
      setRequiredKeyData(tempData)
    }
  }, [cmsKeys?.dynamicKeys])

  useEffect(() => {
    if (template) {
      setErr('')
    }
    const delayDebounceFn = setTimeout(() => {
      setContent({
        ...content,
        [selectedTab]: template
      })
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [template])

  useEffect(() => {
    setFieldValue && setFieldValue('language', selectedTab)
    setLabel(label || values?.title?.[selectedTab] || values?.title?.EN)
  }, [selectedTab])

  useEffect(() => {
    setFieldValue('title', label)
    setTitle({
      ...title,
      [selectedTab]: label
    })
  }, [label])
  return (
    <>
      <Row className='mt-3'>
        <Col>
          <Col xs={12} md={6} className='mb-3'>
            <BForm.Label>
              {t('inputField.title.label')} <span className='text-danger'>* </span>
            </BForm.Label>
            <BForm.Control
              type='text'
              name='title'
              disabled={details}
              placeholder='Enter Title'
              value={label}
              onChange={(e) => {
                setLabel(e.target.value)
                handleChange(e)
                setTitleErr('')
              }}
              onBlur={handleBlur}
            />

            {titleErr
              ? (
                <Row>
                  <span className='text-danger'>{titleErr}</span>
                </Row>)
              : (
                <ErrorMessage
                  component='div'
                  name='title'
                  className='text-danger'
                />)}

          </Col>
        </Col>
      </Row>
      {initValues.cmsType != 2 && <Row>
        <Col>
          <div className='d-flex mb-2 align-items-center'>
            <BForm.Label>
              {t('inputField.content.label')} <span className='text-danger'>*</span>
            </BForm.Label>
            <Col />
            {initValues.cmsType != 3 && <Col className='d-flex justify-content-end align-items-center'>

              {!details &&
                <Dropdown className=' d-inline mx-2'>
                  <Dropdown.Toggle id='dropdown-autoclose-outside'>
                    {t('dynamicKeys')}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className=' user-dropdown'>
                    {cmsKeys?.dynamicKeys?.map?.((item, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          onClick={() => showDynamicKeys(item)}
                        >
                          {`${item} `}
                          {item.required ? t('required') : t('optional')}
                        </Dropdown.Item>
                      )
                    })}
                  </Dropdown.Menu>
                </Dropdown>}
            </Col>}
          </div>

          <CodepenEditor
            dynamicData={JSON.stringify(requiredKeyData, null, 2)}
            HTML={content?.[selectedTab] || ''}
            initial='HTML'
            mobileQuery={800}
            height='80vh'
            setTemplate={setTemplate}
            themeTransitionSpeed={150}
            setRequiredKeyData={setRequiredKeyData}
            selectedTab={selectedTab}
            setTemp={setTemplate}
            details={details}
          />

          <ErrorMessage
            component='div'
            name='content'
            className='text-danger'
          />
        </Col>
      </Row>}
      {err &&
        <Row>
          <span className='text-danger'>{err}</span>
        </Row>}
      <Row>
        <Col className='d-flex justify-content-between'>

          <Button
            variant='warning'
            className='m-2'
            onClick={() => navigate(AdminRoutes.CmsListing)}
          >
            {t('cancelButton')}
          </Button>

          <div>

            <Button
              variant='success'
              hidden={details || (create && values?.content?.[selectedTab] !== undefined)}
              onClick={onSubmitButtonClick}
              className='m-2'
            >
              {t('submitButton')}
            </Button>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default EditCMSTemplate