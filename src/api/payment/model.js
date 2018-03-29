import mongoose, { Schema } from 'mongoose'
const stat = [0,1]

const paymentSchema = new Schema({
  memberId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  currency: {
    type: String,
    required : true
  },
  amount: {
    type: Number,
    min : 1,
    required : true
  },
  fee: {
    type: Number,
    required : true,
  },
  textId: {
    type: String,
    required : true,
    unique : true
  },
  paymentTransactionId: {
    type: String,
    required : true,
    unique : true
  },
  status: {
    type: Number,
    enum : stat,
    default : 1
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

paymentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      memberId: this.memberId.view(full),
      currency: this.currency,
      amount: this.amount,
      fee: this.fee,
      textId: this.textId,
      paymentTransactionId: this.paymentTransactionId,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Payment', paymentSchema)

export const schema = model.schema
export default model
