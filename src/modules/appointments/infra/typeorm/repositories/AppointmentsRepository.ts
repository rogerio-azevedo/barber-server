import { getRepository, Repository } from 'typeorm'

import IAppointmentsReposytory from '@modules/appointments/repositories/IAppointmentsReposytory'
import Appointment from '../entities/Appointment'
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO'

class AppointmentsRepository implements IAppointmentsReposytory {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    })

    return findAppointment
  }

  public async create({
    provider_id,
    //user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      //user_id,
      date,
    })

    await this.ormRepository.save(appointment)

    return appointment
  }
}

export default AppointmentsRepository
