import { validateRoute } from '../../lib/auth'
import prisma from '../../lib/prisma'

export default validateRoute(async (req, res, user) => {
  let favRepos
  try {
    favRepos = await prisma.favoriteRepository.findMany({
      where: {
        userId: user.id,
      },
      include: {
        languages: true,
      },
    })
  } catch (error) {
    return res
      .status(404)
      .json({ error: 'No favorite repositories where found' })
  }

  return res.status(200).json({ favRepos })
})
