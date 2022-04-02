import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

import prisma from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { gql } from '@apollo/client'
import { client } from '../../lib/graphql/client'
import { User } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync()
  const { username, password } = req.body

  let user: User

  try {
    await client.query({
      query: gql`
        query ($username: String!) {
          user(login: $username) {
            login
          }
        }
      `,
      variables: {
        username,
      },
    })

    user = await prisma.user.create({
      data: {
        username,
        hashedPassword: bcrypt.hashSync(password, salt),
      },
    })
  } catch (err) {
    return res.status(404).json({
      error: `Username already exist or the provided github username isn't a valid one`,
      status: 'failed',
    })
  }

  const token = jwt.sign(
    {
      username: user.username,
      id: user.id,
      time: Date.now(),
    },
    `${process.env.JWT_SECRET}`,
    { expiresIn: '24h' }
  )

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('AUTH_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  )

  return res
    .status(201)
    .json({ ...user, hashedPassword: '', status: 'succeeded' })
}
