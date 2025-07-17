import { inject } from "@adonisjs/core";
import { CreateUserDto } from "../../dto/user_dto.js";
import AuthRepository from "../../repositories/auth_repository.js";
import UserRepository from "../../repositories/user_repository.js";

@inject()
export default class SignUpUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly userRepository: UserRepository
    ) {}

    public async run(userDto: CreateUserDto): Promise<{ token?: string; type: string; id: string }> {
        const user = await this.userRepository.create(userDto)
        const fullToken = await this.authRepository.createToken(user)
        const { token, type } = fullToken.toJSON()
        return { token, type, id: user.id }
    }
}