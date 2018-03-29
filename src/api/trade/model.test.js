import { Trade } from '.'

let trade

beforeEach(async () => {
  trade = await Trade.create({ price: 'test', volume: 'test', askId: 'test', bidId: 'test', currency: 'test', askMemberId: 'test', bidMemberId: 'test', funds: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = trade.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(trade.id)
    expect(view.price).toBe(trade.price)
    expect(view.volume).toBe(trade.volume)
    expect(view.askId).toBe(trade.askId)
    expect(view.bidId).toBe(trade.bidId)
    expect(view.currency).toBe(trade.currency)
    expect(view.askMemberId).toBe(trade.askMemberId)
    expect(view.bidMemberId).toBe(trade.bidMemberId)
    expect(view.funds).toBe(trade.funds)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = trade.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(trade.id)
    expect(view.price).toBe(trade.price)
    expect(view.volume).toBe(trade.volume)
    expect(view.askId).toBe(trade.askId)
    expect(view.bidId).toBe(trade.bidId)
    expect(view.currency).toBe(trade.currency)
    expect(view.askMemberId).toBe(trade.askMemberId)
    expect(view.bidMemberId).toBe(trade.bidMemberId)
    expect(view.funds).toBe(trade.funds)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
