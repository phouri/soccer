import { Router } from 'express'
import forceLogin from '@/middlewares/forceLogin';
import { createTeam, addParticipant, getUserTeams } from './team.controller'


export const teamRouter = Router()


teamRouter.use(forceLogin)

teamRouter.put('', createTeam)
teamRouter.post('/:teamId/add_participant', addParticipant)
teamRouter.get('', getUserTeams)
