import axios from './axios'

const RESOURCE_NAME = 'teams'

export async function getTeams() {
  return (await axios.get(RESOURCE_NAME)).data
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
  const results = await axios.post(`${RESOURCE_NAME}/${teamId}/add_participant`, {
    participant: {
      name: participantName,
      score: participantScore || 5,
    },
  })
  return results.data
}
