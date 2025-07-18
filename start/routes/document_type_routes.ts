const DocumentTypeController = () => import('#controllers/document_type_controller')
import router from '@adonisjs/core/services/router'

router.group(() => {
    router.post('/', [DocumentTypeController, 'create'])
})
    .prefix('documentType')
