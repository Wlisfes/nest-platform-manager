import { concat } from '@/utils/utils-common'
import deploy from '@/router/modules/deploy'

/**路由列表配置**/
export function fetchSetupRouter() {
    return concat(deploy, [
        {
            path: '/manager',
            name: 'Manager',
            meta: { title: '工作台', AUTH: 'AUTH' },
            component: () => import('@/views/main/manager/manager.vue')
        }
    ])
}
