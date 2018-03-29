import mongoose, { Schema } from 'mongoose'

const walletSchema = new Schema({
  memberId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  currency: {
    type: String
  },
  amount: {
    type: Number
  },
  type: {
    type: String
  },
  status: {
    type: Number
  },
  processing: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

walletSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      memberId: this.memberId.view(full),
      currency: this.currency,
      amount: this.amount,
      type: this.type,
      status: this.status,
      processing: this.processing,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Wallet', walletSchema)

export const schema = model.schema
export default model
