export default [
    {
        path: '/crm/client/consumer',
        name: 'CemClientConsumer',
        meta: { title: '我的客户', AUTH: 'AUTH', keepAlive: true },
        component: () => import('@/views/crm/client/consumer/index.vue')
    }
]
