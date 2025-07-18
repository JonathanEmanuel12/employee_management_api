import vine from "@vinejs/vine";

export const createDocumentTypeValidator = vine.compile(
    vine.object({
        name: vine.string(),
    })
)