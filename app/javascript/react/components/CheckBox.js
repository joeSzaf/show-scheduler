import React from 'react'

const CheckBox = props => {
  return(
    <label>{props.label}
      <input
        name={props.name}
        type="checkbox"
        checked={props.checked}
        onChange={props.handleChangeMethod}
      />
    </label>
  )
}

export default CheckBox
