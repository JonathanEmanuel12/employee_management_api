import { inject } from "@adonisjs/core"
import EmployeeRepository from "../../repositories/employee_repository.js"
import { CreateEmployeeDto } from "../../dto/employee_dto.js"
import Employee from "#models/employee"
import { DateTime } from "luxon"

@inject()
export default class CreateEmployeeUseCase {
    constructor(
        private readonly employeeRepository: EmployeeRepository
    ) {}

    public async run(employeeDto: Omit<CreateEmployeeDto, 'hiredAt'>): Promise<Employee> {
        const hiredAt = DateTime.now()
        return await this.employeeRepository.create({ hiredAt, ...employeeDto })
    }
}