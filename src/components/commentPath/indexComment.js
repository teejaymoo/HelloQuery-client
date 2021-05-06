import React, { Component } from 'react'
import { indexComments } from '../../api/comment'
import { withRouter } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const commentBox = {
  color: '#4a4e69'
}
class IndexComments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: []
    }
  }
  componentDidMount () {
    const { match } = this.props
    indexComments(match.params.id)
      .then(res => this.setState({ comment: res.data.comments.map(comments => comments.response) }))
  }
  render () {
    const { comment } = this.state
    const commentJsx = comment.map(comment => (
      <div className="card" style={commentBox} key={uuidv4()}>
        <div className="card-body">
          <h4 className="card-title">{comment}</h4>
        </div>
      </div>
    ))
    return (
      <div>
        <div>
          {commentJsx}
        </div>
      </div>
    )
  }
}
export default withRouter(IndexComments)
