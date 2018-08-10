import axios from './axios'

const RESOURCE_NAME = 'auth'

export async function registerUser(user) {
  return (await axios.put(`${RESOURCE_NAME}/register`, user)).data
}

export async function loginByEmailPassword(email, password) {
  try {
    return (await axios.post(`${RESOURCE_NAME}/login`, { email, password })).data.success
  } catch (e) {
    return false
  }
}
