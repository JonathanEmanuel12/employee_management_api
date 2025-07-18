import type { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import DocumentTypeRepository from "../repositories/document_type_repository.js";
import { createDocumentTypeValidator } from "#validators/document_type_validator";

@inject()
export default class DocumentTypeController {
    constructor(
        private readonly documentTypeRepository: DocumentTypeRepository
    ) {}

    public async create({ request, response }: HttpContext) {
        const { name } = await request.validateUsing(createDocumentTypeValidator)
        const documentType = await this.documentTypeRepository.create(name)
        return response.created(documentType)
    }

    public async index({ response }: HttpContext) {
        const documentTypes = await this.documentTypeRepository.index()
        return response.ok(documentTypes)
    }
}