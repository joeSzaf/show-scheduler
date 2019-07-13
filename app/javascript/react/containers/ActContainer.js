import React, { Component } from 'react'
import { Link } from 'react-router'



class ActContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      acts: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/acts')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
        acts: body.acts
      })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }



  render() {

    let acts = this.state.acts.map(act => {
          return(
            <li key= { act.id }><a href={`/acts/${act.id}`}>{ act.name }</a></li>
          )
        })

    return(
      <div>
        <ul>
          { acts }
        </ul>
      </div>
    )
  }
}

export default ActContainer
