import { Payment } from '.'
import { User } from '../user'

let user, payment

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  payment = await Payment.create({ memberId: user, currency: 'test', amount: 'test', fee: 'test', textId: 'test', paymentTransactionId: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = payment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(payment.id)
    expect(typeof view.memberId).toBe('object')
    expect(view.memberId.id).toBe(user.id)
    expect(view.currency).toBe(payment.currency)
    expect(view.amount).toBe(payment.amount)
    expect(view.fee).toBe(payment.fee)
    expect(view.textId).toBe(payment.textId)
    expect(view.paymentTransactionId).toBe(payment.paymentTransactionId)
    expect(view.status).toBe(payment.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = payment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(payment.id)
    expect(typeof view.memberId).toBe('object')
    expect(view.memberId.id).toBe(user.id)
    expect(view.currency).toBe(payment.currency)
    expect(view.amount).toBe(payment.amount)
    expect(view.fee).toBe(payment.fee)
    expect(view.textId).toBe(payment.textId)
    expect(view.paymentTransactionId).toBe(payment.paymentTransactionId)
    expect(view.status).toBe(payment.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
