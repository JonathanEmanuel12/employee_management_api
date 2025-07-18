import { column } from '@adonisjs/lucid/orm'
import IntBase from './base/int_base.js'

export default class DocumentType extends IntBase {
    @column()
    declare name: string
}