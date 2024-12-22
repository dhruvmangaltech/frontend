import React from 'react'
import { Button, Row, Col, Tabs, Tab } from '@themesberg/react-bootstrap'

import useAddGames from './hooks/useAddGames'
import Preloader from '../../components/Preloader'
import AddedGamesTable from './components/AddedGamesTable'
import GamesList from './components/GamesList'
import { Link } from 'react-router-dom'
import { AdminRoutes } from '../../routes'
import RemoveGamesTable from './components/RemoveGamesTable'

const AddSubCategoryGames = () => {
  const {
    t,
    selectedTab,
    setSelectedTab,
    loading,
    page,
    limit,
    viewGames,
    search,
    setLimit,
    setPage,
    setSearch,
    totalPages,
    masterGames,
    selectedGames,
    addGame,
    removeGame,
    addGamesToSubCategory,
    subCategoryName,
    selectedProvider,
    setSelectedProvider,
    getProviderName,
    remPage,
    setRemPage,
    setRemLimit,
    remLimit,
    addDeleteGames,
    removedGames,
    removeDeleteGames,
    removeGamesToSubCategory,
    searchMaster,
    setSearchMaster
  } = useAddGames()
  return (
    <>
      <Row>
          <Col className='d-flex'>
            <h3 style={{ fontSize: '1rem' }}>{t('casinoGames.addGames.gameScrumbTitle')}<Link style={{textDecoration: 'underline'}} to={AdminRoutes.CasinoSubCategories}> {t('casinoGames.addGames.AddGameScrumb')}</Link>{' >> '}{t('casinoGames.addGames.gameScrumb')}</h3>
          </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <h3>{t('casinoGames.addGames.title')} {subCategoryName}</h3>
        </Col>

        
      </Row>

      <Tabs
              activeKey={selectedTab}
              onSelect={(tab) => {
                setSearch('')
                setSearchMaster('')
                setSelectedTab(tab)
              }}
              className='nav-light'
            >
              <Tab eventKey='view-games' title='View Games'>
                <div className='mt-5'>
                  <Row className='mt-3 d-flex'>
                  <GamesList
                    loading={loading}
                    disablePagination
                    t={t}
                    page={page}
                    limit={limit}
                    search={search}
                    setLimit={setLimit}
                    setPage={setPage}
                    setSearch={setSearch}
                    totalPages={totalPages}
                    masterGames={{count: viewGames?.length, rows: viewGames}}
                    getProviderName={getProviderName}
                    firstGames
                  />
                  </Row>
                </div>
              </Tab>

              <Tab
                eventKey='add-games'
                title='Add Games'
              >
                <div className='mt-5'>
                  <Row className='mt-3 d-flex'>
                  <AddedGamesTable t={t} addGamesToSubCategory={addGamesToSubCategory} selectedGames={selectedGames} removeGame={removeGame} />
                  <GamesList
                    loading={loading}
                    t={t}
                    page={page}
                    limit={limit}
                    search={searchMaster}
                    setLimit={setLimit}
                    setPage={setPage}
                    setSearch={setSearchMaster}
                    totalPages={totalPages}
                    masterGames={masterGames}
                    addGame={addGame}
                    viewGames
                    hasActions
                    hasAddGamesAction
                    selectedProvider={selectedProvider}
                    setSelectedProvider={setSelectedProvider}
                    getProviderName={getProviderName}
                  />
                  </Row>
                </div>
              </Tab>

              <Tab
                eventKey='remove-games'
                title='Remove Games'
              >
                <div className='mt-5'>
                  <Row className='mt-3 d-flex'>
                  <RemoveGamesTable t={t} removeGamesToSubCategory={removeGamesToSubCategory} selectedGames={removedGames} removeGame={removeDeleteGames} />
                  <GamesList
                    loading={loading}
                    t={t}
                    disablePagination
                    page={page}
                    limit={limit}
                    search={search}
                    setLimit={setLimit}
                    setPage={setPage}
                    setSearch={setSearch}
                    totalPages={totalPages}
                    masterGames={{count: viewGames?.length, rows: viewGames}}
                    addGame={addDeleteGames}
                    selectedProvider={selectedProvider}
                    setSelectedProvider={setSelectedProvider}
                    getProviderName={getProviderName}
                    hasActions
                    hasAddGamesAction
                    removeGames
                  />
                  </Row>
                </div>
              </Tab>
            </Tabs>
    </>

  )
}

export default AddSubCategoryGames
