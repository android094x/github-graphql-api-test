import cookie from 'cookie'
import { validateRoute } from '../../lib/auth'

export default validateRoute(async (req, res, user) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('AUTH_ACCESS_TOKEN', '', {
      httpOnly: true,
      maxAge: 1,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  )

  res.end()
})
