import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { hash } from 'bcrypt'
import { prisma } from '../../lib/prisma'

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
          phone: z.string().length(13),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password, document, phone } = request.body

      const passwordHash = await hash(password, 10)

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (userWithSameEmail) {
        return reply.status(400).send({ message: 'This email is already registered' })
      }

      await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
          document,
          phone,
        },
      })

      return reply.status(201).send()
    }
  )
}
