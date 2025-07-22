import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class TimestampBase extends BaseModel {
    @column.dateTime({ autoCreate: true, serializeAs: null })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
    declare updatedAt: DateTime | null
}