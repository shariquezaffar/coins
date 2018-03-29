import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Log } from '.'

const app = () => express(apiRoot, routes)

let log

beforeEach(async () => {
  log = await Log.create({})
})

test('POST /logs 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ userId: 'test', email: 'test', IPAddress: 'test', actionArea: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.userId).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.IPAddress).toEqual('test')
  expect(body.actionArea).toEqual('test')
})

test('GET /logs 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /logs 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /logs/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${log.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(log.id)
})

test('GET /logs/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${log.id}`)
  expect(status).toBe(401)
})

test('GET /logs/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('DELETE /logs/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${log.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /logs/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${log.id}`)
  expect(status).toBe(401)
})

test('DELETE /logs/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
