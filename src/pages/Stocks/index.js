import * as React from 'react'
import StockLogs from '../Products/components/StockLogs/StockLogs'
import { useStockLogs } from '../../reactQuery/hooks/customQueryHook'
import useStockList from './useStockList'

const Stocks = () => {
	const {
		isLoading,
		refetch,
		stockLogsListing
	} = useStockList()
	// console.log(isLoading,stockLogsListing, "=============is loading")
	return (
		<>
		{
			!isLoading &&
			<StockLogs stockLogsList={stockLogsListing}/>
		}
		</>
	)
}

export default Stocks