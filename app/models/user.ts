import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import UuidBase from './base/uuid_base.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
})

export default class User extends compose(UuidBase, AuthFinder) {
    @column()
    declare name: string

    @column()
    declare email: string

    @column({ serializeAs: null })
    declare password: string

    static accessTokens = DbAccessTokensProvider.forModel(User)
}