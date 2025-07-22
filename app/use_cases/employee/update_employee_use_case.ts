import { inject } from "@adonisjs/core"
import EmployeeRepository from "../../repositories/employee_repository.js"
import { UpdateEmployeeDto } from "../../dto/employee_dto.js"
import ApplicationException from "#exceptions/application_exception"
import Employee from "#models/employee"

@inject()
export default class UpdateEmployeeUseCase {
    constructor(
        private readonly employeeRepository: EmployeeRepository
    ) { }

    public async run(
        employeeId: string,
        employeeDto: UpdateEmployeeDto,
        attachDocumentTypeIds?: number[],
        detachDocumentTypeIds?: number[]
    ): Promise<void> {
        this.checkDuplicateDocumentTypeId(attachDocumentTypeIds, detachDocumentTypeIds)
        const employee = await this.employeeRepository.get(employeeId)
        this.checkIfDocumentAlreadyExistsInEmployee(employee, attachDocumentTypeIds)
        await this.employeeRepository.update(employee, employeeDto, attachDocumentTypeIds, detachDocumentTypeIds)
    }

    private checkDuplicateDocumentTypeId(attachDocumentTypeIds?: number[], detachDocumentTypeIds?: number[]): void {
        if(attachDocumentTypeIds === undefined || detachDocumentTypeIds === undefined) {
            return
        }

        for (let i = 0; i < attachDocumentTypeIds.length; i++) {
            const foundEqualId = detachDocumentTypeIds.find(id => id === attachDocumentTypeIds[i])
            if(foundEqualId !== undefined) {
                throw new ApplicationException('Não é possível adicionar e remover um tipo de documento ao mesmo tempo', { status: 400 })
            }
        }
    }

    private checkIfDocumentAlreadyExistsInEmployee(employee: Employee, attachDocumentTypeIds?: number[]): void {
        if(attachDocumentTypeIds === undefined) {
            return
        }

        const foundDocument = employee.documents.find(({ documentTypeId }) => {
            return attachDocumentTypeIds.find(id => documentTypeId === id)
        })

        if(foundDocument !== undefined) {
            throw new ApplicationException('Não é possível adicionar um document que o colaborador já possui', { status: 400 })
        }
    }
}