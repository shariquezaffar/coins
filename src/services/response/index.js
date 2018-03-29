import { CryptoWallet } from '../../api/cryptoWallet/'


export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }
  return null
}

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const cryptowalletnotFound = (res) => (entity) => {
  console.log(res.req.body)
  console.log(res.req.user)
  CryptoWallet.create({
    memberId : res.req.user.id,
    currency : res.req.body.toCurrencyCode,
    amount : res.req.body.amount,
    type : 'crypto',
    status : 1,
    processing : 'processed'
  })
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
