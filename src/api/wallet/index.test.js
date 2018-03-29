import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Wallet } from '.'

const app = () => express(apiRoot, routes)

let userSession, wallet

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  wallet = await Wallet.create({ memberId: user })
})

test('POST /wallets 201 (user)', async () => {
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

test('POST /wallets 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /wallets/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${wallet.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(wallet.id)
  expect(typeof body.memberId).toEqual('object')
})

test('GET /wallets/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${wallet.id}`)
  expect(status).toBe(401)
})

test('GET /wallets/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
