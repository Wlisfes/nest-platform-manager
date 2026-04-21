export default [
    {
        path: '/crm/client/consumer',
        name: 'CrmClientConsumer',
        meta: { title: '我的客户', AUTH: 'AUTH', keepAlive: true },
        component: () => import('@/views/crm/client/index.vue')
    },
    {
        path: '/crm/client/partner',
        name: 'CrmClientPartner',
        meta: { title: '合作伙伴', AUTH: 'AUTH', keepAlive: true },
        component: () => import('@/views/crm/partner/index.vue')
    },
    {
        path: '/crm/client/context/:keyId',
        name: 'CrmClientDecomposer',
        meta: { title: '客户详情', AUTH: 'AUTH' },
        component: () => import('@/views/crm/context/client/index.vue')
    }
]
