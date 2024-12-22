export const coinConst = [
  { value: 'gc', label: 'Gold Coins' },
  { value: 'sc', label: 'Coins' },
]
export const coinConstDeduction = [
  { value: 'gc', label: 'Gold Coins' },
  { value: 'wsc', label: 'SC-Wsc' },
  { value: 'psc', label: 'SC-Psc' },
  { value: 'bsc', label: 'SC-Bsc' }
]
export const deductConst = [
  { value: '1', label: 'Add' },
  { value: '2', label: 'Deduct' }
]
export const allowOnlyNumber = (value) => {
  return value.toString().replace(/[^0-9]/g, '')
}
