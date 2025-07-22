import { DateTime } from "luxon"
import { DocumentStatus } from "../utils/enums.js"

export interface CreateEmployeeDto {
    name: string
    hiredAt: DateTime
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto> { }

export interface UpdateDocumentDto {
    identifier?: string
    status?: DocumentStatus
}