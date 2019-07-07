import React, { Component } from 'react'
import { Link } from 'react-router'

class ShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shows: []
    }
  }

  render() {
      return(
        <div>
          Hi, Masa!
        </div>
      )
  }
}

export default ShowContainer
