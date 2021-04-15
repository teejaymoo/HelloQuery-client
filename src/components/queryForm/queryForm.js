import React from 'react'

const QueryForm = ({ query, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label></label>
      <textarea className="form-control" rows="3"
        placeholder='Enter query Title'
        name='title'
        value={query.title}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label></label>
      <textarea className="form-control" id="query-body-form" rows="5"
        placeholder='Enter query Body'
        name='body'
        value={query.body}
        onChange={handleChange}></textarea>
    </div>
    <button>Submit</button>
  </form>
)
export default QueryForm
