import { DateTime } from "luxon"

export interface CreateEmployeeDto {
    name: string
    hiredAt: DateTime
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto> { }