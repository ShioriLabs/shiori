import fauna from 'faunadb'
import dotenv from 'dotenv'
import { User } from 'discord.js'

import Account from '../class/Account'

dotenv.config()

const q = fauna.query
const client = new fauna.Client({
  secret: process.env.FAUNA_TOKEN || ''
})

const createAccount = async (user: User): Promise<Account> => {
  const account: Account = await client.query(
    q.Create(
      q.Collection('balance'),
      {
        data: {
          user: user.id,
          balance: 100
        }
      }
    )
  )

  return account
}

const getAccountInfo = async (user: User): Promise<Account> => {
  try {
    const account: Account = await client.query(
      q.Get(
        q.Match(
          q.Index('selectByUser'),
          user.id
        )
      )
    )
    return account
  } catch {
    const account = await createAccount(user)
    return account
  }
}

const deductBalance = async (user: User, amount: number): Promise<Account> => {
  const account = await getAccountInfo(user)
  return await client.query(
    q.Update(
      q.Select('ref',
        q.Get(
          q.Match(
            q.Index('selectByUser'),
            account.data.user
          )
        )
      ),
      {
        data: {
          balance: account.data.balance - amount
        }
      }
    )
  )
}

const addBalance = async (user: User, amount: number): Promise<Account> => {
  const account = await getAccountInfo(user)
  return await client.query(
    q.Update(
      q.Select('ref',
        q.Get(
          q.Match(
            q.Index('selectByUser'),
            account.data.user
          )
        )
      ),
      {
        data: {
          balance: account.data.balance + amount
        }
      }
    )
  )
}

const sendMoney = async (user: User, receiver: User, amount: number): Promise<Account[]> => {
  const sender: Account = await getAccountInfo(user)
  if (sender.data.balance < amount) {
    throw new Error('Not enough balance')
  }

  const from = await addBalance(receiver, amount)
  const to = await deductBalance(user, amount)
  return [from, to]
}

export default client
export { createAccount, getAccountInfo, deductBalance, sendMoney }
