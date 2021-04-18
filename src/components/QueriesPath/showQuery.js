import React, { Component } from 'react'
import { showQuery, deleteQuery } from '../../api/queries'
import { withRouter, Link, Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
// import CommentsView from '../CommentRoutes/ViewComments'

const showStyle = {
  textAlign: 'center',
  fontFamily: 'Cormorant Garamond',
  fontSize: '20px'
}

const borderParagraph = {
  fontSize: 'large',
  display: 'flex',
  position: 'absolute'
}
const dateStyle = {
  display: 'flex',
  justifyContent: 'flex-end'
}

const borderControl = {
  border: '1px solid',
  padding: '10px'
}

class ShowQuery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: null,
      deleted: false,
      commentClicked: false
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

  // toggleComments = (event) => {
  //   // this.setState is only possible because of extends Component
  //   // never override the value of state by hard coding it
  //   // always use setState()
  //   this.setState({ commentClicked: !this.state.commentClicked })
  // }
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
        <div style={borderControl}>
          <h2>{query.title}</h2>
          <p style={borderParagraph}>Written by: {query.keeper}</p>
          <p style={dateStyle} className="card-text"><small className="text-muted">Written on: {query.date.substring(0, 10)}</small></p><hr/>
          <p>{query.body}</p>
        </div>
      )
    } else if (user && user._id !== query.keeper) {
      queryJsx = (
        <div style={borderControl}>
          <h2>{query.title}</h2>
          <p style={borderParagraph}>Written by: {query.keeper}</p>
          <p style={dateStyle} className="card-text"><small className="text-muted">Written on: {query.date.substring(0, 10)}</small></p><hr/>
          <p>{query.body}</p>
          {/* <button><Link to={'/querys/' + this.props.match.params.id + '/comments/'}>Create Comment</Link></button> */}
        </div>
      )
    } else if (user && user._id === query.keeper) {
      queryJsx = (
        <div style={borderControl}>
          <h2>{query.title}</h2>
          <p style={borderParagraph}>Written by: {query.keeper}</p>
          <p style={dateStyle} className="card-text"><small className="text-muted">Written on: {query.date.substring(0, 10)}</small></p><hr/>
          <p>{query.body}</p>
          <button onClick={this.deleteQuery}><Link to={'/'}>Delete</Link></button>
          <button><a className="btn" href={'/queries/' + this.props.match.params.id + '/edit/'}><i className="icon-edit"></i> Edit</a></button>
          {/* <button><Link to={'/querys/' + this.props.match.params.id + '/comments'}>Create Comment</Link></button> */}
        </div>
      )
    }
    return (
      <div className="row" style={showStyle}>
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          {queryJsx}
          {/* <button onClick={this.toggleComments}>{this.state.commentClicked ? 'Close' : 'View Comments'}</button> */}
          {/* {this.state.commentClicked ? <CommentsView /> : ''} */}
        </div>
      </div>
    )
  }
}
export default withRouter(ShowQuery)
