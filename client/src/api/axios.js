import axios from 'axios'

export default new axios.create({
  baseURL: '/api/v1',
})
