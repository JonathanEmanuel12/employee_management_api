import { signUpValidator } from "#validators/auth_validator";
import type { HttpContext } from "@adonisjs/core/http";
import SignUpUseCase from "../use_cases/auth/sign_up_use_case.js";
import { inject } from "@adonisjs/core";

@inject()
export default class AuthController {
    constructor(
        private readonly signUpUseCase: SignUpUseCase
    ) {}

    public async signUp({ request, response }: HttpContext) {
        const userDto = await request.validateUsing(signUpValidator)
        const accessData = await this.signUpUseCase.run(userDto)
        return response.created(accessData)
    }
}