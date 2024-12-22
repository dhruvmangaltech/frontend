import React from 'react'

import CreatableSelect from 'react-select/creatable'

const ReactCreatable = (props) => {
  const {
    options,
    value,
    setValue,
    isLoading,
    handleCreateOption
  } = props
  return (
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={setValue}
      onCreateOption={handleCreateOption}
      options={options || []}
      value={value}
    />
  )
}

export default ReactCreatable
