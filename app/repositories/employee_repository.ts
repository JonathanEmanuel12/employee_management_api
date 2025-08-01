import Employee from "#models/employee";
import db from "@adonisjs/lucid/services/db";
import { CreateEmployeeDto, UpdateDocumentDto, UpdateEmployeeDto } from "../dto/employee_dto.js";
import { DocumentStatus } from "../utils/enums.js";
import { TransactionClientContract } from "@adonisjs/lucid/types/database";
import Document from "#models/document";

export default class EmployeeRepository {
    public async create(employeeDto: CreateEmployeeDto, attachDocumentTypeIds?: number[]): Promise<Employee> {
        return await db.transaction(async (trx) => {
            const employee = await Employee.create(employeeDto, { client: trx })

            if (attachDocumentTypeIds !== undefined) {
                await this.attachDocumentTypes(employee, attachDocumentTypeIds, trx)
            }

            return employee
        })
    }

    public async update(
        employee: Employee,
        employeeDto: UpdateEmployeeDto,
        attachDocumentTypeIds?: number[],
        detachDocumentTypeIds?: number[]
    ): Promise<void> {
        await db.transaction(async (trx) => {
            await employee.useTransaction(trx).merge(employeeDto).save()

            if (attachDocumentTypeIds !== undefined) {
                await this.attachDocumentTypes(employee, attachDocumentTypeIds, trx)
            }
            if (detachDocumentTypeIds !== undefined) {
                await this.detachDocumentTypes(employee, detachDocumentTypeIds, trx)
            }
        })
    }

    public async get(employeeId: string): Promise<Employee> {
        return await Employee.query()
            .where('id', employeeId)
            .preload('documents')
            .firstOrFail()
    }

    public async index(search: string, page: number, perPage: number, documentTypeId?: number): Promise<Employee[]> {
        return await Employee.query()
            .whereILike('name', `%${search}%`)
            .andWhereHas('documents', (query) => {
                query.where('status', DocumentStatus.PENDING)
                if(documentTypeId !== undefined) {
                    query.where('documentTypeId', documentTypeId)                    
                }
            })
            .preload('documents', (query) => {
                query.where('status', DocumentStatus.PENDING)
                query.preload('documentType')
                if(documentTypeId !== undefined) {
                    query.where('documentTypeId', documentTypeId)                    
                }
            })
            .paginate(page, perPage)
    }

    public async updateDocument(document: Document, documentDto: UpdateDocumentDto): Promise<void> {
        await document.merge(documentDto).save()
    }

    private async attachDocumentTypes(employee: Employee, attachDocumentTypeIds: number[], trx: TransactionClientContract): Promise<void> {
        const documentDtos = attachDocumentTypeIds.map((documentTypeId) => {
            return { documentTypeId, status: DocumentStatus.PENDING }
        })
        await employee.related('documents').createMany(documentDtos, { client: trx })
    }

    private async detachDocumentTypes(employee: Employee, detachDocumentTypeIds: number[], trx: TransactionClientContract): Promise<void> {
        await employee.useTransaction(trx)
            .related('documents')
            .query()
            .whereIn('document_type_id', detachDocumentTypeIds)
            .delete()
    }

}