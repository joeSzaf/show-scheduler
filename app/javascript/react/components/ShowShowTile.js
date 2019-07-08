import React from 'react'

const ShowShowTile = props => {

  return(
    <div>
      <h2>{ props.name }</h2>
      <p>{props.startTime}</p>
      <p>{props.duration}</p>
      <p>{props.description}</p>
    </div>
  )
}

export default ShowShowTile
