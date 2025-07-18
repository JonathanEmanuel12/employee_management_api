import DocumentType from "#models/document_type";

export default class DocumentTypeRepository {
    public async create(name: string): Promise<DocumentType> {
        return await DocumentType.create({ name })
    }
}