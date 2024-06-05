import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { hash } from 'bcrypt'
import { prisma } from '../../lib/prisma'
import { BadRequestError } from '../_errors/bad-request-error'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/auth/signup',
    {
      schema: {
        body: z.object({
          name: z.string().min(3).max(255),
          email: z.string().email(),
          password: z.string().min(6),
          document: z.string().min(11).max(14),
          institution: z.string().min(3).max(255),
          city: z.string().min(3).max(255),
          state: z.string().min(2).max(2),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password, document, city, state, institution } = request.body

      const passwordHash = await hash(password, 10)

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (userWithSameEmail) {
        throw new BadRequestError('This email is already registered')
      }

      await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
          document,
          city,
          state,
          institution,
        },
      })

      return reply.status(201).send()
    }
  )
}
