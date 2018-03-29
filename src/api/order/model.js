import mongoose, { Schema } from 'mongoose'

const typ = ['limit', 'market']
const ord = ['buy', 'sell']
const stat = [0,1]

const orderSchema = new Schema({
  memberId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  fromCurrencyCode: {
    type: String,
    required: true,
    match: /^[A-Z]{3}$/ ,
    uppercase : true
  },
  amount: {
    type: Number,
    min: 1,
    required: true
  },
  toCurrencyCode: {
    type: String,
    required: true,
    match: /^[A-Z]{3}$/ ,
    uppercase : true
  },
  type: {
    type: String,
    enum : typ,
    required : true 
  },
  rate :{
    type: String,
    required : true
  },
  order: {
    type: String,
    enum : ord
  },
  doneAt: {
    type: String
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

orderSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      memberId: this.memberId.view(full),
      fromCurrencyCode: this.fromCurrencyCode,
      amount: this.amount,
      toCurrencyCode: this.toCurrencyCode,
      type: this.type,
      rate: this.rate,
      order: this.order,
      doneAt: this.doneAt,
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

const model = mongoose.model('Order', orderSchema)

export const schema = model.schema
export default model
