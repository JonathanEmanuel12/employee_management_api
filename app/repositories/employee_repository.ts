import Employee from "#models/employee";
import { CreateEmployeeDto } from "../dto/employee_dto.js";

export default class EmployeeRepository {
    public async create(employeeDto: CreateEmployeeDto): Promise<Employee> {
        return await Employee.create(employeeDto)
    }
}