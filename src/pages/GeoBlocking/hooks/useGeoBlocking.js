import * as React from 'react'
import { getAllowedStateListQuery } from '../../../reactQuery/hooks/customQueryHook'
import { useTranslation } from 'react-i18next'
import { useUpdateAllowedStates } from '../../../reactQuery/hooks/customMutationHook'
import { toast } from '../../../components/Toast'

const reducer = (state, action) => {
    switch(action.type){
        case 'add':
            console.log(action.value, state[0].state_id)
            return state.map(x=>x.state_id===action.value ? {...x, isAllowed: true} : x)
        
        case 'initiate': 
            return action.value

        case 'remove': 
            return state.map(x=>x.state_id === action.value ? { ...x, isAllowed: false}: x)
        
        case 'reset':
            return action.initialState;
        
        default:
            return state
    }
}

const useGeoBlocking = () => {
    const [state, dispatch] = React.useReducer(reducer, []);
    const { t } = useTranslation(['geoblocking']);
    
    const {
        data: stateData,
        isLoading: isGetStateLoading,
        isSuccess: isGetStateSuccess,
        refetch: fetchStateData  // Now accessible
    } = getAllowedStateListQuery({ params: {} });

    const {
        mutate: updateAllowedStatesFn
    } = useUpdateAllowedStates({
        onSuccess: () => {
            toast(t('success'), "success");
        },
        onError: () => {}
    });

    const tableHeaders = [
        { labelKey: 'tableHeaders.id', value: 'userId' },
        { labelKey: 'tableHeaders.stateName', value: 'email' },
        { labelKey: 'tableHeaders.stateCode', value: 'created_at' },
        { labelKey: 'tableHeaders.stateStatus', value: 'username' },
        { labelKey: 'tableHeaders.action', value: '' }
    ];

    React.useEffect(() => {
        if (isGetStateSuccess) {
            dispatch({
                type: "initiate",
                value: stateData
            });
        }
    }, [isGetStateSuccess, stateData]);

    // Function to handle reset by re-fetching data
    const resetToggler = () => {
        fetchStateData();  // Trigger a fresh API call
        toast("Reset Data Successfully Done!", 'success');
    };

    return {
        state,
        initialState: stateData,
        isLoading: isGetStateLoading,
        tableHeaders,
        t,
        updateAllowedStatesFn,
        dispatch,
        resetToggler  // Expose resetToggler for use in the component
    };
};

export default useGeoBlocking;