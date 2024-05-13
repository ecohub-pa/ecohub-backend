import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { BadRequestError } from '../_errors/bad-request-error'

export async function createProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/projects',
    {
      schema: {
        body: z.object({
          title: z.string().min(3).max(255),
          description: z.string().min(3),
          category: z.string().min(3).max(50),
          location: z.string().min(3).max(30),
          financialGoal: z.number().positive(),
          deadline: z.string().date(),
          status: z.string().min(3).max(30),
          userId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { title, description, category, location, financialGoal, deadline, status, userId } = request.body

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
          category,
          location,
          financialGoal,
          deadline: new Date(deadline),
          status,
          userId,
        },
      })

      return reply.status(201).send()
    }
  )
}
