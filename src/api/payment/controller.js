import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Payment } from '.'
import { Wallet } from '../wallet/'
import { Log } from '../log/'

export const create = ({user, bodymen: { body } }, res, next) =>
  Payment.create({ ...body, memberId: user })
  .then(notFound(res))
    .then((payment) => {
      Log.create({
        userId : user.id,
        email : user.email,
        IPAddress: res.req.connection.remoteAddress,
        actionArea : 'user created our payment'

      })
      .then((log)=>{
      Wallet.findOne({memberId:user._id})
      .then((wallet) => {
        return wallet ? Object.assign(wallet, body).save() : null
      })
      return res.send(payment)
    })
    })
    // .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Payment.find(query, select, cursor)
    .populate('memberId')
    .then((payments) =>{
      Log.create({
        userId : user.id,
        email : user.email,
        IPAddress: res.req.connection.remoteAddress,
        actionArea : 'user search by query in payment'

      })
      .then((log)=>payments.map((payment) => payment.view()))
    })
    .then(success(res))
    .catch(next)

export const show = ({ user }, res, next) =>
  Payment.find({memberId: user._id,status: 0})
    // .populate('memberId')
    .then(notFound(res))
    .then((payment) =>{ 
      Log.create({
        userId : user.id,
        email : user.email,
        IPAddress: res.req.connection.remoteAddress,
        actionArea : 'user search our payment'

      })
      .then((log)=>payment ? payment.view() : null)
    })
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Payment.findById(params.id)
    .populate('memberId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'memberId'))
    .then((payment) => payment ? Object.assign(payment, body).save() : null)
    .then((payment) => payment ? payment.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, bodymen: { body } }, res, next) =>
  Payment.find({memberId: user._id,status: 1})
    .then(notFound(res))
    // .then(authorOrAdmin(res, user, 'memberId'))
    .then((payment)=> {
      // console.log(payment)
      // payment.status = 0
      body.status = 0
      return payment
      // status: 0
    })
    .then((payment) => payment ? Object.assign(payment, body).save() : null)
    .then((payment) =>{ 
      console.log(payment)
      Log.create({
        userId : user.id,
        email : user.email,
        IPAddress: res.req.connection.remoteAddress,
        actionArea : 'user deleted our payment'

      })
      .then((log))
    })
    .then(success(res, 204))
    .catch(next)
