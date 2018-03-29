import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index } from './controller'
import { schema } from './model'
export Trade, { schema } from './model'

const router = new Router()
const { price, volume, askId, bidId, currency, askMemberId, bidMemberId, funds } = schema.tree

/**
 * @api {post} /trades Create trade
 * @apiName CreateTrade
 * @apiGroup Trade
 * @apiParam price Trade's price.
 * @apiParam volume Trade's volume.
 * @apiParam askId Trade's askId.
 * @apiParam bidId Trade's bidId.
 * @apiParam currency Trade's currency.
 * @apiParam askMemberId Trade's askMemberId.
 * @apiParam bidMemberId Trade's bidMemberId.
 * @apiParam funds Trade's funds.
 * @apiSuccess {Object} trade Trade's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trade not found.
 */
router.post('/',
  body({ price, volume, askId, bidId, currency, askMemberId, bidMemberId, funds }),
  create)

/**
 * @api {get} /trades Retrieve trades
 * @apiName RetrieveTrades
 * @apiGroup Trade
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} trades List of trades.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

export default router
