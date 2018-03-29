import { Order } from '.'
import { User } from '../user'

let user, order

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  order = await Order.create({ memberId: user, fromCurrencyCode: 'test', amount: 'test', toCurrencyCode: 'test', type: 'test', order: 'test', doneAt: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = order.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(typeof view.memberId).toBe('object')
    expect(view.memberId.id).toBe(user.id)
    expect(view.fromCurrencyCode).toBe(order.fromCurrencyCode)
    expect(view.amount).toBe(order.amount)
    expect(view.toCurrencyCode).toBe(order.toCurrencyCode)
    expect(view.type).toBe(order.type)
    expect(view.order).toBe(order.order)
    expect(view.doneAt).toBe(order.doneAt)
    expect(view.status).toBe(order.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = order.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(typeof view.memberId).toBe('object')
    expect(view.memberId.id).toBe(user.id)
    expect(view.fromCurrencyCode).toBe(order.fromCurrencyCode)
    expect(view.amount).toBe(order.amount)
    expect(view.toCurrencyCode).toBe(order.toCurrencyCode)
    expect(view.type).toBe(order.type)
    expect(view.order).toBe(order.order)
    expect(view.doneAt).toBe(order.doneAt)
    expect(view.status).toBe(order.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
