import type { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import { createEmployeeValidator } from "#validators/employee_validator";
import CreateEmployeeUseCase from "../use_cases/employee/create_employee_use_case.js";

@inject()
export default class EmployeeController {
    constructor(
        private readonly createEmployeeUseCase: CreateEmployeeUseCase
    ) {}

    public async create({ request, response }: HttpContext) {
        const employeeDto = await request.validateUsing(createEmployeeValidator)
        const employee = await this.createEmployeeUseCase.run(employeeDto)
        return response.created(employee)
    }
}