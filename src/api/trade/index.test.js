import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Trade } from '.'

const app = () => express(apiRoot, routes)

let trade

beforeEach(async () => {
  trade = await Trade.create({})
})

test('POST /trades 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ price: 'test', volume: 'test', askId: 'test', bidId: 'test', currency: 'test', askMemberId: 'test', bidMemberId: 'test', funds: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.price).toEqual('test')
  expect(body.volume).toEqual('test')
  expect(body.askId).toEqual('test')
  expect(body.bidId).toEqual('test')
  expect(body.currency).toEqual('test')
  expect(body.askMemberId).toEqual('test')
  expect(body.bidMemberId).toEqual('test')
  expect(body.funds).toEqual('test')
})

test('GET /trades 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /trades 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})
