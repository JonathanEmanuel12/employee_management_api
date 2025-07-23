import { inject } from "@adonisjs/core";
import { CreateUserDto } from "../../dto/user_dto.js";
import AuthRepository from "../../repositories/auth_repository.js";
import UserRepository from "../../repositories/user_repository.js";
import { AccessDto } from "../../dto/auth_dto.js";
import ApplicationException from "#exceptions/application_exception";

@inject()
export default class SignUpUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly userRepository: UserRepository
    ) {}

    public async run(userDto: CreateUserDto): Promise<AccessDto> {
        await this.checkEmail(userDto.email)
        const user = await this.userRepository.create(userDto)
        const fullToken = await this.authRepository.createToken(user)
        const { token, type } = fullToken.toJSON()
        return { token, type, id: user.id }
    }

    private async checkEmail(email: string): Promise<void> {
        const user = await this.userRepository.getByEmail(email)
        if(user !== null) {
            throw new ApplicationException('Email inválido', { status: 400 })
        }
    }
}