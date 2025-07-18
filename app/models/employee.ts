import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import UuidBase from './base/uuid_base.js'

export default class Employee extends UuidBase {
    @column()
    declare name: string

    @column.dateTime()
    declare hiredAt: DateTime
}