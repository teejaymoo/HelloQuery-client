
import axios from 'axios'
import apiUrl from '../apiConfig'

export const createComment = (comment, user, id) => {
  return axios({
    url: apiUrl + '/queries/' + id + '/comments',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { comment }
  })
}

export const indexComments = (id) => {
  return axios({
    url: apiUrl + '/queries/' + id + '/index-comments',
    method: 'GET'
  })
}
