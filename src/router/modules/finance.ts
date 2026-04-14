export default [
    {
        path: '/finance/deploy/brand',
        name: 'FinanceDeployBrand',
        meta: { title: '品牌管理', AUTH: 'AUTH', keepAlive: true },
        component: () => import('@/views/finance/deploy/brand/index.vue')
    }
]
