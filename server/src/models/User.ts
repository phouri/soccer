import { Document, Schema, Model, model } from 'mongoose'
import * as bcrypt from 'bcrypt'

interface User {
  email: string,
  firstName: string,
  lastName: string,
  fullName: string,
  birthDate: Date,
}
export interface UserModel extends User, Document {
  validatePassword(password: string): boolean
  setPassword(password: string): void
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  }
})

UserSchema.set('toJson', {getters: true, virtuals: true, transform: (doc: UserModel, ret: any) => {
  delete ret.password
  return ret
}})

UserSchema.method('validatePassword', async (password: string): Promise<boolean> => {
  return await bcrypt.compare(password, this.password)
})

UserSchema.method('setPassword', async (password: string): Promise<void> => {
  this.password = await bcrypt.hash(password, 5)
})

export const User: Model<UserModel> = model<UserModel>("User", UserSchema)
