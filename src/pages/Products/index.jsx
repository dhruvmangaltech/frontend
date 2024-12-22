import * as React from 'react'
import ProductSearch from './ProductSearch'
import useProductListing from './useProductListing';

const Products = () => {

    const { t, navigate, selected, loading, sort, setStatusShow, statusShow, handleYes, status,
        setSort, over, setOver, playersData, search, setSearch, totalPages, page, setPage, limit, setLimit, setKycOptions, setOrderBy, handleStatusShow,
        globalSearch,
        setGlobalSearch
      } = useProductListing();

    return (
        <>
            <ProductSearch
                globalSearch={globalSearch}
                setGlobalSearch={setGlobalSearch}
            />
        </>
    )
}

export default Products