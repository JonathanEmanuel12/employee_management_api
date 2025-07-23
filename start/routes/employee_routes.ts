const EmployeeController = () => import('#controllers/employee_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.group(() => {
    router.post('/', [EmployeeController, 'create'])
    router.get('/', [EmployeeController, 'index'])
    router.put('/:employeeId', [EmployeeController, 'update'])
    router.get('/:employeeId', [EmployeeController, 'show'])
    router.put('/:employeeId/document', [EmployeeController, 'sendDocument'])
})
    .middleware(middleware.auth())
    .prefix('employee')
