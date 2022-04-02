import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'
import { User } from '@prisma/client'

export const validateRoute = (
  handler: (req: NextApiRequest, res: NextApiResponse, user: User) => any
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token: string = req.cookies.AUTH_ACCESS_TOKEN

    if (token) {
      let user: User | null

      try {
        const { id }: any = jwt.verify(token, `${process.env.JWT_SECRET}`)
        user = await prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'User Not Authorized' })
        return
      }

      return handler(req, res, user)
    }

    res.status(401)
    res.json({ error: 'User Not Authorized' })
  }
}
