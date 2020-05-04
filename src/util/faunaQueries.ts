import fauna from 'faunadb'
import dotenv from 'dotenv'
import { GuildMember } from 'discord.js'

import Account from '../class/Account'

dotenv.config()

const q = fauna.query
const client = new fauna.Client({
  secret: process.env.FAUNA_TOKEN
})

const openAccount = async (user: GuildMember): Promise<Account> => {
  const account: Account = await client.query(
    q.Create(
      q.Collection('balance'),
      {
        data: {
          user: user.id,
          balance: 0
        }
      }
    )
  )

  return account
}

const getBalance = async (user: GuildMember): Promise<Account> => {
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
    const account = await openAccount(user)
    return account
  }
}

const deductBalance = async (user: GuildMember, amount: number): Promise<void> => {
  const account = await getBalance(user)
  await client.query(
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

const sendMoney = async (user: GuildMember, receiver: GuildMember, amount: number): Promise<void> => {
  const sender: Account = await getBalance(user)
  const to: Account = await getBalance(receiver)
  if (sender.data.balance < amount) {
    throw new Error('Not enough balance')
  }

  await client.query(
    q.Update(
      q.Select('ref',
        q.Get(
          q.Match(
            q.Index('selectByUser'),
            to.data.user
          )
        )
      ),
      {
        data: {
          balance: to.data.balance + amount
        }
      }
    )
  )

  await deductBalance(user, amount)
}

export default client
export { openAccount, getBalance, deductBalance, sendMoney }
