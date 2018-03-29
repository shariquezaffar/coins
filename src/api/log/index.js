import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, destroy } from './controller'
import { schema } from './model'
export Log, { schema } from './model'

const router = new Router()
const { userId, email, IPAddress, actionArea } = schema.tree

/**
 * @api {post} /logs Create log
 * @apiName CreateLog
 * @apiGroup Log
 * @apiParam userId Log's userId.
 * @apiParam email Log's email.
 * @apiParam IPAddress Log's IPAddress.
 * @apiParam actionArea Log's actionArea.
 * @apiSuccess {Object} log Log's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Log not found.
 */
router.post('/',
  body({ userId, email, IPAddress, actionArea }),
  create)

/**
 * @api {get} /logs Retrieve logs
 * @apiName RetrieveLogs
 * @apiGroup Log
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} logs List of logs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /logs/:id Retrieve log
 * @apiName RetrieveLog
 * @apiGroup Log
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} log Log's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Log not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {delete} /logs/:id Delete log
 * @apiName DeleteLog
 * @apiGroup Log
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Log not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
