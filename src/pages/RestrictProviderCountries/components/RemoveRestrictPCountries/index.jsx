import React from 'react'
import { Button, Row, Col, Form } from '@themesberg/react-bootstrap'

import CountriesList from '../CountriesList'
import { useTranslation } from 'react-i18next'

const RemoveRestrictPCountries = ({
  restrictedCountries,
  limit,
  page,
  setLimit,
  setPage,
  totalPages,
  addDeleteCountries,
  removedCountries,
  removeDeleteCountries,
  removeRestrictedCountries
}) => {
  const { t } = useTranslation('casino')
  return (
    <>
      <Row>
        <Col xs={4}>
          <Form.Label>
            <h5>{t('restrictedCountries.removeCountriesAppearHere')}</h5>
          </Form.Label>
        </Col>

        <Col className='text-right'>
          <Button
            variant='success'
            className='f-right'
            disabled={removedCountries.count === 0}
            onClick={removeRestrictedCountries}
          >
            {t('restrictedCountries.submitButton')}
          </Button>
        </Col>
      </Row>

      <CountriesList
        disablePagination
        countries={removedCountries}
        hasActions
        hasRemoveGamesAction
        removeCountries={removeDeleteCountries}
      />

      <Row className='mt-3'>
        <Col xs={4}>
          <Form.Label>
            <h5>{t('restrictedCountries.restrictedCountriesLabel')}</h5>
          </Form.Label>
        </Col>
      </Row>

      <CountriesList
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        countries={restrictedCountries}
        totalPages={totalPages}
        hasActions
        hasAddGamesAction
        addCountries={addDeleteCountries}
      />
    </>
  )
}

export default RemoveRestrictPCountries
