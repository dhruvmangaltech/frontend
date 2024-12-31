import * as React from 'react'
import { useGetProductDetails, useStockLogs } from '../../../reactQuery/hooks/customQueryHook'
import { useParams } from 'react-router-dom'
import { useUpdateStock } from '../../../reactQuery/hooks/customMutationHook';
import { toast } from '../../../components/Toast';
import { useUserStore } from '../../../store/store';

const useStock = () => {
	const { productId } = useParams();
	const { userDetails, permissions } = useUserStore((state) => state);
	const {
		isLoading, data: res, refetch: refetchProduct
	} = useGetProductDetails({ productId })

	const {
		isLoading: stockLogsLoading,
		refetch,
		data: stockLogsListing,
	} = useStockLogs({productId}, !!permissions['Stocks'])

	const onSuccess = () => {
		refetch()
		refetchProduct()
		toast("Stock updated successfully")
	}

	const onError = (err) => {
		// debugger
		console.log(err.response?.data?.errors[0]?.description, "error in updating stock")
		toast(err.response?.data?.errors[0]?.description, 'error')
	}

	const {
		mutate: updateStock,
		isLoading: isUpdateStockLoading
	} = useUpdateStock({
		onSuccess,
		onError
	})

	// console.log(stockLogsListing, "===============================")	

	return {
		isLoading: isLoading || isUpdateStockLoading  ,
		res,
		updateStock,
		stockLogsListing: stockLogsListing || []  ,
		refetch
	}
}

export default useStock