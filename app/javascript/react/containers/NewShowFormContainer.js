import React from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'
import TextField from '../components/TextField'

class NewShowFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showName: '',
      showStartTime: '',
      showDescription: '',
      showDuration: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.addNewShow = this.addNewShow.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  addNewShow(formPayload){
    debugger
    fetch("/api/v1/shows",{
      credentials: 'same-origin',
      method: 'POST',
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
          browserHistory.push('/shows')
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
      name: this.state.showName,
      duration: this.state.showDuration,
      start_time: this.state.showStartTime,
      description: this.state.showDescription,
    }
    this.addNewShow(formPayload);
    this.handleClearForm(event)
  }

  handleClearForm(event) {
    event.preventDefault()
    this.setState({
      showName: '',
      showStartTime: '',
      showDescription: '',
      showDuration: '',
      errors: {}
    })
  }

  render(){
    let errorDiv
    let errorItems

    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return(
      <form className="callout" onSubmit={this.handleSubmit}>
      {errorDiv}
        <TextField
          name="showName"
          content={this.state.showName}
          label="Name:"
          handleChangeMethod={this.handleChange}
        />
        <TextField
          name="showStartTime"
          content={this.state.showStartTime}
          label="Start time and date:"
          handleChangeMethod={this.handleChange}
        />
        <TextField
          name="showDuration"
          content={this.state.showDuration}
          label="Length of show (minutes):"
          handleChangeMethod={this.handleChange}
        />
        <TextField
          name="showDescription"
          content={this.state.showDescription}
          label="Description:"
          handleChangeMethod={this.handleChange}
        />

        />
        <div className="button-group">
          <button className="button" onClick={this.handleClearForm}>Clear</button>
          <input className="button" type="submit" value="Submit Form" />
        </div>
      </form>
    )
  }
}

export default NewShowFormContainer
