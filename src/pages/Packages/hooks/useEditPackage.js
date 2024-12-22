import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { toast } from '../../../components/Toast'
import { useUpdatePackageMutation } from '../../../reactQuery/hooks/customMutationHook'
import { useGetPackagesListingQuery, useGetPackagesTypesQuery } from '../../../reactQuery/hooks/customQueryHook'
// import { AdminRoutes } from '../../../routes'
const createOption = (label, isNew) => ({
    label: label,
    // value: label.toLowerCase().replace(/\W/g, ''),
    value: label,
    newOptions: isNew
});
const useEditPackage = (onSuccess) => {
  // const navigate = useNavigate()
  const [enabled, setEnabled] = useState(false);
  const [typeValue, setTypeValue] = useState(null);
  const [typeOptions, setTypesOptions] = useState(null);
  const [isSelectLoading, setIsSetLoading] = useState(false);

  const { packageId } = useParams();
  const getSinglePackageSuccessToggler = (data) => {
    const newOption = createOption(data.packageType, true);
    setTypeValue(newOption);
  }
  const {data, refetch: fetchData} = useGetPackagesListingQuery({params: {
    packageId,
    limit:1,
    pageNo: 1,
    orderBy: 'packageId',
    sort: 'desc',
  },
  enabled,
  getSinglePackageSuccessToggler
});

  
    const successToggler = (data) => {
        if(data.length) {
            const tempData = [];
            data?.map((item) => {
                tempData.push({
                    'label': item,
                    'value': item
                })
            });

            setTypesOptions(tempData);
        }
    };
    const handleCreateOption = (inputValue) => {
        setIsSetLoading(true);
        setTimeout(() => {
            const newOption = createOption(inputValue, true);
            setIsSetLoading(false);
            setTypesOptions((prev) => [...prev, newOption]);
            setTypeValue(newOption);
        }, 1000);
    }

    const {data: packageType, refetch: fetchTypeData, isLoading: isGetPackageTypeLoading} = useGetPackagesTypesQuery({params:{},
            enabled,
            successToggler
    })

  const {mutate: updatePackage, isLoading: loading} = useUpdatePackageMutation({onSuccess})

  useEffect(()=> {
    if(packageId) {
      setEnabled(true)
      fetchData();
      fetchTypeData();
    }
  }, [])

  const editPackage = (body) => updatePackage(body)
  return {
    packageData: data?.rows[0],
    editPackage,
    loading,
    packageId,
    typeOptions,
    setTypesOptions,
    typeValue,
    setTypeValue,
    isSelectLoading,
    handleCreateOption,
    isGetPackageTypeLoading,
  }
}

export default useEditPackage
