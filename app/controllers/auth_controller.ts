import { signInValidator, signUpValidator } from "#validators/auth_validator";
import type { HttpContext } from "@adonisjs/core/http";
import SignUpUseCase from "../use_cases/auth/sign_up_use_case.js";
import { inject } from "@adonisjs/core";
import SignInUseCase from "../use_cases/auth/sign_in_use_case.js";

@inject()
export default class AuthController {
    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase
    ) {}

    public async signUp({ request, response }: HttpContext) {
        const userDto = await request.validateUsing(signUpValidator)
        const accessData = await this.signUpUseCase.run(userDto)
        return response.created(accessData)
    }

    public async signIn({ request, response }: HttpContext) {
        const { email, password } = await request.validateUsing(signInValidator)
        const accessData = await this.signInUseCase.run(email, password)
        return response.ok(accessData)
    }
}