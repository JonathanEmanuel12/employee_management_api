import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'auth_access_tokens'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('type').notNullable()
            table.string('name').nullable()
            table.string('hash').notNullable()
            table.text('abilities').notNullable()
            
            table.uuid('tokenable_id').notNullable().references('id').inTable('users').onDelete('CASCADE')

            table.timestamp('created_at')
            table.timestamp('updated_at')
            table.timestamp('last_used_at').nullable()
            table.timestamp('expires_at').nullable()
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}