import { inject } from "@adonisjs/core"
import EmployeeRepository from "../../repositories/employee_repository.js"
import ApplicationException from "#exceptions/application_exception"
import Employee from "#models/employee"
import Document from "#models/document"
import { DocumentStatus } from "../../utils/enums.js"

@inject()
export default class SendDocumentUseCase {
    constructor(
        private readonly employeeRepository: EmployeeRepository,
    ) { }

    public async run(employeeId: string, documentTypeId: number, identifier: string): Promise<void> {
        const employee = await this.employeeRepository.get(employeeId)
        const document = this.findDocument(employee, documentTypeId)
        await this.employeeRepository.updateDocument(document, { identifier, status: DocumentStatus.RECEIVED })
    }

    private findDocument(employee: Employee, documentTypeId: number): Document {
        const foundDocument = employee.documents.find((document) => document.documentTypeId === documentTypeId)
        if(foundDocument === undefined) {
            throw new ApplicationException('Documento não encontrado', { status: 404})
        }

        return foundDocument
    }
}