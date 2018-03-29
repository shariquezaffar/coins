import { success, notFound } from '../../services/response/'
import { User } from '.'
import { sign } from '../../services/jwt'
import { Wallet } from '../wallet/'
import { Log } from '../log/'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.find(query, select, cursor)
    .then((users) =>{
      Log.create({
        userId : user.id,
        email : user.email,
        IPAddress: res.req.connection.remoteAddress,
        actionArea : 'user search by query'

      })
      .then((log)=>users.map((user) => user.view()))
    })
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) =>{ 
      Log.create({
        userId : user.id,
        email : user.email,
        IPAddress: res.req.connection.remoteAddress,
        actionArea : 'user search data'

      })
      .then((log)=> user ? user.view() : null)
    })
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) =>
  res.json(user.view(true))

  export const create = ({ bodymen: { body } }, res, next) =>
  User.create(body)
    .then(user => {
      Log.create({
        userId : user.id,
        email : user.email,
        IPAddress: res.req.connection.remoteAddress,
        actionArea : 'user created'

      }).then((log)=>{
      sign(user.id)
        .then((token) => {
          Wallet.create({
            currency : 'USD',
            amount : 500,
            status : 1,
            type : 'emp',
            processing : 'processed',
            memberId : user.id
          })
          .then(notFound(res))
          .then((wallet)=>{
            return res.send({token:token, user : user})
            })
          })
          .catch(next)
        })
        .catch(next)
      })
        // .then(success(res, 201))
  
    .catch((err) => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      Log.create({
        userId : user.id,
        email : user.email,
        IPAddress: res.req.connection.remoteAddress,
        actionArea : 'user updated data'

      })
      .then((log)=>{
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      return result
    })
    })
    .then((user) => {
      console.log('BeforeData',body.address)
      body.address = {
        street: body.street,
        city: body.city,
        postalcode: body.postalcode,
        state: body.state,
        country: body.country
      }
      // user.bankDetails.push({
      //   accountNumber : body.accountNumber,
      //   IFSC : body.IFSC,
      //   accountType : body.accountType,
      //   bankName : body.bankName ,
      //   bankDocument : body.bankDocument 
      // })
      // console.log('AfterData',body.address)
      
     return user ? Object.assign(user, body).save() : null
     })
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      Log.create({
        userId : user.id,
        email : user.email,
        IPAddress: res.req.connection.remoteAddress,
        actionArea : 'user created'

      })
      .then((log)=>{
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      }
      return result
    })
    })
    .then((user) => user ? user.set({ password: body.password }).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) =>{ 
      Log.create({
        userId : user.id,
        email : user.email,
        IPAddress: res.req.connection.remoteAddress,
        actionArea : 'user remove data'

      })
      .then((log)=>user ? user.remove() : null)
    })
    .then(success(res, 204))
    .catch(next)



    export const secretKey = ({ bodymen: { body }, params, user }, res, next) =>
    User.findById(params.id === 'me' ? user.id : params.id)
      .then(notFound(res))
      .then((result) => {
        body




        if (!result) return null
        const isAdmin = user.role === 'admin'
        const isSelfUpdate = user.id === result.id
        if (!isSelfUpdate && !isAdmin) {
          res.status(401).json({
            valid: false,
            message: 'You can\'t change other user\'s data'
          })
          return null
        }
        return result
      })
      .then((user) => user ? Object.assign(user, body).save() : null)
      .then((user) => user ? user.view(true) : null)
      .then(success(res))
      .catch(next)
