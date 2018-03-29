import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Payment, { schema } from './model'

const router = new Router()
const { currency, amount, fee, textId, paymentTransactionId, status } = schema.tree

/**
 * @api {post} /payments Create payment
 * @apiName CreatePayment
 * @apiGroup Payment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam currency Payment's currency.
 * @apiParam amount Payment's amount.
 * @apiParam fee Payment's fee.
 * @apiParam textId Payment's textId.
 * @apiParam paymentTransactionId Payment's paymentTransactionId.
 * @apiParam status Payment's status.
 * @apiSuccess {Object} payment Payment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payment not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ currency, amount, fee, textId, paymentTransactionId, status }),
  create)

/**
 * @api {get} /payments Retrieve payments
 * @apiName RetrievePayments
 * @apiGroup Payment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} payments List of payments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /payments/:id Retrieve payment
 * @apiName RetrievePayment
 * @apiGroup Payment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} payment Payment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payment not found.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  show)

/**
 * @api {put} /payments/:id Update payment
 * @apiName UpdatePayment
 * @apiGroup Payment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam currency Payment's currency.
 * @apiParam amount Payment's amount.
 * @apiParam fee Payment's fee.
 * @apiParam textId Payment's textId.
 * @apiParam paymentTransactionId Payment's paymentTransactionId.
 * @apiParam status Payment's status.
 * @apiSuccess {Object} payment Payment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payment not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ currency, amount, fee, textId, paymentTransactionId, status }),
  update)

/**
 * @api {delete} /payments/:id Delete payment
 * @apiName DeletePayment
 * @apiGroup Payment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Payment not found.
 * @apiError 401 user access only.
 */
router.put('/',
  token({ required: true }),
  body({}),
  destroy)

export default router
