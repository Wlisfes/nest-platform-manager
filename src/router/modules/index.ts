import { App } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { useManager, useStore } from '@/store'
import deploy from '@/router/modules/deploy'
import * as utils from '@/utils/utils-common'
import * as cookie from '@/utils/utils-cookie'

/**路由列表配置**/
export function fetchSetupRouter() {
    return [
        {
            path: '/manager',
            name: 'BaseManager',
            meta: { title: '工作台', AUTH: 'AUTH', menu: false },
            component: () => import('@/views/main/manager/manager.vue')
        },
        ...deploy
    ]
}
