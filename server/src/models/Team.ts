import { Document, Schema, Model, model } from 'mongoose'

interface Team {
  name: string,
  participants: [{
    score: number,
    user: Schema.Types.ObjectId
    name: string
  }]
  owner: Schema.Types.ObjectId
}
export interface TeamModel extends Team, Document {
  validatePassword(password: string): boolean
  setPassword(password: string): void
}

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  participants: [{
    score: {
      type: Number,
      default: 1,
      min: 1,
      max: 10
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      minlength: 3,
    },
  }]
})

class TeamClass {

}

TeamSchema.loadClass(TeamClass)


export const Team: Model<TeamModel> = model<TeamModel>("Team", TeamSchema)
