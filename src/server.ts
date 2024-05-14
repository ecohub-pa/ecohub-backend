import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account'
import { createProject } from './routes/projects/create-project'
import { errorHandler } from './error-handler'
import { listProjects } from './routes/projects/list-projects'
import { getProject } from './routes/projects/get-project'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(createAccount)

app.register(createProject)
app.register(listProjects)
app.register(getProject)

app.listen({ port: 3000 }).then(() => {
  console.log('Server running...')
})
