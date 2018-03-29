import { success, notFound, authorOrAdmin, cryptowalletnotFound } from '../../services/response/'
import { Order } from '.'
import { Wallet } from '../wallet/'
import { Trade } from '../trade/'
import { CryptoWallet } from '../cryptoWallet/'

export const create = ({ user, bodymen: { body } }, res, next) =>{ 
  const userId = user._id
  if (body.order ==='buy') {
    Wallet.findOne({memberId:user._id})
  .then((wallet)=> {
    console.log(wallet)
    if (wallet.amount >= body.amount ) {
      wallet.amount = wallet.amount-body.amount
      Object.assign(wallet,wallet).save()
      Order.create({ ...body, memberId: user })
      .then((orders)=>{
        const buyerId = orders._id
        res.send(orders)
        orderMatching(orders,body,res,next)
        CryptoWallet.findOne({memberId:userId})
        .then(cryptowalletnotFound(res))
        .then((cryptoWallet)=>{
          cryptoWallet.amount = cryptoWallet.amount + body.amount
          Object.assign(cryptoWallet,cryptoWallet).save()
        })
        // const sellAmount = orders.amount
        // const buyMemberId = orders.memberId
      }) 
    } else {
      res.send ('insufficient balance')
    }
  })
  } else {
  CryptoWallet.findOne({memberId:user._id})
  .then((cryptoWallet)=> {
    if (cryptoWallet.amount >= body.amount ) {
      cryptoWallet.amount = cryptoWallet.amount-body.amount
      Object.assign(cryptoWallet,cryptoWallet).save()
      Order.create({ ...body, memberId: user })
      .then((orders)=>{
        // const buyerId = orders._id
        res.send(orders)
        // const sellAmount = orders.amount
        // const buyMemberId = orders.memberId
        orderMatching(orders,body,res,next)
        Wallet.findOne({memberId: userId})
        .then((wallet)=>{
          wallet.amount = wallet.amount+body.amount
          Object.assign(wallet,wallet).save()
        })
      })
    } else {
      res.send ('insufficient balance')
    }
  })
  }

      
  
}


 function orderMatching(orders,body,res,next) {
  var where = {}
  var preOrder = orders
  where.status = 1
  where.rate = body.rate
  if (body.order === 'buy') {
    where.order = 'sell'
  } else {
    where.order = 'buy'
  }
  console.log('where',where)
  Order.findOne(where)
  .then((orders)=>{
    console.log(orders)
    // const sellerId = orders._id
    // const lastAmount = orders.amount
    Trade.create({
      price : orders.amount,
      volume : orders.rate,
      askId : preOrder._id,
      bidId : orders._id,
      currency : 'USD',
      askMemberId : buyMemberId,
      bidMemberId : orders._id

    })
    .then((trade)=>{
      console.log(trade)
      orders.status = 0
      Object.assign(orders, orders).save()
      
      Order.findById(buyerId)
        .then((orders)=>{
          orders.status=0
          Object.assign(orders, orders).save()
            
          // Wallet.findOne({memberId:sellMemberId })
          //   .then((wallet)=>{
          //     console.log(wallet)
          //     wallet.amount = lastAmount+sellAmount
          //     Object.assign(wallet, wallet).save()
              
          //     Wallet.findOne({memberId : buyMemberId})
          //       .then((wallet)=>{
          //         console.log(wallet)
          //         wallet.amount = 0
          //         Object.assign(wallet,wallet).save()
          //       })
          //   })
        })


    })
        
})
 }
export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Order.find(query, select, cursor)
    .populate('memberId')
    .then((orders) => orders.map((order) => order.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Order.findById(params.id)
    .populate('memberId')
    .then(notFound(res))
    .then((order) => order ? order.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) => {
  
  Order.findById(params.id)
    .populate('memberId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'memberId'))
    .then((order) => order ? Object.assign(order, body).save() : null)
    .then((order) => order ? order.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const destroy = ({ user, params }, res, next) =>
  Order.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'memberId'))
    .then((order) => order ? order.remove() : null)
    .then(success(res, 204))
    .catch(next)
