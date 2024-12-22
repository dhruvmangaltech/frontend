// import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useUpdateMoneyMutation } from '../../../reactQuery/hooks/customMutationHook'
// import { addDepositToOtherStart } from '../../../store/redux-slices/players'

const useManageMoney = ({getUserDetails}) => {
  // const dispatch = useDispatch()
  const { userId } = useParams()
  const {mutateAsync: addDepositToOtherStart} = useUpdateMoneyMutation()

  const deposit = async (data) => {
    await addDepositToOtherStart({
      body: {
        addAmount: data?.transactionType === 'add-money' ? parseFloat(data?.addAmount.toFixed(2)) : (parseFloat(data?.addAmount?.toFixed(2)) * (-1)),
        walletType: data?.walletType === 'cash' ? 'CASH' : 'NONCASH',
        userId
      }
    })
    getUserDetails()
  }

  return {
    deposit
  }
}

export default useManageMoney
