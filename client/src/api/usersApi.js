import axios from './axios'

const RESOURCE_NAME = 'users'

export async function getSelfUser() {
  return (await axios.get(`${RESOURCE_NAME}/me`)).data
}
