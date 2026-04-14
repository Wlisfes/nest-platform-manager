import { concat } from '@/utils'
import deploy from '@/router/modules/deploy'
import finance from '@/router/modules/finance'

/**路由列表配置**/
export function fetchSetupRouter() {
    return concat(deploy, finance, [
        {
            path: '/manager',
            name: 'Manager',
            meta: { title: '工作台', AUTH: 'AUTH', showClose: false, keepAlive: true } as Omix,
            component: () => import('@/views/main/manager/manager.vue')
        }
    ])
}
