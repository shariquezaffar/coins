import mongoose, { Schema } from 'mongoose'

const logSchema = new Schema({
  userId: {
    type: String
  },
  email: {
    type: String
  },
  IPAddress: {
    type: String
  },
  actionArea: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

logSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId,
      email: this.email,
      IPAddress: this.IPAddress,
      actionArea: this.actionArea,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Log', logSchema)

export const schema = model.schema
export default model
