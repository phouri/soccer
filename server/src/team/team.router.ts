import { Router } from 'express'
import forceLogin from '@/middlewares/forceLogin';
import { createTeam, addParticipant, getUserTeams, getTeam, removeParticipant } from '@/team/team.controller'


export const teamRouter = Router()


teamRouter.use(forceLogin)

teamRouter.put('', createTeam)
teamRouter.put('/:teamId/participants', addParticipant)
teamRouter.delete('/:teamId/participants', removeParticipant)
teamRouter.get('', getUserTeams)
teamRouter.get('/:teamId', getTeam)
