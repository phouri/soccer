import axios from './axios'

const RESOURCE_NAME = 'teams'

export async function getTeams() {
  return (await axios.get(RESOURCE_NAME)).data
}

export async function getTeam(id) {
  return (await axios.get(`${RESOURCE_NAME}/${id}`)).data
}

export async function createTeam(name) {
  const results = await axios.put(RESOURCE_NAME, {
    team: {
      name,
    },
  })
  return results.data
}

export async function addParticipant(teamId, participantName, participantScore) {
  const results = await axios.put(`${RESOURCE_NAME}/${teamId}/participants`, {
    participant: {
      name: participantName,
      score: participantScore || 5,
    },
  })
  return results.data
}

export async function removeParticipant(teamId, player) {
  console.log(player)
  const results = await axios.delete(`${RESOURCE_NAME}/${teamId}/participants`, {
    data: { name: player.name },
  })
  return results.data
}
