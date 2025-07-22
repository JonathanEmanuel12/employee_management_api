const EmployeeController = () => import('#controllers/employee_controller')
import router from '@adonisjs/core/services/router'

router.group(() => {
    router.post('/', [EmployeeController, 'create'])
    router.put('/:employeeId', [EmployeeController, 'update'])
    router.get('/:employeeId', [EmployeeController, 'show'])
    router.put('/:employeeId/document', [EmployeeController, 'sendDocument'])
})
    .prefix('employee')
