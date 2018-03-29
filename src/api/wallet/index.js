import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, show } from './controller'
import { schema } from './model'
export Wallet, { schema } from './model'

const router = new Router()
const { currency, amount, type, status, processing } = schema.tree

/**
 * @api {post} /wallets Create wallet
 * @apiName CreateWallet
 * @apiGroup Wallet
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam currency Wallet's currency.
 * @apiParam amount Wallet's amount.
 * @apiParam type Wallet's type.
 * @apiParam status Wallet's status.
 * @apiParam processing Wallet's processing.
 * @apiSuccess {Object} wallet Wallet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Wallet not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ currency, amount, type, status, processing }),
  create)

/**
 * @api {get} /wallets/:id Retrieve wallet
 * @apiName RetrieveWallet
 * @apiGroup Wallet
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} wallet Wallet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Wallet not found.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  show)

export default router
