import type { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import { createEmployeeValidator, indexEmployeeValidator, sendDocumentValidator, updateEmployeeValidator } from "#validators/employee_validator";
import CreateEmployeeUseCase from "../use_cases/employee/create_employee_use_case.js";
import { attachDocumentTypeValidator, detachDocumentTypeValidator } from "#validators/document_type_validator";
import UpdateEmployeeUseCase from "../use_cases/employee/update_employee_use_case.js";
import SendDocumentUseCase from "../use_cases/employee/send_document_use_case.js";
import EmployeeRepository from "../repositories/employee_repository.js";

@inject()
export default class EmployeeController {
    constructor(
        private readonly createEmployeeUseCase: CreateEmployeeUseCase,
        private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
        private readonly sendDocumentUseCase: SendDocumentUseCase,
        private readonly employeeRepository: EmployeeRepository
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

        await this.updateEmployeeUseCase.run(employeeId, employeeDto, attachDocumentTypeIds, detachDocumentTypeIds)
        return response.noContent()
    }

    public async show({ params, response }: HttpContext) {
        const { employeeId } = params
        const employee = await this.employeeRepository.get(employeeId)
        return response.ok(employee)
    }

    public async index({ request, response }: HttpContext) {
        const { search = '', page = 1, perPage = 10, documentTypeId } = await request.validateUsing(indexEmployeeValidator)
        const employees = await this.employeeRepository.index(search, page, perPage, documentTypeId)
        return response.ok(employees)
    }

    public async sendDocument({ params, request, response }: HttpContext) {
        const { employeeId } = params
        const { identifier, documentTypeId } = await request.validateUsing(sendDocumentValidator)
        await this.sendDocumentUseCase.run(employeeId, documentTypeId, identifier)
        return response.noContent()
    }
}