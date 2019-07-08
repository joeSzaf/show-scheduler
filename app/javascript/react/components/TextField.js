import React from 'react'

const TextField = props => {
  return(
    <label>{props.label}
      <input
      name={props.name}
      type={props.type}
      value={props.content}
      onChange={props.handleChangeMethod}
      />
    </label>
  )
}

export default TextField;
