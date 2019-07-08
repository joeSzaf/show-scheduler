import React, { Component } from 'react'
import ShowShowTile from '../components/ShowShowTile'

class ShowShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: {
        id: '',
        name: '',
        start_time: '',
        duration: '',
        description: ''
      }
    }
  }

  componentDidMount() {
    let show_id = this.props.params.id
    fetch(`/api/v1/shows/${show_id}.json`)
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
      this.setState({ show: body })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div className="">
        <ShowShowTile
          key={this.state.show.id}
          name={this.state.show.name}
          startTime={this.state.show.start_time}
          duration = {this.state.show.duration}
          description = {this.state.show.description}
        />
      </div>
    )
  }
}

export default ShowShowContainer
