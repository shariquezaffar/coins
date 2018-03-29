import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { CryptoWallet } from '.'

const app = () => express(apiRoot, routes)

let userSession, cryptoWallet

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  cryptoWallet = await CryptoWallet.create({ memberId: user })
})

test('POST /cryptoWallets 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, currency: 'test', amount: 'test', type: 'test', status: 'test', processing: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.currency).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.processing).toEqual('test')
  expect(typeof body.memberId).toEqual('object')
})

test('POST /cryptoWallets 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /cryptoWallets/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${cryptoWallet.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cryptoWallet.id)
  expect(typeof body.memberId).toEqual('object')
})

test('GET /cryptoWallets/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${cryptoWallet.id}`)
  expect(status).toBe(401)
})

test('GET /cryptoWallets/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
