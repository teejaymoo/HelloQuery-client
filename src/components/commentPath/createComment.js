import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { createComment } from '../../api/comment'
import CommentForm from '../commentForm/commentForm'

const boxStyle = {
  flexDirection: 'column',
  display: 'flex'
}

class CommentCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: {
        response: ''
      },
      createdCommentID: null
    }
  }
  handleChange = event => {
    event.persist()
    this.setState(state => {
      return {
        comment: { ...state.comment, [event.target.name]: event.target.value }
      }
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert, match } = this.props
    const { comment } = this.state
    console.log(`this is user ${user}, this is id ${match.params.id}, this is comment ${comment}`)
    createComment(comment, user, match.params.id)
      .then(res => this.setState({ created: true }))
      .then(() => msgAlert({
        heading: 'Created comment Successfully',
        message: 'Showing created comment',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to create comment',
          message: 'Could not create comment with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  onBtnClick () {
    this.setState({ value: this.state.value + 1 })
    this.props.rerenderParentCallback()
  }
  render () {
    const { comment, createdCommentID } = this.state
    const { match } = this.props

    if (createdCommentID) {
      return <Redirect to={'/queries/' + match.params.id } />
    }

    return (
      <div className="row">
        <div className="col-12 mx-auto mt-5" style={boxStyle}>
          <CommentForm
            comment={comment}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(CommentCreate)
