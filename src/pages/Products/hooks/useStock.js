import * as React from 'react'
import { useGetProductDetails, useStockLogs } from '../../../reactQuery/hooks/customQueryHook'
import { useParams } from 'react-router-dom'
import { useUpdateStock } from '../../../reactQuery/hooks/customMutationHook';
import { toast } from '../../../components/Toast';

const useStock = () => {
	const { productId } = useParams();

	const {
		isLoading, data: res
	} = useGetProductDetails({ productId })

	const {
		isLoading: stockLogsLoading,
		refetch,
		data: stockLogsListing
	} = useStockLogs({productId})

	const onSuccess = () => {
		toast("Stock updated successfully")
	}

	const onError = () => {
		toast("Issue in updating stocks")
	}

	const {
		mutate: updateStock,
		isLoading: isUpdateStockLoading
	} = useUpdateStock({
		onSuccess,
		onError
	})

	console.log(stockLogsListing, "===============================")	

	return {
		isLoading: isLoading || isUpdateStockLoading || stockLogsLoading,
		res,
		updateStock,
		stockLogsListing,
		refetch
	}
}

export default useStock