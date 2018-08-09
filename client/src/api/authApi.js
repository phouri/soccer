import axios from './axios'

const RESOURCE_NAME = 'auth'

export async function registerUser(user) {
  return (await axios.put(`${RESOURCE_NAME}/register`, user)).data
}
