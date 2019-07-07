import React, { Component } from 'react'
import { Link } from 'react-router'



class ShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shows: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/shows')
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
        shows: body.spaces
      })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }



  render() {

    let shows = this.state.shows.map(show => {
          return(
            <li key= { show.id }>{ show.name }</li>
          )
        })

    return(
      <div>
        <ul>
          { shows }
        </ul>
      </div>
    )
  }
}

export default ShowContainer
