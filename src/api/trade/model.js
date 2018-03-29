import mongoose, { Schema } from 'mongoose'

const tradeSchema = new Schema({
  price: {
    type: Number  //amount
  },
  volume: {
    type: String //
  },
  askId: {
    type: String
  },
  bidId: {
    type: String
  },
  currency: {
    type: String
  },
  askMemberId: {
    type: String
  },
  bidMemberId: {
    type: String
  },
  funds: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

tradeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      price: this.price,
      volume: this.volume,
      askId: this.askId,
      bidId: this.bidId,
      currency: this.currency,
      askMemberId: this.askMemberId,
      bidMemberId: this.bidMemberId,
      funds: this.funds,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Trade', tradeSchema)

export const schema = model.schema
export default model
