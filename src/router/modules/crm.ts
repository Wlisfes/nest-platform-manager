export default [
    {
        path: '/crm/client/consumer',
        name: 'CemClientConsumer',
        meta: { title: '我的客户', AUTH: 'AUTH', keepAlive: true },
        component: () => import('@/views/crm/client/index.vue')
    },
    {
        path: '/crm/client/context/:keyId',
        name: 'CemClientContextConsumer',
        meta: { title: '客户详情', AUTH: 'AUTH' },
        component: () => import('@/views/crm/client/context.vue')
    }
]
