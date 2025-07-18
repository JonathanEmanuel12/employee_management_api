import { inject } from "@adonisjs/core";
import AuthRepository from "../../repositories/auth_repository.js";
import { AccessDto } from "../../dto/auth_dto.js";

@inject()
export default class SignInUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    public async run(email: string, password: string): Promise<AccessDto> {
        const user = await this.authRepository.verifyCredentials(email, password)
        const fullToken = await this.authRepository.createToken(user)
        const { token, type } = fullToken.toJSON()
        return { token, type, id: user.id }
    }
}