import * as React from 'react'
import { useGetProductsListing, useStockLogs } from '../../reactQuery/hooks/customQueryHook'

const useStockList = () => {
    const [params, setParams] = React.useState({})

    const {
		isLoading,
		refetch,
		data: stockLogsListing
	} = useStockLogs({})

    console.log(stockLogsListing,"==================suigghjfknjk")

    const {
        isLoading: loading, data: stockList
      } = useGetProductsListing({params: {pageNo: 1, limit: 10}})

    return {
        isLoading,
        refetch,
        stockLogsListing
    }
}

export default useStockList