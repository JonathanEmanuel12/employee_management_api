import vine from "@vinejs/vine";
import { DateTime } from "luxon";

export const createEmployeeValidator = vine.compile(
    vine.object({
        name: vine.string(),
    })
)

export const updateEmployeeValidator = vine.compile(
    vine.object({
        name: vine.string().optional(),
        hiredAt: vine.date({ formats: 'YYYY-MM-DD HH:mm:ss' }).transform((date) => DateTime.fromJSDate(date)).optional()
    })
)

export const sendDocumentValidator = vine.compile(
    vine.object({
        identifier: vine.string(),
        documentTypeId: vine.number().exists({ table: 'document_types', column: 'id' })
    })
)