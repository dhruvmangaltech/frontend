import moment from 'moment'
export const limitName = {
  take_break: 'Take A Break',
  session_limit: 'Session Limit',
  self_exclusion: 'Self Exclusion',
  self_exclusion_key: 'SELF_EXCLUSION',
  take_break_key: 'TAKE_A_BREAK',
  daily_purchase_limit: 'Daily Deposit Limit',
  weekly_purchase_limit: 'Weekly Deposit Limit',
  monthly_purchase_limit: 'Monthly Deposit Limit',
  daily_time_limit: 'Daily Bet Limit',
  weekly_time_limit: 'Weekly Bet Limit',
  monthly_time_limit: 'Monthly Bet Limit',
}

export const SESSION_OPTIONS = [
    { value: 1, label: '1Hour' },
    { value: 2, label: '2Hour' },
    { value: 3, label: '3Hour' },
    { value: 4, label: '4Hour' }
]

export const SWEEP_BREAK = [
  { value: '1', label: '1 Day' },
  { value: '3', label: '3 Days' },
  { value: '7', label: '7 Days' },
  { value: '30', label: '1 Months' },
  { value: '90', label: '3 Months' },
]
export const SHWEEP_RANGE = [
  { value: '1', label: '1 Day', currentValue: 'days' },
  { value: '3', label: '3 Days', currentValue: 'days' },
  { value: '7', label: '7 Days', currentValue: 'days' },
  { value: '30', label: '1 Months', currentValue: 'days' },
  { value: '90', label: '3 Months', currentValue: 'days' },
]
export const getDateAfterShweepDay = (selectValue) => {
  // const findValue = SHWEEP_RANGE.find(item => item.value === selectValue);
   const newDate = moment(new Date()).add(selectValue, 'days');
   const formattedDate = moment(newDate).format("YYYY-MM-DD");
   return {
       formattedDate: formattedDate,
       changedDate: newDate
   }
}

export const allowOnlyNumber=(value)=>{
  return value.toString().replace(/[^0-9]/g, '')
}