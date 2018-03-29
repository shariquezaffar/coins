import { Wallet } from '.'
import { User } from '../user'

let user, wallet

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  wallet = await Wallet.create({ memberId: user, currency: 'test', amount: 'test', type: 'test', status: 'test', processing: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = wallet.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(wallet.id)
    expect(typeof view.memberId).toBe('object')
    expect(view.memberId.id).toBe(user.id)
    expect(view.currency).toBe(wallet.currency)
    expect(view.amount).toBe(wallet.amount)
    expect(view.type).toBe(wallet.type)
    expect(view.status).toBe(wallet.status)
    expect(view.processing).toBe(wallet.processing)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = wallet.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(wallet.id)
    expect(typeof view.memberId).toBe('object')
    expect(view.memberId.id).toBe(user.id)
    expect(view.currency).toBe(wallet.currency)
    expect(view.amount).toBe(wallet.amount)
    expect(view.type).toBe(wallet.type)
    expect(view.status).toBe(wallet.status)
    expect(view.processing).toBe(wallet.processing)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
