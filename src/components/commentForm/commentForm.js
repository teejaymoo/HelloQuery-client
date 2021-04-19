import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const leaveCommentstyle = {
  float: 'left',
  fontSize: '15px'
}

const CommentForm = ({ comment, handleSubmit, handleChange }) => (
  <div>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="response">
        <Form.Label></Form.Label>
        <p style={leaveCommentstyle}>Leave a comment</p>

        <div className="form-group">
          <label></label>
          <textarea
            className="form-control"
            rows="5"
            required
            placeholder="What are your thoughts?"
            name="response"
            value={comment.response}
            onChange={handleChange}
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
export default CommentForm
