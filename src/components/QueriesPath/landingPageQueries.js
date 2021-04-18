import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexQueries } from '../../api/queries'
import Spinner from 'react-bootstrap/Spinner'

const h6BlogStyle = {
  display: 'flow-root',
  textAlign: 'center'
}

const buttonStyle = {
  borderRadius: '20px'
}

const linkStyle = {
  color: 'black'
}

const containerStyle = {
  display: 'grid'
}

class LandingPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      queries: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    indexQueries(user)
      .then(res => this.setState({ queries: res.data.queries }))
      .then(() => msgAlert({
        heading: 'Queries',
        message: 'Here\'s all the queries',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed',
          message: 'Something went wrong with the Queries ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { queries } = this.state
    if (!queries) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">loading</span>
        </Spinner>
      )
    }
    const queryJsx = queries.map(query => (
      <div className="card" key={query._id}>
        <Link to={`/queries/${query._id}`} key={query._id}>
          <div className="card-body">
            <h4 className="card-title">{query.title}</h4>
            <p className="card-text">{query.body.substring(0, 25) + '...'}</p>
            <p className="card-text"><small className="text-muted">Created: {query.date.substring(0, 10)}</small></p>
          </div>
        </Link>
      </div>

    ))
    return (
      <div style={containerStyle}>
        <div style={h6BlogStyle} className="container" id="indexPage">
          <button style={buttonStyle}><Link to={'/create'} style={linkStyle}>Create a Query</Link></button>
          <div className="col-7">
            <h6>{queryJsx}</h6>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(LandingPage)
