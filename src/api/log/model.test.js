import { Log } from '.'

let log

beforeEach(async () => {
  log = await Log.create({ userId: 'test', email: 'test', IPAddress: 'test', actionArea: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = log.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(log.id)
    expect(view.userId).toBe(log.userId)
    expect(view.email).toBe(log.email)
    expect(view.IPAddress).toBe(log.IPAddress)
    expect(view.actionArea).toBe(log.actionArea)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = log.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(log.id)
    expect(view.userId).toBe(log.userId)
    expect(view.email).toBe(log.email)
    expect(view.IPAddress).toBe(log.IPAddress)
    expect(view.actionArea).toBe(log.actionArea)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
