import { success, notFound } from '../../services/response/'
import { Wallet } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Wallet.create({ ...body, memberId: user })
    .then((wallet) => {
      wallet.memberId = wallet.memberId.id
      return wallet.view(true)
    }) 
    .then(success(res, 201))
    .catch(next)

export const show = ({ user }, res, next) =>{
  Wallet.findOne({memberId : user.id})
    .populate('memberId')
    .then(notFound(res))
    .then((wallet) => res.send(wallet))
    .then(success(res))
    .catch(next)
}
