import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import QueryForm from '../queryForm/queryForm'
import { createQueries } from '../../api/queries'

const containerStyle = {
  border: '1px solid',
  margin: '10%',
  paddingBottom: '10%'
}
const boxStyle = {
  border: '1px solid'
}

class CreatingQuery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        title: '',
        body: ''
      },
      createdQueryId: null
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
  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { query } = this.state
    console.log(`this is user ${user}`)

    createQueries(query, user)
      .then(res => this.setState({ createdQueryId: res.data.query._id }))
      .then(() => msgAlert({
        heading: 'Created query Successfully',
        message: 'Showing query post',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to create query',
          message: 'Could not create query with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { user } = this.props
    const { query, createdQueryId } = this.state
    if (createdQueryId) {
      return <Redirect to={`/queries/${createdQueryId}`} />
    }

    if (!user) {
      return (
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h3>Need to be <Link to='/sign-in'>signed in</Link>, or create an <Link to='/sign-up'>account</Link> to create a Query</h3>
          </div>
        </div>
      )
    }
    return (
      <div className='row' style={containerStyle}>
        <div className='col-sm-10 col-md-8 mx-auto mt-5' style={boxStyle}>
          <h3>Create Query</h3>
          <QueryForm
            query={query}
            user={user}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}
export default CreatingQuery
