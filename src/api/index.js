import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import shared from './shared'
import wallet from './wallet'
import payment from './payment'
import order from './order'
import trade from './trade'
import cryptoWallet from './cryptoWallet'
import log from './log'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/shareds', shared)
router.use('/wallets', wallet)
router.use('/payments', payment)
router.use('/orders', order)
router.use('/trades', trade)
router.use('/cryptoWallets', cryptoWallet)
router.use('/logs', log)
export default router
