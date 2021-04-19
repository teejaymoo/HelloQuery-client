import axios from 'axios'
import apiUrl from '../apiConfig'

export const createQueries = (query, user) => {
  return axios({
    url: apiUrl + '/queries',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { query }
  })
}
export const indexQueries = (query, user) => {
  return axios({
    url: apiUrl + '/queries',
    method: 'GET',
    data: { query }
  })
}

export const showQuery = (id) => {
  return axios({
    url: apiUrl + '/queries/' + id,
    method: 'GET'
  })
}

export const editQuery = (id, query, user) => {
  return axios({
    url: apiUrl + '/queries/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { query }
  })
}

export const deleteQuery = (id, user) => {
  return axios({
    url: apiUrl + '/queries/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
