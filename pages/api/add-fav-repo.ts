import { validateRoute } from '../../lib/auth'
import prisma from '../../lib/prisma'

export default validateRoute(async (req, res, user) => {
  let addedRepo
  try {
    const body = JSON.parse(req.body)
    const languages = body.languages.map(
      (language: { id: string; color: string; name: string }) => ({
        where: {
          id: language.id,
        },
        create: {
          id: language.id,
          color: language.color,
          name: language.name,
        },
      })
    )

    addedRepo = await prisma.favoriteRepository.create({
      data: {
        id: body.id,
        name: body.name,
        url: body.url,
        description: body?.description || '',
        languages: {
          connectOrCreate: [...languages],
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })
  } catch (error) {
    return res.status(404).json({
      error:
        'There was an error while trying to add the repository to favorites',
    })
  }

  return res.status(200).json({ addedRepo })
})
