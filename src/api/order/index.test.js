import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Order } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, order

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  order = await Order.create({ memberId: user })
})

test('POST /orders 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, fromCurrencyCode: 'test', amount: 'test', toCurrencyCode: 'test', type: 'test', order: 'test', doneAt: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.fromCurrencyCode).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.toCurrencyCode).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.order).toEqual('test')
  expect(body.doneAt).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.memberId).toEqual('object')
})

test('POST /orders 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /orders 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].memberId).toEqual('object')
})

test('GET /orders 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /orders/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${order.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
  expect(typeof body.memberId).toEqual('object')
})

test('GET /orders/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${order.id}`)
  expect(status).toBe(401)
})

test('GET /orders/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /orders/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${order.id}`)
    .send({ access_token: userSession, fromCurrencyCode: 'test', amount: 'test', toCurrencyCode: 'test', type: 'test', order: 'test', doneAt: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
  expect(body.fromCurrencyCode).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.toCurrencyCode).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.order).toEqual('test')
  expect(body.doneAt).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.memberId).toEqual('object')
})

test('PUT /orders/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${order.id}`)
    .send({ access_token: anotherSession, fromCurrencyCode: 'test', amount: 'test', toCurrencyCode: 'test', type: 'test', order: 'test', doneAt: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /orders/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${order.id}`)
  expect(status).toBe(401)
})

test('PUT /orders/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, fromCurrencyCode: 'test', amount: 'test', toCurrencyCode: 'test', type: 'test', order: 'test', doneAt: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /orders/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${order.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /orders/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${order.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /orders/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${order.id}`)
  expect(status).toBe(401)
})

test('DELETE /orders/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
