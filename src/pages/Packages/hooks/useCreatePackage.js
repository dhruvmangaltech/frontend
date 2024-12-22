import { useEffect, useState } from 'react'
import { useGetPackagesTypesQuery } from '../../../reactQuery/hooks/customQueryHook'
// import { AdminRoutes } from '../../../routes'
const createOption = (label) => ({
  label: label,
  // value: label.toLowerCase().replace(/\W/g, ''),
  value: label,
  newOptions: true
})
const usCreatePackage = (onSuccess) => {
  // const navigate = useNavigate()
  const [enabled, setEnabled] = useState(false)
  const [typeValue, setTypeValue] = useState(null)
  const [typeOptions, setTypesOptions] = useState([])
  const [isSelectLoading, setIsSetLoading] = useState(false)
  const successToggler = (data) => {
    if (data.length) {
      const tempData = []
      data?.map((item) => {
        tempData.push({
          label: item,
          value: item
        })
      })

      setTypesOptions(tempData)
    }
  }
  const handleCreateOption = (inputValue) => {
    setIsSetLoading(true)
    setTimeout(() => {
      const newOption = createOption(inputValue)
      setIsSetLoading(false)
      const newList = [...typeOptions, newOption]
      setTypesOptions(newList)
      setTypeValue(newOption)
    }, 1000)
  }
  const { refetch: fetchData, isLoading: isGetPackageTypeLoading } = useGetPackagesTypesQuery({params:{},
    enabled,
    successToggler
  })

  useEffect(() => {
    setEnabled(true)
    fetchData()
  }, [])

  return {
    isGetPackageTypeLoading,
    typeOptions,
    setTypesOptions,
    typeValue,
    setTypeValue,
    isSelectLoading,
    handleCreateOption
  }
}

export default usCreatePackage
