import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, show } from './controller'
import { schema } from './model'
export CryptoWallet, { schema } from './model'

const router = new Router()
const { currency, amount, type, status, processing } = schema.tree

/**
 * @api {post} /cryptoWallets Create crypto wallet
 * @apiName CreateCryptoWallet
 * @apiGroup CryptoWallet
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam currency Crypto wallet's currency.
 * @apiParam amount Crypto wallet's amount.
 * @apiParam type Crypto wallet's type.
 * @apiParam status Crypto wallet's status.
 * @apiParam processing Crypto wallet's processing.
 * @apiSuccess {Object} cryptoWallet Crypto wallet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Crypto wallet not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ currency, amount, type, status, processing }),
  create)

/**
 * @api {get} /cryptoWallets/:id Retrieve crypto wallet
 * @apiName RetrieveCryptoWallet
 * @apiGroup CryptoWallet
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} cryptoWallet Crypto wallet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Crypto wallet not found.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  show)

export default router
