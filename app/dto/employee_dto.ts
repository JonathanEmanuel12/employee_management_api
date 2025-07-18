import { DateTime } from "luxon"

export interface CreateEmployeeDto {
    name: string
    hiredAt: DateTime
}