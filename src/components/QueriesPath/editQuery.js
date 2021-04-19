import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { editQuery } from '../../api/queries'

const leaveCommentstyle = {
  float: 'left',
  fontSize: '15px'
}

class EditQuery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        title: '',
        body: ''
      },
      updated: false
    }
  }

  handleChange = event => {
    event.persist()
    this.setState(state => {
      return {
        query: { ...state.query, [event.target.name]: event.target.value }
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, match, msgAlert } = this.props
    const { query } = this.state
    editQuery(match.params.id, query, user)
      .then(res => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Updated Successfully',
        message: 'Updated',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to update',
          message: 'Could not update with error:' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { query, updated } = this.state
    if (updated) {
      return <Redirect to={'/'} />
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="response">
            <Form.Label></Form.Label>
            <p style={leaveCommentstyle}>Edit Mode</p>

            <div className="form-group">
              <label></label>
              <textarea
                className="form-control"
                rows="2"
                required
                placeholder={query.title}
                name="title"
                value={query.title}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label></label>
              <textarea
                className="form-control"
                rows="5"
                required
                placeholder={query.body}
                name="body"
                value={query.body}
                onChange={this.handleChange}
              />
            </div>

          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(EditQuery)
