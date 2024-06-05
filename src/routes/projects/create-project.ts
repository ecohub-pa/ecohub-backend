import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { BadRequestError } from '../_errors/bad-request-error'
import { auth } from '../../middlewares/auth'

export async function createProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/projects',
      {
        schema: {
          body: z.object({
            title: z.string().min(3).max(255),
            description: z.string().min(3),
            ods: z.string().min(3).max(100),
            linkedin: z.string().url(),
            instagram: z.string().url(),
          }),
        },
      },
      async (request, reply) => {
        const { title, description, ods, linkedin, instagram } = request.body
        const userId = await request.getCurrentUserId()

        const userExists = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!userExists) {
          throw new BadRequestError('User not found')
        }

        await prisma.project.create({
          data: {
            title,
            description,
            ods,
            linkedin,
            instagram,
            userId,
          },
        })

        return reply.status(201).send()
      }
    )
}
