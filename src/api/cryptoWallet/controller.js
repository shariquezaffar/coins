import { success, notFound } from '../../services/response/'
import { CryptoWallet } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  CryptoWallet.create({ ...body, memberId: user })
    .then((cryptoWallet) =>{
      cryptoWallet.memberId = cryptoWallet.memberId.id
      return cryptoWallet.view(true)
    })
    .then(success(res, 201))
    .catch(next)

export const show = ({ user }, res, next) =>
  CryptoWallet.findOne({memberId : user.id})
    .populate('memberId')
    .then(notFound(res))
    .then((cryptoWallet) => cryptoWallet ? cryptoWallet.view() : null)
    .then(success(res))
    .catch(next)
