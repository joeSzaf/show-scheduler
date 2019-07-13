import React, { Component } from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'

import TextField from '../components/TextField'

class ActShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      name: "",
      contact_name: "",
      contact_email: "",
      description: "",
      archived: "",
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateAct = this.updateAct.bind(this)
    this.fetchAndUpdate = this.fetchAndUpdate.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  updateAct(formPayload){
    let act_id = this.props.params.id
    fetch(`/api/v1/acts/${act_id}`,{
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
          let successMessage = { updateSuccess: "Act sucessfully updated" }
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
      contact_name: this.state.contact_name,
      contact_email: this.state.contact_email,
      description: this.state.description,
      archived: this.state.archived
    }
    this.updateAct(formPayload);
  }

  fetchAndUpdate() {
    let act_id = this.props.params.id
    fetch(`/api/v1/acts/${act_id}.json`)
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
        contact_name: body.contact_name,
        contact_email: body.contact_email,
        description: body.description,
        archived: body.archived
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
            name="contact_name"
            content={this.state.contact_name}
            label="Contact name:"
            handleChangeMethod={this.handleChange}
          />
          <TextField
            name="contact_email"
            content={this.state.contact_email}
            label="Contact email:"
            handleChangeMethod={this.handleChange}
          />
          <TextField
            name="description"
            content={this.state.description}
            label="Description:"
            handleChangeMethod={this.handleChange}
          />

          <div className="button-group">
            <a className="button" href="/acts">Back</a>
            <input className="button secondary" type="submit" value="Update act" />
          </div>
        </form>
      </div>
    )
  }
}

export default ActShowContainer
