import * as React from 'react'
import { QrReader } from 'react-qr-reader';
import { toast } from '../../components/Toast';
import { useNavigate } from 'react-router-dom'
import { AdminRoutes } from '../../routes';

const Scanner = () => {
  const [data, setData] = React.useState('');
  const navigate = useNavigate()

  React.useEffect(() => {
    console.log(data)
    if (data.length) {
      try{
      const obj = JSON.parse(data)
      if (obj.type === 'Fraxus Stock Management') {
        navigate(`${AdminRoutes.ProductDeatil.split(':').shift()}${obj.productId}`)
      }else{
        setData('Please use the correct QR code')
      }
    }catch(e){
      setData('Please use the correct QR code')
    }
    }
  }, [data])

  return (
    <>
      <h5>Please Scan the QR code here</h5>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            toast(error)
          }
        }}
        scanDelay={500}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  )
}
export default Scanner