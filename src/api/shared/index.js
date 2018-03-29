import { Router } from 'express'
import { master } from '../../services/passport'
import { create } from './controller'
import { upload } from '../../services/multer'

const router = new Router()

/**
 * @api {post} /shareds Create shared
 * @apiName CreateShared
 * @apiGroup Shared
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} shared Shared's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shared not found.
 * @apiError 401 master access only.
 */
router.post('/',
  // master(),
  upload.single('kyc'),
  create)

export default router
