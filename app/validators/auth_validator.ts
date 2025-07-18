import vine from "@vinejs/vine";

export const signUpValidator = vine.compile(
    vine.object({
        name: vine.string(),
        email: vine.string().email().maxLength(254),
        password: vine.string().minLength(6)
    })
)

export const signInValidator = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string()
    })
)