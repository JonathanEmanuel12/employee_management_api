import vine from "@vinejs/vine";

export const createEmployeeValidator = vine.compile(
    vine.object({
        name: vine.string(),
    })
)