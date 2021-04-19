import React, { Component } from 'react'
import { indexComments } from '../../api/comment'
import { withRouter } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const container = {
  display: 'flex'
}
const box = {
  height: '50%',
  padding: '5%'
}

const dateStyle = {
  display: 'flex',
  justifyContent: 'flex-end'
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
      <div className="card" style={box} key={uuidv4()}>
        <div className="card-body" style={container}>
          <h4 className="card-title">{comment}</h4>
          <p style={dateStyle} className="card-text"><small className="text-muted">{comment.timestamps}</small></p>
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
