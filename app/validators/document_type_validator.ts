import vine from "@vinejs/vine";

export const createDocumentTypeValidator = vine.compile(
    vine.object({
        name: vine.string(),
    })
)

export const attachDocumentTypeValidator = vine.compile(
    vine.object({
        attachDocumentTypeIds: vine.array(
            vine.number().exists({ table: 'document_types', column: 'id' })
        ).optional()
    })
)

export const detachDocumentTypeValidator = vine.compile(
    vine.object({
        detachDocumentTypeIds: vine.array(
            vine.number().exists({ table: 'document_types', column: 'id' })
        ).optional()
    })
)