import { container } from 'tsyringe'

import '@modules/users/providers'
import './providers'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsReposytory'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
)

container.registerSingleton<IUsersRepository>('UserRepository', UsersRepository)
// import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider'
// import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

// import IMailProvider from './MailProvider/models/IMailProvider'
// import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'

// import IMailTemplateProvider from './MailTempateProvider/models/IMailTemplateProvider'
// import HandlebarsMailTemplateProvider from './MailTempateProvider/implamentations/HandlebarsMailTemplateProvider'

// container.registerSingleton<IStorageProvider>(
//   'StorageProvider',
//   DiskStorageProvider,
// )

// container.registerSingleton<IMailTemplateProvider>(
//   'MailTemplateProvider',
//   HandlebarsMailTemplateProvider,
//   )

//   container.registerInstance<IMailProvider>(
//     'MailProvider',
//     container.resolve(EtherealMailProvider),
//   )
