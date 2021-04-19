import React, { Component } from 'react'
import { showQuery, deleteQuery } from '../../api/queries'
import { withRouter, Link, Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import IndexComments from '../commentPath/indexComment'
import CreateComment from '../commentPath/createComment'

const showStyle = {
  textAlign: 'center',
  fontFamily: 'Cormorant Garamond'
}

const dateStyle = {
  display: 'flex',
  justifyContent: 'flex-end'
}

const borderControl = {
  padding: '10px'
}

const patchDelete = {
  display: 'flex',
  flexDirection: 'row'
}

class ShowQuery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: null,
      deleted: false
    }
  }
  componentDidMount () {
    const { msgAlert, match } = this.props
    showQuery(match.params.id)
      .then(res => this.setState({ query: res.data.query }))
      .then(() => msgAlert({
        heading: 'Loaded Successfully',
        message: 'Viewing',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load',
          message: 'Could not load with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  deleteQuery = () => {
    const { msgAlert, user, match } = this.props
    deleteQuery(match.params.id, user)
      .then(res => {
        this.setState({ deleted: true })
      })
      .then(() => msgAlert({
        heading: 'Deleted Successfully',
        message: 'Deleted',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to delete ',
          message: 'Could not delete with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { user } = this.props
    const { query, deleted } = this.state

    let queryJsx = ''
    if (deleted) {
      return <Redirect to='/'/>
    }
    if (!query) {
      return (
        <Spinner variant='primary' animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    if (!user) {
      queryJsx = (
        <div style={borderControl}><hr/>
          <h2>{query.title}</h2>
          <p style={dateStyle} className="card-text"><small className="text-muted">Written on: {query.date.substring(0, 10)}</small></p><hr/>
          <p>{query.body}</p>
        </div>
      )
    } else if (user && user._id !== query.keeper) {
      queryJsx = (
        <div style={borderControl}><hr/>
          <h2>{query.title}</h2>
          <p style={dateStyle} className="card-text"><small className="text-muted">Written on: {query.date.substring(0, 10)}</small></p><hr/>
          <p>{query.body}</p>
        </div>
      )
    } else if (user && user._id === query.keeper) {
      queryJsx = (
        <div style={borderControl}><hr/>
          <h2>{query.title}</h2>
          <div style={patchDelete}>
            <button onClick={this.deleteQuery} className="btn"><i className="fa fa-trash"></i><small className="text-muted"><Link to={'/'}>Delete</Link></small></button>
            <button className="btn"><i className="fa fa-trash"></i><small className="text-muted"><Link to={'/queries/' + this.props.match.params.id + '/edit/'}>Edit</Link></small></button>
          </div>
          <p style={dateStyle} className="card-text"><small className="text-muted">Written on: {query.date.substring(0, 10)}</small></p><hr/>
          <p>{query.body}</p>
          <CreateComment />
        </div>
      )
    }
    return (
      <div className="row" style={showStyle}>
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          {queryJsx}
          <IndexComments />
        </div>
      </div>
    )
  }
}
export default withRouter(ShowQuery)
