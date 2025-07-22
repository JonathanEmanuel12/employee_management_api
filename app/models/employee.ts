import { DateTime } from 'luxon'
import { column, hasMany } from '@adonisjs/lucid/orm'
import UuidBase from './base/uuid_base.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Document from './document.js'

export default class Employee extends UuidBase {
    @column()
    declare name: string

    @column.dateTime()
    declare hiredAt: DateTime

    @hasMany(() => Document)
    declare documents: HasMany<typeof Document>
}