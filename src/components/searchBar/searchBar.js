import React from 'react'

const buttonColor = {
  color: '#212529',
  backgroundColor: '#efefef',
  borderColor: '#767676',
  fontSize: 'initial'
}
const inputStyle = {
  fontSize: 'initial'
}
const SearchBar = props => {
  return (
    <div className="col-12 col-md-10 col-lg-8">
      <form className="card card-sm" id="search-bar-style">
        <div className="card-body row no-gutters align-items-center">
          <div className="col-auto">
            <i className="fas fa-search h4 text-body"></i>
          </div>
          <div className="col">
            <input
              style={inputStyle}
              className="form-control form-control-lg form-control-borderless"
              type="search"
              placeholder="Search topics or keywords"
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-lg" type="submit" style={buttonColor} >Search</button>
          </div>
        </div>
      </form>
    </div>

  )
}

export default SearchBar
