import type { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import { createEmployeeValidator, updateEmployeeValidator } from "#validators/employee_validator";
import CreateEmployeeUseCase from "../use_cases/employee/create_employee_use_case.js";
import { attachDocumentTypeValidator, detachDocumentTypeValidator } from "#validators/document_type_validator";
import UpdateEmployeeUseCase from "../use_cases/employee/update_employee_use_case.js";

@inject()
export default class EmployeeController {
    constructor(
        private readonly createEmployeeUseCase: CreateEmployeeUseCase,
        private readonly updateEmployeeUseCase: UpdateEmployeeUseCase
    ) {}

    public async create({ request, response }: HttpContext) {
        const employeeDto = await request.validateUsing(createEmployeeValidator)
        const { attachDocumentTypeIds } = await request.validateUsing(attachDocumentTypeValidator)

        const employee = await this.createEmployeeUseCase.run(employeeDto, attachDocumentTypeIds)
        return response.created(employee)
    }

    public async update({ params, request, response }: HttpContext) {
        const { employeeId } = params
        const employeeDto = await request.validateUsing(updateEmployeeValidator)
        const { attachDocumentTypeIds } = await request.validateUsing(attachDocumentTypeValidator)
        const { detachDocumentTypeIds } = await request.validateUsing(detachDocumentTypeValidator)

        const employee = await this.updateEmployeeUseCase.run(employeeId, employeeDto, attachDocumentTypeIds, detachDocumentTypeIds)
        return response.created(employee)
    }
}