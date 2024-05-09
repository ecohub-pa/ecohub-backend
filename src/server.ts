import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createAccount)

app.listen({ port: 3000 }).then(() => {
  console.log('Server running...')
})
