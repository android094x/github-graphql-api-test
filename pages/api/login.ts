import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import prisma from '../../lib/prisma'

import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (user && bcrypt.compareSync(password, user.hashedPassword)) {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        time: Date.now(),
      },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: '24h',
      }
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

    return res.json({ ...user, hashedPassword: '', status: 'succeeded' })
  } else {
    return res
      .status(401)
      .json({ error: 'Email or Password is wrong', status: 'failed' })
  }
}
