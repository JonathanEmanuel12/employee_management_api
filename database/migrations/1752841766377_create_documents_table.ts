import { BaseSchema } from '@adonisjs/lucid/schema'
import { DocumentStatus } from '../../app/utils/enums.js'

export default class extends BaseSchema {
    protected tableName = 'documents'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('identifier').nullable()
            table.string('status', 20).notNullable().defaultTo(DocumentStatus.PENDING)

            table.uuid('employee_id').notNullable().references('id').inTable('employees').onDelete('CASCADE')
            table.integer('document_type_id').unsigned().notNullable().references('id').inTable('document_types').onDelete('CASCADE')

            table.unique(['employee_id', 'document_type_id'])

            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}