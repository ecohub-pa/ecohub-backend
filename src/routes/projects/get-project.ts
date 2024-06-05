import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { NotFoundError } from '../_errors/not-found-error'

export async function getProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/projects/:id',
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              name: true,
              city: true,
              institution: true,
              state: true,
            },
          },
        },
      })

      if (!project) {
        throw new NotFoundError('Project not found')
      }

      return reply.status(200).send({ project })
    }
  )
}
