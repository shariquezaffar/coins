import { success, notFound } from '../../services/response/'
import { Trade } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Trade.create(body)
    .then((trade) => trade.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Trade.find(query, select, cursor)
    .then((trades) => trades.map((trade) => trade.view()))
    .then(success(res))
    .catch(next)
