import { column, hasMany } from '@adonisjs/lucid/orm'
import IntBase from './base/int_base.js'
import Document from './document.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class DocumentType extends IntBase {
    @column()
    declare name: string

    @hasMany(() => Document)
    declare documents: HasMany<typeof Document>
    
}