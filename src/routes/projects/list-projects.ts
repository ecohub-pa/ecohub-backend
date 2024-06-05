import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '../../lib/prisma'

export async function listProjects(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/projects', {}, async (request, reply) => {
    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            name: true,
            institution: true,
            state: true,
          },
        },
      },
    })

    return reply.status(200).send({ projects })
  })
}
