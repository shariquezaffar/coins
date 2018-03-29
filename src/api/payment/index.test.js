import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Payment } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, payment

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  payment = await Payment.create({ memberId: user })
})

test('POST /payments 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, currency: 'test', amount: 'test', fee: 'test', textId: 'test', paymentTransactionId: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.currency).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.fee).toEqual('test')
  expect(body.textId).toEqual('test')
  expect(body.paymentTransactionId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.memberId).toEqual('object')
})

test('POST /payments 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /payments 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].memberId).toEqual('object')
})

test('GET /payments 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /payments/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${payment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(payment.id)
  expect(typeof body.memberId).toEqual('object')
})

test('GET /payments/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${payment.id}`)
  expect(status).toBe(401)
})

test('GET /payments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /payments/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${payment.id}`)
    .send({ access_token: userSession, currency: 'test', amount: 'test', fee: 'test', textId: 'test', paymentTransactionId: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(payment.id)
  expect(body.currency).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.fee).toEqual('test')
  expect(body.textId).toEqual('test')
  expect(body.paymentTransactionId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.memberId).toEqual('object')
})

test('PUT /payments/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${payment.id}`)
    .send({ access_token: anotherSession, currency: 'test', amount: 'test', fee: 'test', textId: 'test', paymentTransactionId: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /payments/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${payment.id}`)
  expect(status).toBe(401)
})

test('PUT /payments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, currency: 'test', amount: 'test', fee: 'test', textId: 'test', paymentTransactionId: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /payments/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${payment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /payments/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${payment.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /payments/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${payment.id}`)
  expect(status).toBe(401)
})

test('DELETE /payments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
