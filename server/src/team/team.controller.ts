import { ExpressRequest, ExpressResponse, ExpressNextFunction } from 'types/express'
import { Team } from '../models/Team'

export async function addParticipant(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
  const { participant } = req.body
  const { teamId } = req.params
  if (!teamId || !participant) {
    return res.status(400).send()
  }
  const team = await Team.findById(teamId)

  if (!team) {
    return res.status(404).send()
  }

  team.participants.push(participant)

  await Team.update({ _id: teamId }, { $push: { participants: participant } })

  res.send({ team })
}

export async function removeParticipant(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
  const {name } = req.body
  const { teamId } = req.params
  if (!teamId || !name) {
    return res.status(400).send()
  }
  const team = await Team.findById(teamId)

  if (!team) {
    return res.status(404).send()
  }

  team.participants.filter(p => p.name !== name)

  await Team.update({ _id: teamId }, { $pull: { participants: { name } } })

  res.send({ team })
}

export async function createTeam(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
  const { team } = req.body
  if (!team) {
    return res.status(400).send()
  }

  team.owner = req.user

  const teamModel = new Team(team)
  try {
    await teamModel.save()
  } catch (e) {
    return res.status(500).send()
  }
  return res.send(teamModel)
}

export async function getTeam(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
  const { teamId } = req.params
  const team = await Team.findOne({
    _id: teamId,
    owner: req.user,
  }).populate({
    path: 'participants',
    populate: 'user',
  })
  res.send({ team })
}

export async function getUserTeams(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
  const teams = await Team.find({
    owner: req.user,
  })
    .populate('owner')
    .populate({
      path: 'participants',
      populate: 'user',
    })
  res.send(teams)
}
