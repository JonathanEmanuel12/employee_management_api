const EmployeeController = () => import('#controllers/employee_controller')
import router from '@adonisjs/core/services/router'

router.group(() => {
    router.post('/', [EmployeeController, 'create'])
})
    .prefix('employee')
