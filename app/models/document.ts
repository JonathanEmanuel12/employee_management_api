import { belongsTo, column } from '@adonisjs/lucid/orm'
import UuidBase from './base/uuid_base.js'
import Employee from './employee.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import DocumentType from './document_type.js'
import { DocumentStatus } from '../utils/enums.js'

export default class Document extends UuidBase {
    @column()
    declare identifier: string

    @column()
    declare status: DocumentStatus

    @column()
    declare employeeId: string

    @column()
    declare documentTypeId: number

    @belongsTo(() => Employee)
    declare employee: BelongsTo<typeof Employee>

    @belongsTo(() => DocumentType)
    declare documentType: BelongsTo<typeof DocumentType>
}
