import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account'
import { createProject } from './routes/projects/create-project'
import { errorHandler } from './error-handler'
import { listProjects } from './routes/projects/list-projects'
import { getProject } from './routes/projects/get-project'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { login } from './routes/auth/login'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors)
app.register(fastifyJwt, {
  secret: 'secret',
})

app.register(multipart)

app.setErrorHandler(errorHandler)

app.register(createAccount)
app.register(login)

app.register(createProject)
app.register(listProjects)
app.register(getProject)

app.listen({ port: 3000 }).then(() => {
  console.log('Server running...')
})
