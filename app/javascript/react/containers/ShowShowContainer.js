import React, { Component } from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'

import ShowShowTile from '../components/ShowShowTile'
import TextField from '../components/TextField'

class ShowShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      name: "",
      start_time: "",
      duration: "",
      description: "",
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.updateShow = this.updateShow.bind(this)
    this.fetchAndUpdate = this.fetchAndUpdate.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  updateShow(formPayload){
    let show_id = this.props.params.id
    fetch(`/api/v1/shows/${show_id}`,{
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(formPayload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
        })
        .then(response => {
          this.fetchAndUpdate()
          let successMessage = { updateSuccess: "Show sucessfully updated" }
          this.setState({ errors: Object.assign({}, this.state.errors, successMessage) })
        })
        .catch(error => {
          let formError = { formError: error.message }
          this.setState({ errors: Object.assign({}, this.state.errors, formError) })
          console.error(`Error in fetch: ${error.message}`)
        });
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload = {
      name: this.state.name,
      duration: this.state.duration,
      start_time: this.state.start_time,
      description: this.state.description,
    }
    this.updateShow(formPayload);
  }

  handleClearForm(event) {
    event.preventDefault()
    this.setState({
      name: '',
      start_time: '',
      description: '',
      duration: '',
      errors: {}
    })
  }

  fetchAndUpdate() {
    let show_id = this.props.params.id
    fetch(`/api/v1/shows/${show_id}.json`)
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        id: body.id,
        name: body.name,
        start_time: body.start_time,
        description: body.description,
        duration: body.duration
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  componentDidMount() {
    this.fetchAndUpdate()
  }

  render() {
    let errorDiv
    let errorItems

    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return(
      <div className="">
        <form className="callout" onSubmit={this.handleSubmit}>
        {errorDiv}
          <TextField
            name="name"
            content={this.state.name}
            label="Name:"
            handleChangeMethod={this.handleChange}
          />
          <TextField
            name="start_time"
            content={this.state.start_time}
            label="Start time and date:"
            handleChangeMethod={this.handleChange}
          />
          <TextField
            name="duration"
            content={this.state.duration}
            label="Length of show (minutes):"
            handleChangeMethod={this.handleChange}
          />
          <TextField
            name="description"
            content={this.state.description}
            label="Description:"
            handleChangeMethod={this.handleChange}
          />

          <div className="button-group">
            <a className="button" href="/shows">Back</a>
            <input className="button secondary" type="submit" value="Update show" />
          </div>
        </form>
      </div>
    )
  }
}

export default ShowShowContainer
