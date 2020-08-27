import { Router } from 'express'
const { v4: uuid } = require('uuid')

const appointmentsRouter = Router()

const appointments = []

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  const appointment = {
    id: uuid(),
    provider,
    date,
  }

  appointments.push(appointment)

  return response.json(appointment)
})

export default appointmentsRouter
