export default [
    {
        path: '/deploy/system/resource',
        name: 'DeploySystemResource',
        meta: { title: '资源管理', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/resource/resource.vue')
    },
    {
        path: '/deploy/system/authorize',
        name: 'DeploySystemAuthorize',
        meta: { title: '权限管理', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/authorize/authorize.vue')
    },
    {
        path: '/deploy/system/consumer',
        name: 'DeploySystemConsumer',
        meta: { title: '用户管理', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/consumer/consumer.vue')
    }
]
