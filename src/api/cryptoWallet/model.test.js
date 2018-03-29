import { CryptoWallet } from '.'
import { User } from '../user'

let user, cryptoWallet

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  cryptoWallet = await CryptoWallet.create({ memberId: user, currency: 'test', amount: 'test', type: 'test', status: 'test', processing: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = cryptoWallet.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cryptoWallet.id)
    expect(typeof view.memberId).toBe('object')
    expect(view.memberId.id).toBe(user.id)
    expect(view.currency).toBe(cryptoWallet.currency)
    expect(view.amount).toBe(cryptoWallet.amount)
    expect(view.type).toBe(cryptoWallet.type)
    expect(view.status).toBe(cryptoWallet.status)
    expect(view.processing).toBe(cryptoWallet.processing)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = cryptoWallet.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cryptoWallet.id)
    expect(typeof view.memberId).toBe('object')
    expect(view.memberId.id).toBe(user.id)
    expect(view.currency).toBe(cryptoWallet.currency)
    expect(view.amount).toBe(cryptoWallet.amount)
    expect(view.type).toBe(cryptoWallet.type)
    expect(view.status).toBe(cryptoWallet.status)
    expect(view.processing).toBe(cryptoWallet.processing)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
